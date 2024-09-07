'use client';

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
import LogoutIcon from '@mui/icons-material/Logout';
import TwitterIcon from '@mui/icons-material/Twitter';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useRouter } from 'next/navigation';
import { useUser, useClerk } from '@clerk/nextjs';

export default function Home() {
  const { isSignedIn } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  const handleGetStarted = () => {
    if (isSignedIn) {
      router.push('/dashboard');
    } else {
      router.push('/signin');
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <Box className="container" sx={{ backgroundColor: "#f4f4f4", minHeight: "100vh" }}>
      {/* AppBar Section */}
      <AppBar position="static" color="transparent" elevation={4} sx={{ backgroundColor: "#fff" }}>
        <Container>
          <Toolbar>
            <Link href="/" underline="none" color="inherit">
              <Typography variant="h5" component="div" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', color: '#333' }}>
                <WorkIcon sx={{ mr: 1, color: '#28a745' }} />  {/* Green accent for icon */}
                TechMarket
              </Typography>
            </Link>
            <Box sx={{ flexGrow: 1 }} />
            {isSignedIn ? (
              <>
                <Button 
                  color="inherit" 
                  startIcon={<DashboardIcon sx={{ color: '#28a745' }} />}  
                  onClick={() => router.push('/dashboard')}
                  sx={{ mr: 2, fontSize: '1rem', color: '#333' }}
                >
                  Dashboard
                </Button>
                <IconButton color="inherit" onClick={handleSignOut} sx={{ color: '#333' }}>
                  <LogoutIcon sx={{ color: '#28a745' }} />  {/* Green logout icon */}
                </IconButton>
              </>
            ) : (
              <>
                <Button color="inherit" href="/signin" sx={{ color: '#333' }}>Sign In</Button>
                <Button color="inherit" href="/signup" sx={{ color: '#28a745' }}>Sign Up</Button>  {/* Green accent for sign up button */}
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Hero Section */}
      <Box sx={{
        backgroundColor: '#333',  // Neutral dark gray background
        color: '#28a745',         // Green text
        py: 8,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <Container>
          <Typography variant="h2" className="title" sx={{ fontWeight: 'bold', mb: 2, color: '#28a745' }}>  {/* Green title */}
            Welcome to the Tech Marketplace!
          </Typography>
          <Typography variant="body1" className="subtitle" sx={{ fontSize: '1.2rem', mb: 4, color: '#28a745' }}>  {/* Green subtitle */}
            Make your Profile. Connect with others. Explore.
          </Typography>
          <Button variant="contained" className="button" onClick={handleGetStarted} sx={{
            backgroundColor: '#28a745',   // Green button for accent
            color: '#fff',
            padding: '12px 24px',
            fontSize: '1.1rem',
            "&:hover": { backgroundColor: '#218838' }  // Darker green hover effect
          }}>
            Get Started
          </Button>
        </Container>
      </Box>

      {/* About Section */}
      <Box sx={{ py: 8, backgroundColor: "#f9f9f9", textAlign: "center" }}>
        <Container>
          <Typography variant="h3" className="section-title" sx={{ fontWeight: 'bold', mb: 4 }}>
            About Us
          </Typography>
          <Typography variant="body1" paragraph sx={{ mb: 6, color: '#666', fontSize: '1.1rem' }}>
            Welcome to TechMarket, where innovation meets opportunity. We connect tech professionals 
            with the companies that need them, creating a vibrant marketplace for talent and technology.
          </Typography>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card elevation={5} sx={{ textAlign: 'center', padding: '20px' }}>
                <CardContent>
                  <Avatar sx={{ mb: 2, backgroundColor: '#28a745' }}> {/* Green accent for avatar */}
                    <GroupIcon />
                  </Avatar>
                  <Typography variant="h5" component="div" gutterBottom>
                    Our Mission
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#777' }}>
                    To empower tech professionals to find their ideal roles while helping companies 
                    discover the talent they need to thrive.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card elevation={5} sx={{ textAlign: 'center', padding: '20px' }}>
                <CardContent>
                  <Avatar sx={{ mb: 2, backgroundColor: '#28a745' }}> {/* Green accent for avatar */}
                    <TrendingUpIcon />
                  </Avatar>
                  <Typography variant="h5" component="div" gutterBottom>
                    Our Vision
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#777' }}>
                    We envision a world where technology professionals can easily connect with 
                    opportunities that align with their skills and aspirations.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card elevation={5} sx={{ textAlign: 'center', padding: '20px' }}>
                <CardContent>
                  <Avatar sx={{ mb: 2, backgroundColor: '#28a745' }}> {/* Green accent for avatar */}
                    <EmojiObjectsIcon />
                  </Avatar>
                  <Typography variant="h5" component="div" gutterBottom>
                    Our Approach
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#777' }}>
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
      <Box sx={{ py: 8, backgroundColor: "#fff", textAlign: "center" }}>
        <Container>
          <Typography variant="h3" className="section-title" sx={{ fontWeight: 'bold', mb: 4 }}>Features</Typography>
          <Grid container spacing={3}>
            {[
              { title: 'Profile Creation', icon: <PersonAddIcon />, description: 'Create a comprehensive profile showcasing your skills, experience, and projects.' },
              { title: 'Advanced Job Search', icon: <SearchIcon />, description: 'Use our powerful search tools to find the perfect job match based on your preferences.' },
              { title: 'Direct Messaging', icon: <MessageIcon />, description: 'Connect directly with employers and recruiters through our secure messaging system.' }
            ].map((feature) => (
              <Grid item xs={12} md={4} key={feature.title}>
                <Card elevation={4} sx={{ textAlign: 'center', padding: '20px' }}>
                  <CardContent>
                    <Avatar sx={{ mb: 2, backgroundColor: '#28a745' }}> {/* Green accent for icons */}
                      {feature.icon}
                    </Avatar>
                    <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#777' }}>
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
      <Box component="footer" sx={{ py: 4, backgroundColor: '#333', color: '#fff', textAlign: 'center', mt: 'auto' }}>
        <Container>
          <Typography variant="body2">
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


