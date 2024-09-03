'use client'

import React, { useState } from 'react';
import { Typography, Box, Container, TextField, Button, Paper, Chip, CircularProgress, AppBar, Toolbar} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase'; // Adjust the path accordingly

export default function CreateProfile() {
  const [name, setName] = useState(''); // State for the name
  const [bio, setBio] = useState('');
  const [github, setGithub] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [resume, setResume] = useState('');
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState('');
  const [error, setError] = useState(null);
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  const handleSkillAdd = () => {
    if (skillInput.trim() !== '') {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const handleSkillDelete = (skillToDelete) => {
    setSkills(skills.filter(skill => skill !== skillToDelete));
  };

  const handleSubmit = async () => {
    if (!isSignedIn || !user) {
      router.push('/signin');
      return;
    }

    try {
      const db = getFirestore();
      const userDoc = doc(db, 'users', user.id);
      await setDoc(userDoc, {
        name, // Include name in the data submission
        bio,
        github,
        linkedin,
        resume,
        skills,
      });
      router.push('/profile');
    } catch (err) {
      console.error('Error creating profile:', err);
      setError('Failed to create profile');
    }
  };

  if (!isLoaded) {
    return <CircularProgress />;
  }

  if (!isSignedIn) {
    router.push('/signin');
    return null;
  }

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TechMarket
          </Typography>
          <Button color="inherit" onClick={() => router.push('/dashboard')}>Dashboard</Button>
          <Button color="inherit" onClick={() => router.push('/profile')}>My Profile</Button>
          {/* <Button color="inherit" onClick={handleSignOut}>Sign Out</Button> */}
        </Toolbar>
      </AppBar>

      <Container maxWidth="md">
        <Paper elevation={3} sx={{ mt: 4, p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Create Profile
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          <TextField
            label="Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Bio"
            fullWidth
            multiline
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="GitHub"
            fullWidth
            value={github}
            onChange={(e) => setGithub(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="LinkedIn"
            fullWidth
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Resume"
            fullWidth
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Box mb={2}>
            <TextField
              label="Add Skill"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSkillAdd()}
              sx={{ mb: 2 }}
            />
            <Button variant="outlined" onClick={handleSkillAdd} sx={{ mb: 2 }}>
              Add Skill
            </Button>
            <Box>
              {skills.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  onDelete={() => handleSkillDelete(skill)}
                  sx={{ mr: 1, mb: 1 }}
                />
              ))}
            </Box>
          </Box>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Create Profile
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}
