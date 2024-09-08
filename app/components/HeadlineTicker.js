// components/HeadlineTicker.js
import React from 'react';
import { Box, Typography,useMediaQuery } from '@mui/material';

const HeadlineTicker = ({ headlines }) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <Box
      sx={{
        backgroundColor: '#fb8b24',
        color: '#333',
        padding: isMobile?'6px':'10px',
        position: 'relative',
        overflow: 'hidden',
        fontWeight: 'bold',
        fontSize: '1.2rem',
        whiteSpace: 'nowrap',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Box
        sx={{
          display: 'inline-block',
          animation: 'ticker 20s linear infinite',
          paddingLeft: '100%',
        }}
      >
        {headlines.map((headline, index) => (
          <Typography 
            key={index} 
            variant="body1" 
            sx={{ 
              display: 'inline-block', 
              marginRight: '50px', 
              transition: 'color 0.5s', 
              '&:hover': {
                color: '#e0e1dd',
              },
              animation: 'fadeIn 0.5s ease-in-out',
              animationDelay: `${index * 0.5}s`,
              '&::before': {
                content: '"🔥 "',
                fontSize: '1.5rem',
              },
            }}
          >
            {headline}
          </Typography>
        ))}
      </Box>
      <style jsx>{`
        @keyframes ticker {
          0% {
            transform: translate(0);
          }
          100% {
            transform: translate(-100%);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </Box>
  );
};

export default HeadlineTicker;