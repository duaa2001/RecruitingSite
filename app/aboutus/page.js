"use client";

import { Box, Typography, Paper } from "@mui/material";

export default function FAQPage() {
  return (
    <Box
      sx={{
        padding: "3rem",
        maxWidth: "900px",
        margin: "auto",
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{
          fontWeight: "bold",
          color: "#2b4162",
          marginBottom: "2rem",
        }}
      >
        Frequently Asked Questions
      </Typography>

      <Paper elevation={3} sx={{ padding: "1.5rem", marginBottom: "1.5rem" }}>
        <Typography variant="h6" gutterBottom>
          Q: What is TechMarket?
        </Typography>
        <Typography variant="body1" paragraph>
          A: TechMarket is a platform that connects tech professionals with companies looking for talent, helping both find the right match for growth and success.
        </Typography>
      </Paper>

      <Paper elevation={3} sx={{ padding: "1.5rem", marginBottom: "1.5rem" }}>
        <Typography variant="h6" gutterBottom>
          Q: How can I create an account?
        </Typography>
        <Typography variant="body1" paragraph>
          A: You can sign up by clicking the &quot;Sign Up&quot; button on the homepage and filling in the necessary details.
        </Typography>
      </Paper>

      <Paper elevation={3} sx={{ padding: "1.5rem", marginBottom: "1.5rem" }}>
        <Typography variant="h6" gutterBottom>
          Q: Is TechMarket free to use?
        </Typography>
        <Typography variant="body1" paragraph>
          A: Yes, creating an account and using the platform to browse jobs or post a profile is completely free.
        </Typography>
      </Paper>

      <Paper elevation={3} sx={{ padding: "1.5rem", marginBottom: "1.5rem" }}>
        <Typography variant="h6" gutterBottom>
          Q: How do I browse through profiles?
        </Typography>
        <Typography variant="body1" paragraph>
          A: You can browse through profiles by typing in a specific skill or using the filtering options to find matches based on your requirements.
        </Typography>
      </Paper>

      <Paper elevation={3} sx={{ padding: "1.5rem", marginBottom: "1.5rem" }}>
        <Typography variant="h6" gutterBottom>
          Q: Can I update my profile after signing up?
        </Typography>
        <Typography variant="body1" paragraph>
          A: Yes, you can edit your profile at any time by going to the &quot;My Profile&quot; section and updating your information.
        </Typography>
      </Paper>

      <Paper elevation={3} sx={{ padding: "1.5rem", marginBottom: "1.5rem" }}>
        <Typography variant="h6" gutterBottom>
          Q: Who should use TechMarket?
        </Typography>
        <Typography variant="body1" paragraph>
          A: Anyone looking to connect with or aspiring to be part of the tech community, whether you&apos;re a professional or looking for opportunities in the industry.
        </Typography>
      </Paper>
    </Box>
  );
}



