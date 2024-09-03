import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, Container, Grid, Card, CardContent, TextField } from "@mui/material";
import WorkIcon from '@mui/icons-material/Work';
import "../app/styles/styles.css";

export default function Home() {
  return (
    <Box>
      {/* Navbar */}
      <AppBar position="static" color="transparent" elevation={0}>
        <Container>
          <Toolbar>
            <WorkIcon sx={{ mr: 2 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              TechMarket
            </Typography>
            <Button color="inherit">About</Button>
            <Button color="inherit">Features</Button>
            <Button color="inherit">Contact</Button>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Hero Section */}
      <Box className="hero">
        <Container>
          <Typography variant="h1" className="title">
            Welcome to the Tech Marketplace!
          </Typography>
          <Typography variant="body1" className="subtitle">
            Make your Profile. Connect with others. Explore.
          </Typography>
          <Button variant="contained" className="button">
            Get Started
          </Button>
        </Container>
      </Box>

      {/* About Section */}
      <Box className="section" id="about">
        <Container>
          <Typography variant="h2" className="section-title">About Us</Typography>
          <Typography variant="body1">
            TechMarket is the premier platform connecting tech professionals with innovative companies. 
            Our mission is to streamline the job search process and foster meaningful connections in the tech industry.
          </Typography>
        </Container>
      </Box>

      {/* Features Section */}
      <Box className="section" id="features">
        <Container>
          <Typography variant="h2" className="section-title">Features</Typography>
          <Grid container spacing={3}>
            {['Profile Creation', 'Skill Matching', 'Company Exploration'].map((feature) => (
              <Grid item xs={12} md={4} key={feature}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {feature}
                    </Typography>
                    <Typography variant="body2">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Contact Section */}
      <Box className="section" id="contact">
        <Container>
          <Typography variant="h2" className="section-title">Contact Us</Typography>
          <Box component="form" noValidate autoComplete="off">
            <TextField fullWidth margin="normal" label="Name" variant="outlined" />
            <TextField fullWidth margin="normal" label="Email" variant="outlined" />
            <TextField fullWidth margin="normal" label="Message" variant="outlined" multiline rows={4} />
            <Button variant="contained" className="button" sx={{ mt: 2 }}>
              Send Message
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}