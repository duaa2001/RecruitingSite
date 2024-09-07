"use client";

import { Box, Typography } from "@mui/material";

export default function FAQPage() {
  return (
    <Box sx={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Frequently Asked Questions
      </Typography>
      
      <Typography variant="h6">
        Q: example q
      </Typography>
      <Typography variant="body1" paragraph>
        A: example a
      </Typography>

      <Typography variant="h6">
        Q: example q
      </Typography>
      <Typography variant="body1" paragraph>
        A: example a
      </Typography>

      <Typography variant="h6">
        Q: example q
      </Typography>
      <Typography variant="body1" paragraph>
        A: example a
      </Typography>
    </Box>
  );
}

