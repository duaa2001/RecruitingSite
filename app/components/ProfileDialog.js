// components/ProfileDialog.js
import React, { useState } from 'react';
import { Dialog, DialogContent, Typography, Avatar, Link, Box, Chip, IconButton, Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import DescriptionIcon from '@mui/icons-material/Description';
import CloseIcon from '@mui/icons-material/Close';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Chatbot from './chatbot';

export default function ProfileDialog({ open, onClose, profile }) {
  if (!profile) return null;

  const [openChatbot, setOpenChatbot] = useState(false); 
  const [chatbotMessage, setChatbotMessage] = useState(""); 

  const handleAskQuestion = (profileName) => {
    setOpenChatbot(true); 
    setChatbotMessage(`I have a question about ${profileName}.`); 
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogContent>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
          <Avatar src={profile.photoURL} alt={profile.name} sx={{ width: 100, height: 100, mb: 2 }} />
          <Typography variant="h4">{profile.name}</Typography>
        </Box>

        <Typography variant="h6" gutterBottom align='center'>Bio</Typography>
        <Typography paragraph align='center'>{profile.bio}</Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 3 }}>
          <Link href={profile.github} target="_blank" rel="noopener noreferrer" sx={{ display: 'flex', alignItems: 'center' }}>
            <GitHubIcon sx={{ mr: 1 }} />
            GitHub
          </Link>
          <Link href={profile.linkedin} target="_blank" rel="noopener noreferrer" sx={{ display: 'flex', alignItems: 'center' }}>
            <LinkedInIcon sx={{ mr: 1 }} />
            LinkedIn
          </Link>
          <Link href={profile.resume} target="_blank" rel="noopener noreferrer" sx={{ display: 'flex', alignItems: 'center' }}>
            <DescriptionIcon sx={{ mr: 1 }} />
            Resume
          </Link>
        </Box>
        
        <Typography variant="h6" gutterBottom   align='center'>Education</Typography>
        <Box
          sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around'  }}
        >
          {profile.education && profile.education.map((edu, index) => (
            <Box key={index} mb={2}
            sx={{ display: 'flex', flexDirection: 'column'   }}
            >
              <Typography variant="subtitle1">{index+1}. {edu.degree}</Typography>
              <Typography variant="body2">{edu.major}</Typography>
              <Typography variant="body2">{edu.graduationYear}</Typography>
            </Box>
          ))}
        </Box>

        <Typography variant="h6" gutterBottom align='center'>Skills</Typography>
        <Box
          sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'  }}
        >
          {profile.skills && profile.skills.map((skill, index) => (
            <Chip key={index} label={skill} sx={{ mr: 1, mb: 1 }} />
          ))}
        </Box>

        <Typography variant="h6" gutterBottom align='center'>Work Experience</Typography>
        <Box
          sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around'  }}
        >
          {profile.workExperience && profile.workExperience.map((work, index) => (
            <Box key={index} mb={2}
            sx={{ display: 'flex', flexDirection: 'column'  }}
            >
              {/* add number in frount of each work position */}
              <Typography variant="subtitle1">{index+1}. {work.position}</Typography>
              <Typography variant="body2">{work.company}</Typography>
              <Typography variant="body2">From {work.startDate} To {work.endDate}</Typography>
              <Typography variant="body2">{work.description}</Typography>
            </Box>
          ))}
        </Box>

        <Typography variant="h6" gutterBottom align='center'>Projects</Typography>
        <Box
          sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around'  }}
        >
          {profile.projects && profile.projects.map((project, index) => (
            <Box key={index} mb={2}
            sx={{ display: 'flex', flexDirection: 'column'  }}
            >
              <Typography variant="subtitle1">{index+1}. {project.title}</Typography>
              <Typography variant="body2">{project.description}</Typography>
              <Link href={project.youtubeLink} target="_blank" rel="noopener noreferrer" sx={{ display: 'flex', alignItems: 'center' }}>
            <YouTubeIcon sx={{ mr: 1 }} />
            Sample Video
          </Link>
            </Box>
          ))}
        </Box>
        <Button
        variant="contained"
        color="primary"
        onClick={() => handleAskQuestion(profile.name)}
        sx={{ mt: 3 }}
        >
          Ask a Question about {profile.name}
        </Button>

        {/* Chatbot Dialog */}
        <Dialog open={openChatbot} onClose={() => setOpenChatbot(false)} fullWidth maxWidth="md">
        <Chatbot initialMessage={chatbotMessage} profile={profile} />
        </Dialog>

      </DialogContent>
    </Dialog>
  );
}