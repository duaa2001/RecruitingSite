import React from "react";
import { Typography, Button, Box } from "@mui/material";

export default function Home() {
  return (
    <Box
      sx={{
        textAlign: "center",
        mt: 8,
      }}
    >
      <Typography variant="h2" gutterBottom>
        Welcome to the Tech Marketplace!
      </Typography>
      <Typography variant="body1" paragraph>
        Make your Profile. Connect with others. Explore.
      </Typography>
      <Button variant="contained" color="primary">
        Get Started
      </Button>
    </Box>
  );
}
