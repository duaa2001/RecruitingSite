import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, Card, CardContent, IconButton, Grid, Container, Avatar, Link } from "@mui/material";
import WorkIcon from '@mui/icons-material/Work';
import GroupIcon from '@mui/icons-material/Group';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SearchIcon from '@mui/icons-material/Search';
import MessageIcon from '@mui/icons-material/Message';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import "../app/styles/styles.css";

export default function Home() {
  return (
    <Box className="container">
      {/* Navbar */}
      <AppBar position="fixed" color="transparent" elevation={0}>
        <Container>
          <Toolbar>
            <Link href="/" underline="none" color="inherit">
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                <WorkIcon sx={{ mr: 1 }} />
                TechMarket
              </Typography>
            </Link>
            <Box sx={{ flexGrow: 1 }} />
            <Button color="inherit" href="/signin">Sign In</Button>
            <Button color="inherit" href="/signup">Sign Up</Button>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Hero Section */}
      <Box className="hero section">
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
      <Box className="about section" id="about">
        <Container>
          <Typography variant="h2" className="section-title" gutterBottom align="center">
            About Us
          </Typography>
          <Typography variant="body1" paragraph align="center" sx={{ mb: 4 }}>
            Welcome to TechMarket, where innovation meets opportunity. We connect tech professionals 
            with the companies that need them, creating a vibrant marketplace for talent and technology.
          </Typography>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card elevation={3}>
                <CardContent>
                  <Avatar sx={{ mb: 2 }}>
                    <GroupIcon />
                  </Avatar>
                  <Typography variant="h5" component="div" gutterBottom>
                    Our Mission
                  </Typography>
                  <Typography variant="body2">
                    To empower tech professionals to find their ideal roles while helping companies 
                    discover the talent they need to thrive.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card elevation={3}>
                <CardContent>
                  <Avatar sx={{ mb: 2 }}>
                    <TrendingUpIcon />
                  </Avatar>
                  <Typography variant="h5" component="div" gutterBottom>
                    Our Vision
                  </Typography>
                  <Typography variant="body2">
                    We envision a world where technology professionals can easily connect with 
                    opportunities that align with their skills and aspirations.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card elevation={3}>
                <CardContent>
                  <Avatar sx={{ mb: 2 }}>
                    <EmojiObjectsIcon />
                  </Avatar>
                  <Typography variant="h5" component="div" gutterBottom>
                    Our Approach
                  </Typography>
                  <Typography variant="body2">
                    We leverage advanced matching algorithms and a user-friendly interface to ensure 
                    that both job seekers and employers find the best fit.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box className="features section" id="features">
        <Container>
          <Typography variant="h2" className="section-title">Features</Typography>
          <Grid container spacing={3}>
            {[
              { title: 'Profile Creation', icon: <PersonAddIcon />, description: 'Create a comprehensive profile showcasing your skills, experience, and projects.' },
              { title: 'Advanced Job Search', icon: <SearchIcon />, description: 'Use our powerful search tools to find the perfect job match based on your preferences.' },
              { title: 'Direct Messaging', icon: <MessageIcon />, description: 'Connect directly with employers and recruiters through our secure messaging system.' }
            ].map((feature) => (
              <Grid item xs={12} md={4} key={feature.title}>
                <Card>
                  <CardContent>
                    <Avatar sx={{ mb: 2 }}>
                      {feature.icon}
                    </Avatar>
                    <Typography variant="h5" component="div">
                      {feature.title}
                    </Typography>
                    <Typography variant="body2">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box component="footer" className="footer">
        <Container>
          <Typography variant="body2" align="center">
            © 2024 TechMarket. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <IconButton color="inherit" aria-label="GitHub" component="a" href="https://github.com" target="_blank">
              <GitHubIcon />
            </IconButton>
            <IconButton color="inherit" aria-label="LinkedIn" component="a" href="https://linkedin.com" target="_blank">
              <LinkedInIcon />
            </IconButton>
            <IconButton color="inherit" aria-label="Twitter" component="a" href="https://twitter.com" target="_blank">
              <TwitterIcon />
            </IconButton>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}