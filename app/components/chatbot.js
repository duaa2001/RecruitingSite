// "use client";
// import { useState, useEffect, useRef } from "react";
// import { Box, Stack, TextField, Button, Typography } from "@mui/material";

// export default function ChatDialog({ initialMessage, profile }) {
//   const [messages, setMessages] = useState([
//     {
//       role: "assistant",
//       content: `Hi, I'm the TechMarket support agent. How can I assist you today regarding ${profile?.name || 'this profile'}?`, 
//     },
//   ]);
//   const [message, setMessage] = useState("");
//   const [isOpen, setIsOpen] = useState(false);
//   const messagesEndRef = useRef(null);

//   const sendMessage = async () => {
//     if (!message.trim()) return;
//     setMessage("");
//     setMessages((prevMessages) => [
//       ...prevMessages,
//       { role: "user", content: message },
//       { role: "assistant", content: "" },
//     ]);

//     try {
//       const response = await fetch("/api/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify([
//           ...messages,
//           { role: "user", content: message },
//           { role: "system", content: `This is a conversation about ${profile?.name || 'an unknown person'}. 
//           Bio: ${profile?.bio || 'No bio available'}. 
//           Skills: ${profile?.skills?.length ? profile.skills.join(', ') : 'No skills available'}. 
//           Education: ${profile?.education?.length ? profile.education.map(edu => `${edu.degree} in ${edu.major} (${edu.graduationYear})`).join(', ') : 'No education information available'}.
//           Projects: ${profile?.projects?.length ? profile.projects.map(p => p.title).join(', ') : 'No projects available'}.`
//           },
//         ]),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const reader = response.body.getReader();
//       const decoder = new TextDecoder();

//       reader.read().then(function processText({ done, value }) {
//         if (done) return;
//         const text = decoder.decode(value || new Uint8Array(), { stream: true });
//         setMessages((prevMessages) => {
//           let lastMessage = prevMessages[prevMessages.length - 1];
//           let otherMessages = prevMessages.slice(0, prevMessages.length - 1);
//           return [
//             ...otherMessages,
//             { ...lastMessage, content: lastMessage.content + text },
//           ];
//         });
//       });
//     } catch (error) {
//       console.error("Error extracting text:", error);
//     }
//   };

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <>
//       <Button
//         onClick={() => setIsOpen(!isOpen)}
//         sx={{
//           position: 'fixed',
//           bottom: '20px',
//           right: '20px',
//           bgcolor: '#4CAF50',
//           color: 'white',
//           '&:hover': {
//             bgcolor: '#45a049',
//           },
//         }}
//       >
//         {isOpen ? 'Close Chat' : 'Open Chat'}
//       </Button>
//       {isOpen && (
//         <Box
//           sx={{
//             position: 'fixed',
//             bottom: '80px',
//             right: '20px',
//             width: { xs: '100%', md: '33%' },
//             height: { xs: '100%', md: '500px' },
//             bgcolor: 'white',
//             borderRadius: '8px',
//             boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
//             display: 'flex',
//             flexDirection: 'column',
//           }}
//         >
//           <Typography
//             variant="h6"
//             sx={{
//               bgcolor: '#4CAF50',
//               color: 'white',
//               p: 2,
//               borderTopLeftRadius: '8px',
//               borderTopRightRadius: '8px',
//             }}
//           >
//             Chat Support - {profile.name}
//           </Typography>
//           <Stack
//             direction="column"
//             spacing={2}
//             sx={{
//               flexGrow: 1,
//               overflow: 'auto',
//               p: 2,
//             }}
//           >
//             {messages.map((message, index) => (
//               <Box
//                 key={index}
//                 sx={{
//                   display: 'flex',
//                   justifyContent: message.role === "assistant" ? "flex-start" : "flex-end",
//                 }}
//               >
//                 <Box
//                   sx={{
//                     bgcolor: message.role === "assistant" ? "#E8F5E9" : "#C8E6C9",
//                     color: '#1B5E20',
//                     borderRadius: '12px',
//                     p: 2,
//                     maxWidth: '70%',
//                     wordBreak: 'break-word',
//                   }}
//                 >
//                   {message.content}
//                 </Box>
//               </Box>
//             ))}
//             <div ref={messagesEndRef} />
//           </Stack>
//           <Stack
//             direction="row"
//             spacing={1}
//             sx={{ p: 2, borderTop: '1px solid #E8F5E9' }}
//           >
//             <TextField
//               fullWidth
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               placeholder="Type your message..."
//               size="small"
//               sx={{
//                 '& .MuiOutlinedInput-root': {
//                   '& fieldset': {
//                     borderColor: '#4CAF50',
//                   },
//                   '&:hover fieldset': {
//                     borderColor: '#45a049',
//                   },
//                   '&.Mui-focused fieldset': {
//                     borderColor: '#45a049',
//                   },
//                 },
//               }}
//             />
//             <Button
//               onClick={sendMessage}
//               sx={{
//                 bgcolor: '#4CAF50',
//                 color: 'white',
//                 '&:hover': {
//                   bgcolor: '#45a049',
//                 },
//               }}
//             >
//               Send
//             </Button>
//           </Stack>
//         </Box>
//       )}
//     </>
//   );
// }