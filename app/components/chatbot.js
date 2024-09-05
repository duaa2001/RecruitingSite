"use client";
import { useState, useEffect, useRef } from "react";
import { Box, Stack, TextField, Button, Typography } from "@mui/material";

export default function ChatBot() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `Hi, I'm the TechMarket support agent. How can I assist you today?`,
    },
  ]);

  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    if (!message.trim()) return; // Prevent sending empty messages
    setMessage("");
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: message },
      { role: "assistant", content: "" },
    ]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([...messages, { role: "user", content: message }]),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let result = "";
      reader.read().then(function processText({ done, value }) {
        if (done) {
          return;
        }
        const text = decoder.decode(value || new Uint8Array(), { stream: true });
        setMessages((prevMessages) => {
          let lastMessage = prevMessages[prevMessages.length - 1];
          let otherMessages = prevMessages.slice(0, prevMessages.length - 1);
          return [
            ...otherMessages,
            {
              ...lastMessage,
              content: lastMessage.content + text,
            },
          ];
        });
      });
    } catch (error) {
      console.error("Error extracting text:", error);
    }
  };

  // Scroll to the bottom of the chat on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bgcolor="#f0f0f0"  // Light background color
    >
      <Typography
        variant="h4"
        color="#333"  // Darker text color
        mb={4}
        fontWeight="bold"
        textAlign="center"
      >
        Welcome to our Latest Chatbot!
      </Typography>

      <Stack
        direction="column"
        width="500px"
        height="600px"
        border="1px solid #ddd"  // Lighter border color
        p={2}
        spacing={3}
        bgcolor="white"
        borderRadius={4}  // Less rounded corners
        boxShadow="0px 2px 8px rgba(0, 0, 0, 0.1)"  // Subtle shadow
      >
        <Stack
          direction="column"
          spacing={2}
          flexGrow={1}
          overflow="auto"
          maxHeight="100%"
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={message.role === "assistant" ? "flex-start" : "flex-end"}
            >
              <Box
                bgcolor={message.role === "assistant" ? "#e0f7fa" : "#cfd8dc"}  // Soft colors
                color="#000"  // Dark text color
                borderRadius={4}  // Less rounded corners
                p={2}
                maxWidth="70%"  // Limit width for better readability
                wordBreak="break-word"  // Handle long words gracefully
              >
                {message.content}
              </Box>
            </Box>
          ))}
      
          <div ref={messagesEndRef} />  {/* Scroll reference */}

        </Stack>

        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
            label="Message"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            size="small"
          />
          <Button
            variant="contained"
            onClick={sendMessage}
            sx={{
              bgcolor: '#00796b',  // Teal color for button
              color: 'white',
              '&:hover': {
                bgcolor: '#004d40',  // Darker teal on hover
              },
            }}
          >
            SEND
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}