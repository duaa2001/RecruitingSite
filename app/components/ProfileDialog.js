import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, Typography, Avatar, Link, Box, Chip, IconButton, Button, Tooltip, useMediaQuery } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import DescriptionIcon from '@mui/icons-material/Description';
import CloseIcon from '@mui/icons-material/Close';
import YouTubeIcon from '@mui/icons-material/YouTube';
import ChatIcon from '@mui/icons-material/Chat';

export default function ProfileDialog({ open, onClose, profile }) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);
  const dialogContentRef = useRef(null);
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    if (isChatOpen) {
      setMessages([
        {
          role: "assistant",
          content: `Hi, I'm the TechMarket support agent. How can I assist you today regarding ${profile?.name || 'this profile'}?`,
        },
      ]);
    }
  }, [isChatOpen, profile]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const sendMessage = async () => {
    if (!message.trim()) return;
    setMessage("");
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: message },
      { role: "assistant", content: "" },
    ]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([
          ...messages,
          { role: "user", content: message },
          { role: "system", content: `This is a conversation about ${profile?.name || 'an unknown person'}. 
          Bio: ${profile?.bio || 'No bio available'}. 
          Skills: ${profile?.skills?.length ? profile.skills.join(', ') : 'No skills available'}. 
          Education: ${profile?.education?.length ? profile.education.map(edu => `${edu.degree} in ${edu.major} (${edu.graduationYear})`).join(', ') : 'No education information available'}.
          Projects: ${profile?.projects?.length ? profile.projects.map(p => p.title).join(', ') : 'No projects available'}.`
          },
        ]),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      reader.read().then(function processText({ done, value }) {
        if (done) return;
        const text = decoder.decode(value || new Uint8Array(), { stream: true });
        setMessages((prevMessages) => {
          let lastMessage = prevMessages[prevMessages.length - 1];
          let otherMessages = prevMessages.slice(0, prevMessages.length - 1);
          return [
            ...otherMessages,
            { ...lastMessage, content: lastMessage.content + text },
          ];
        });
      });
    } catch (error) {
      console.error("Error extracting text:", error);
    }
  };

  if (!profile) return null;

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth={false} 
      fullWidth
      PaperProps={{
        sx: {
          width: isMobile ? '100%' : '90%',
          height: '90vh',
          maxHeight: '90vh',
          m: 'auto',
          display: 'flex',
          flexDirection: 'row',
        }
      }}
    >
      {/* Chat Dialog */}
      {isChatOpen && (
        <Box
          sx={{
            width: isMobile ? '100%' : '33%',
            height: '100%',
            bgcolor: 'white',
            borderRight: '1px solid #E0E0E0',
            display: 'flex',
            flexDirection: 'column',
            position: isMobile ? 'absolute' : 'relative',
            zIndex: isMobile ? 1 : 'auto',
            left: 0,
            top: 0,
          }}
        >
          <Box sx={{
            bgcolor: '#4CAF50',
            color: 'white',
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <Typography variant="h6">
              Ask about <span style={{ fontWeight: 'bold' }}>{profile.name}</span>
            </Typography>
            {isMobile && (
              <IconButton onClick={toggleChat} sx={{ color: 'white' }}>
                <CloseIcon />
              </IconButton>
            )}
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              overflow: 'auto',
              p: 2,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {messages.map((message, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: message.role === "assistant" ? "flex-start" : "flex-end",
                  mb: 2,
                }}
              >
                <Box
                  sx={{
                    bgcolor: message.role === "assistant" ? "#E8F5E9" : "#C8E6C9",
                    color: '#1B5E20',
                    borderRadius: '12px',
                    p: 2,
                    maxWidth: '70%',
                  }}
                >
                  <Typography>{message.content}</Typography>
                </Box>
              </Box>
            ))}
            <div ref={messagesEndRef} />
          </Box>
          
          <Box sx={{ p: 2, borderTop: '1px solid #E8F5E9' }}>
            <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }}>
              <Box sx={{ display: 'flex' }}>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  style={{
                    flexGrow: 1,
                    marginRight: '8px',
                    padding: '8px',
                    border: '1px solid #4CAF50',
                    borderRadius: '4px',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Send
                </button>
              </Box>
            </form>
          </Box>
        </Box>
      )}
        
      {/* Profile Dialog */}
      <DialogContent 
        ref={dialogContentRef}
        sx={{ 
          bgcolor: 'white', 
          color: 'black', 
          position: 'relative',
          width: isChatOpen && !isMobile ? 'calc(67% - 1px)' : '100%',
          borderRight: isChatOpen && !isMobile ? '1px solid #E0E0E0' : 'none',
          transition: 'width 0.3s ease-in-out',
          overflowY: 'auto',
        }}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'green',
            backgroundColor: 'white',
            '&:hover': {
              backgroundColor: '#f1f1f1',
            }
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Chatbot Button */}
        <Tooltip title={`${isChatOpen ? 'Close' : 'Open'} chat about ${profile.name}`}>
          <Button
            aria-label="chatbot"
            onClick={toggleChat}
            sx={{
              position: 'absolute',
              left: 8,
              top: 8,
              color: 'white',
              backgroundColor: isChatOpen ? '#004d00' : 'green',
              borderRadius: '',
              width: "auto",
              height: "auto",
              '&:hover': {
                backgroundColor: '#004d00',
              }
            }}
          >
            <ChatIcon />
            {" Chat With AI"}
          </Button>
        </Tooltip>

        {/* Profile Content */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3, mt: 5 }}>
          <Avatar src={profile.photoURL} alt={profile.name} sx={{ width: 100, height: 100, mb: 2, border: '2px solid green' }} />
          <Typography variant="h4" color="green">{profile.name}</Typography>
        </Box>

        <Typography variant="h6" gutterBottom align='center' color="green">Bio</Typography>
        <Typography paragraph align='center'>{profile.bio}</Typography>

        {/* Links */}
        <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 3 }}>
          <Link href={profile.github} target="_blank" rel="noopener noreferrer" sx={{ display: 'flex', alignItems: 'center', color: 'green' }}>
            <GitHubIcon sx={{ mr: 1 }} />
            GitHub
          </Link>
          <Link href={profile.linkedin} target="_blank" rel="noopener noreferrer" sx={{ display: 'flex', alignItems: 'center', color: 'green' }}>
            <LinkedInIcon sx={{ mr: 1 }} />
            LinkedIn
          </Link>
          <Link href={profile.resume} target="_blank" rel="noopener noreferrer" sx={{ display: 'flex', alignItems: 'center', color: 'green' }}>
            <DescriptionIcon sx={{ mr: 1 }} />
            Resume
          </Link>
        </Box>

        {/* Education */}
        <Typography variant="h6" gutterBottom align='center' color="green">Education</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
          {profile.education && profile.education.map((edu, index) => (
            <Box key={index} mb={2} sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="subtitle1">{index + 1}. {edu.degree}</Typography>
              <Typography variant="body2">{edu.major}</Typography>
              <Typography variant="body2">{edu.graduationYear}</Typography>
            </Box>
          ))}
        </Box>

        {/* Skills */}
        <Typography variant="h6" gutterBottom align='center' color="green">Skills</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
          {profile.skills && profile.skills.map((skill, index) => (
            <Chip key={index} label={skill} sx={{ mr: 1, mb: 1, bgcolor: 'lightgreen', color: 'green' }} />
          ))}
        </Box>

        {/* Work Experience */}
        <Typography variant="h6" gutterBottom align='center' color="green">Work Experience</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
          {profile.workExperience && profile.workExperience.map((work, index) => (
            <Box key={index} mb={2} sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="subtitle1">{index + 1}. {work.position}</Typography>
              <Typography variant="body2">{work.company}</Typography>
              <Typography variant="body2">From {work.startDate} To {work.endDate}</Typography>
              <Typography variant="body2">{work.description}</Typography>
            </Box>
          ))}
        </Box>

        {/* Projects */}
        <Typography variant="h6" gutterBottom align='center' color="green">Projects</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
          {profile.projects && profile.projects.map((project, index) => (
            <Box key={index} mb={2} sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="subtitle1">{index + 1}. {project.title}</Typography>
              <Typography variant="body2">{project.description}</Typography>
              <Link href={project.youtubeLink} target="_blank" rel="noopener noreferrer" sx={{ display: 'flex', alignItems: 'center', color: 'green' }}>
                <YouTubeIcon sx={{ mr: 1 }} />
                Sample Video
              </Link>
            </Box>
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
}