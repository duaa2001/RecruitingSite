import React from "react";
import { Typography, Button, Box } from "@mui/material";
import "../app/styles/styles.css";


export default function Home() {
  return (
    <Box className="container">
      <Typography variant="h1" className="title">
        Welcome to the Tech Marketplace!
      </Typography>
      <Typography variant="body1" className="subtitle">
        Make your Profile. Connect with others. Explore.
      </Typography>
      <Button variant="contained" className="button">
        Get Started
      </Button>
    </Box>
  );
}