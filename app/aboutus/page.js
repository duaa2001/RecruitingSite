"use client";

import { Box, Typography } from "@mui/material";

export default function FAQPage() {
  return (
    <Box sx={{ padding: "2rem", maxWidth: "800px", margin: "auto" }}>
      <Typography variant="h4" gutterBottom align="center">
        Frequently Asked Questions
      </Typography>
      
      <Typography variant="h6" gutterBottom>
        Q: What is TechMarket?
      </Typography>
      <Typography variant="body1" paragraph>
        A: TechMarket is a platform that connects tech professionals with companies looking for talent, helping both find the right match for growth and success.
      </Typography>

      <Typography variant="h6" gutterBottom>
        Q: How can I create an account?
      </Typography>
      <Typography variant="body1" paragraph>
        A: You can sign up by clicking the "Sign Up" button on the homepage and filling in the necessary details.
      </Typography>

      <Typography variant="h6" gutterBottom>
        Q: Is TechMarket free to use?
      </Typography>
      <Typography variant="body1" paragraph>
        A: Yes, creating an account and using the platform to browse jobs or post a profile is completely free.
      </Typography>

      <Typography variant="h6" gutterBottom>
        Q: How do I browse through profiles?
      </Typography>
      <Typography variant="body1" paragraph>
        A: You can browse through profiles by typing in a specific skill or using the filtering options to find matches based on your requirements.
      </Typography>

      <Typography variant="h6" gutterBottom>
        Q: Can I update my profile after signing up?
      </Typography>
      <Typography variant="body1" paragraph>
        A: Yes, you can edit your profile at any time by going to the "My Profile" section and updating your information.
      </Typography>

      <Typography variant="h6" gutterBottom>
        Q: Who should use TechMarket?
      </Typography>
      <Typography variant="body1" paragraph>
        A: Anyone looking to connect with or aspiring to be part of the tech community, whether you're a professional or looking for opportunities in the industry.
      </Typography>
    </Box>
  );
}


