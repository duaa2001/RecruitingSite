'use client'

import React, { useState } from 'react';
import { Typography, Box, Container, TextField, IconButton, Button, Paper, Chip, Link, CircularProgress, AppBar, Toolbar } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import WorkIcon from '@mui/icons-material/Work';
import { db } from '@/firebase';
import "../styles/styles.css";

export default function CreateProfilePage() {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [github, setGithub] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isLoaded, userId } = useAuth();
  const router = useRouter();

  const handleSkillAdd = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill('');
    }
  };

  const handleSkillDelete = (skillToDelete) => {
    setSkills(skills.filter(skill => skill !== skillToDelete));
  };

  const handleResumeChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setResumeFile(file);
    } else {
      setError('Please upload a PDF file');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoaded || !userId) {
      setError('You must be logged in to create a profile');
      return;
    }

    if (!name || !bio || !github || !linkedin || skills.length === 0 || !resumeFile) {
      setError('All fields are required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let resumeURL = '';
      if (resumeFile) {
        const storage = getStorage();
        const resumeRef = ref(storage, `resumes/${userId}/${resumeFile.name}`);
        await uploadBytes(resumeRef, resumeFile);
        resumeURL = await getDownloadURL(resumeRef);
      }

      const userDoc = doc(db, 'users', userId);
      await setDoc(userDoc, {
        name,
        bio,
        github,
        linkedin,
        resume: resumeURL,
        skills,
      });

      router.push('/dashboard');
    } catch (err) {
      console.error('Error creating profile:', err);
      setError('Failed to create profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded) {
    return <CircularProgress />;
  }

  if (!userId) {
    router.push('/sign-in');
    return null;
  }

  return (
    <Box>
      <AppBar position="static" color="transparent" elevation={3}>
        <Container>
          <Toolbar>
            <Link href="/" underline="none" color="inherit">
              <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                <WorkIcon sx={{ mr: 1 }} />
                TechMarket
              </Typography>
            </Link>
            <Box sx={{ flexGrow: 1 }} />
            <Button 
              color="inherit" 
              onClick={() => router.push('/dashboard')}
              sx={{ mr: 2 }}
            >
              Dashboard
            </Button>
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="md">
        <Paper elevation={3} sx={{ mt: 4, p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Create Your Profile
          </Typography>
          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              label="Bio"
              fullWidth
              multiline
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              label="GitHub URL"
              fullWidth
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              label="LinkedIn URL"
              fullWidth
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              margin="normal"
              required
            />
            <Box sx={{ mt: 2, mb: 2 }}>
              <Typography variant="subtitle1">Resume (PDF only)</Typography>
              <input
                type="file"
                accept="application/pdf"
                onChange={handleResumeChange}
                required
              />
            </Box>
            <Box sx={{ mt: 2, mb: 2 }}>
              <Typography variant="h6">Skills</Typography>
              {skills.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  onDelete={() => handleSkillDelete(skill)}
                  sx={{ mr: 1, mb: 1 }}
                />
              ))}
              <Box sx={{ display: 'flex', mt: 1 }}>
                <TextField
                  label="Add Skill"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  sx={{ mr: 1 }}
                />
                <Button variant="outlined" onClick={handleSkillAdd}>
                  Add
                </Button>
              </Box>
            </Box>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              disabled={loading}
            >
              {loading ? 'Creating Profile...' : 'Create Profile'}
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}