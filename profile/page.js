'use client'

import React, { useState, useEffect } from 'react';
import { Typography, Box, Container, Link, Chip, Paper, AppBar, Toolbar, Button, CircularProgress } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import DescriptionIcon from '@mui/icons-material/Description';
import { useRouter } from 'next/navigation';
import { useUser, useClerk } from '@clerk/nextjs';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, isLoaded, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      if (isSignedIn && user) {
        try {
          const db = getFirestore();
          const userDoc = doc(db, 'users', user.id);
          const userSnapshot = await getDoc(userDoc);
          if (userSnapshot.exists()) {
            setProfile(userSnapshot.data());
          } else {
            setError('Profile not found');
          }
        } catch (err) {
          console.error('Error fetching profile:', err);
          setError('Failed to load profile');
        } finally {
          setLoading(false);
        }
      }
    };

    if (isLoaded) {
      fetchProfile();
    }
  }, [user, isLoaded, isSignedIn]);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (!isLoaded || loading) {
    return <CircularProgress />;
  }

  if (!isSignedIn) {
    router.push('/signin');
    return null;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TechMarket
          </Typography>
          <Button color="inherit" onClick={() => router.push('/dashboard')}>Dashboard</Button>
          <Button color="inherit" onClick={handleSignOut}>Sign Out</Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md">
        <Paper elevation={3} sx={{ mt: 4, p: 3 }}>
          <Typography variant="h4" gutterBottom>
            My Profile
          </Typography>
          {profile ? (
            <>
              <Box mb={2}>
                <Typography variant="h6">Bio</Typography>
                <Typography>{profile.bio || 'No bio available'}</Typography>
              </Box>
              <Box mb={2}>
                <Link href={profile.github} target="_blank" rel="noopener noreferrer">
                  <GitHubIcon sx={{ mr: 1 }} />
                  GitHub
                </Link>
              </Box>
              <Box mb={2}>
                <Link href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                  <LinkedInIcon sx={{ mr: 1 }} />
                  LinkedIn
                </Link>
              </Box>
              <Box mb={2}>
                <Link href={profile.resume} target="_blank" rel="noopener noreferrer">
                  <DescriptionIcon sx={{ mr: 1 }} />
                  Resume
                </Link>
              </Box>
              <Box>
                <Typography variant="h6">Top Skills</Typography>
                {profile.skills && profile.skills.length > 0 ? (
                  profile.skills.slice(0, 5).map((skill, index) => (
                    <Chip key={index} label={skill} sx={{ mr: 1, mb: 1 }} />
                  ))
                ) : (
                  <Typography>No skills listed</Typography>
                )}
              </Box>
            </>
          ) : (
            <Typography>No profile data available</Typography>
          )}
        </Paper>
      </Container>
    </Box>
  );
}