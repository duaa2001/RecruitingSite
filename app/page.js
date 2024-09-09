'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useUser, useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { AppBar, Toolbar, Typography, Button, Box, Card, CardContent, IconButton, Grid, Container, Avatar, Link, Menu, MenuItem, useMediaQuery } from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
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
import MenuIcon from '@mui/icons-material/Menu';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4caf50',
    },
    secondary: {
      main: '#333333',
    },
    background: {
      default: '#f4f4f4',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
        },
      },
    },
  },
});

const FeatureCard = ({ icon, title, description }) => (
  <Card component={motion.div} whileHover={{ y: -10 }} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      <Avatar sx={{ width: 60, height: 60, mb: 2, backgroundColor: 'primary.main' }}>
        {icon}
      </Avatar>
      <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {description}
      </Typography>
    </CardContent>
  </Card>
);

export default function Home() {
  const { isSignedIn } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState(null);

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

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <AppBar position="sticky" color="transparent" elevation={0} sx={{ backdropFilter: 'blur(20px)', backgroundColor: 'rgba(255,255,255,0.8)' }}>
          <Container>
            <Toolbar>
              <Link href="/" underline="none" color="inherit">
                <Typography variant="h5" component="div" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', color: 'primary.main', fontWeight: 'bold' }}>
                  <WorkIcon sx={{ mr: 1, fontSize: 32 }} />
                  TechMarket
                </Typography>
              </Link>
              <Box sx={{ flexGrow: 1 }} />
              {isMobile ? (
                <>
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleMenu}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    {isSignedIn ? (
                      [
                        <MenuItem key="dashboard" onClick={() => { router.push('/dashboard'); handleClose(); }}>Dashboard</MenuItem>,
                        <MenuItem key="signout" onClick={() => { handleSignOut(); handleClose(); }}>Sign Out</MenuItem>
                      ]
                    ) : (
                      [
                        <MenuItem key="signin" onClick={() => { router.push('/signin'); handleClose(); }}>Sign In</MenuItem>,
                        <MenuItem key="signup" onClick={() => { router.push('/signup'); handleClose(); }}>Sign Up</MenuItem>
                      ]
                    )}
                  </Menu>
                </>
              ) : (
                isSignedIn ? (
                  <>
                    <Button 
                      color="primary" 
                      variant="contained"
                      startIcon={<DashboardIcon />}  
                      onClick={() => router.push('/dashboard')}
                      sx={{ mr: 2 }}
                    >
                      Dashboard
                    </Button>
                    <IconButton color="primary" onClick={handleSignOut}>
                      <LogoutIcon />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <Button color="primary" variant="outlined" href="/signin" sx={{ mr: 2 }}>Sign In</Button>
                    <Button color="primary" variant="contained" href="/signup">Sign Up</Button>
                  </>
                )
              )}
            </Toolbar>
          </Container>
        </AppBar>

        <Box component="main" sx={{ flexGrow: 1 }}>
          <Container>
            <Box component={motion.div} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              sx={{ 
                textAlign: 'center', 
                py: { xs: 8, md: 12 },
                backgroundImage:'url("https://picsum.photos/1200/600")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: 4,
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0,0,0,0.5)',
                }
              }}
            >
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Typography variant="h1" component="h1" sx={{ mb: 2, fontSize: { xs: '2.5rem', md: '4rem' } }}>
                  Welcome to the Tech Marketplace
                </Typography>
                <Typography variant="h5" sx={{ mb: 4, fontWeight: 'normal' }}>
                  Make your Profile. Connect with others. Explore.
                </Typography>
                <Button 
                  variant="contained" 
                  size="large" 
                  onClick={handleGetStarted}
                  sx={{ 
                    py: 1.5, 
                    px: 4, 
                    fontSize: '1.2rem',
                  }}
                >
                  Get Started
                </Button>
              </Box>
            </Box>

            <Box sx={{ py: { xs: 8, md: 12 } }}>
              <Typography variant="h2" align="center" sx={{ mb: 6 }}>
                Our Features
              </Typography>
              <Grid container spacing={4}>
                {[
                  { icon: <PersonAddIcon fontSize="large" />, title: 'Profile Creation', description: 'Create a comprehensive profile showcasing your skills, experience, and projects.' },
                  { icon: <SearchIcon fontSize="large" />, title: 'AI Profile Analysis', description: 'Leverage our advanced AI chat to analyze your profile and receive personalized recommendations.' },
                  { icon: <MessageIcon fontSize="large" />, title: 'Networking', description: 'Connect and search directly with users and engineers through our secure system.' },
                ].map((feature, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <FeatureCard {...feature} />
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: 'background.paper', borderRadius: 4 }}>
              <Container maxWidth="md">
                <Typography variant="h2" align="center" sx={{ mb: 6 }}>
                  About Us
                </Typography>
                <Typography variant="body1" paragraph align="center" sx={{ mb: 4 }}>
                  TechMarket is where innovation meets opportunity. We connect tech professionals 
                  with the companies that need them, creating a vibrant marketplace for talent and technology.
                </Typography>
                <Grid container spacing={4}>
                  {[
                    { icon: <GroupIcon />, title: 'Our Mission', description: 'To empower tech professionals to find their ideal roles while helping companies discover the talent they need to thrive.' },
                    { icon: <TrendingUpIcon />, title: 'Our Vision', description: 'We envision a world where technology professionals can easily connect with opportunities that align with their skills and aspirations.' },
                    { icon: <EmojiObjectsIcon />, title: 'Our Approach', description: 'We leverage advanced matching algorithms and a user-friendly interface to ensure that both job seekers and employers find the best fit.' }
                  ].map((item, index) => (
                    <Grid item xs={12} md={4} key={index}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Avatar sx={{ width: 60, height: 60, mb: 2, mx: 'auto', backgroundColor: 'primary.main' }}>
                          {item.icon}
                        </Avatar>
                        <Typography variant="h5" component="h3" gutterBottom>
                          {item.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.description}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Container>
            </Box>
          </Container>
        </Box>

        <Box component="footer" sx={{ py: 4, backgroundColor: 'secondary.main', color: 'white', mt: 'auto' }}>
          <Container>
            <Grid container spacing={4} justifyContent="space-between" alignItems="center">
              <Grid item xs={12} md={4}>
                <Typography variant="h6" gutterBottom>
                  TechMarket
                </Typography>
                <Typography variant="body2">
                  Connecting talent with opportunity in the tech world.
                </Typography>
              </Grid>
              <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
                <Typography variant="body2">
                  © 2024 TechMarket. All rights reserved.
                </Typography>
              </Grid>
              <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' } }}>
                <IconButton color="inherit" aria-label="GitHub" component="a" href="https://github.com" target="_blank">
                  <GitHubIcon />
                </IconButton>
                <IconButton color="inherit" aria-label="LinkedIn" component="a" href="https://linkedin.com" target="_blank">
                  <LinkedInIcon />
                </IconButton>
                <IconButton color="inherit" aria-label="Twitter" component="a" href="https://twitter.com" target="_blank">
                  <TwitterIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}