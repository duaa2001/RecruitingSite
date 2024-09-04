
'use client'

import React, { useState } from 'react';
import { Typography, Box, Container, TextField, Button, Paper, Chip, Link, CircularProgress, AppBar, Toolbar, IconButton } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { doc, setDoc } from 'firebase/firestore';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import WorkIcon from '@mui/icons-material/Work';
import { db } from '../../firebase';
import "../styles/styles.css";

export default function CreateProfilePage() {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [github, setGithub] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [resume, setResume] = useState('');
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [education, setEducation] = useState([{ major: '', degree: '', graduationYear: '' }]);
  const [workExperience, setWorkExperience] = useState([{ position: '', company: '', startDate: '', endDate: '' }]);
  const [projects, setProjects] = useState([{ title: '', youtubeLink: '', description: '' }]);
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

  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...education];
    updatedEducation[index][field] = value;
    setEducation(updatedEducation);
  };

  const handleWorkExperienceChange = (index, field, value) => {
    const updatedWorkExperience = [...workExperience];
    updatedWorkExperience[index][field] = value;
    setWorkExperience(updatedWorkExperience);
  };

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...projects];
    updatedProjects[index][field] = value;
    setProjects(updatedProjects);
  };

  const handleAddEducation = () => {
    setEducation([...education, { major: '', degree: '', graduationYear: '' }]);
  };

  const handleAddWorkExperience = () => {
    setWorkExperience([...workExperience, { position: '', company: '', startDate: '', endDate: '' }]);
  };

  const handleAddProject = () => {
    setProjects([...projects, { title: '', youtubeLink: '', description: '' }]);
  };

  const handleRemoveEducation = (index) => {
    const updatedEducation = education.filter((_, i) => i !== index);
    setEducation(updatedEducation);
  };

  const handleRemoveWorkExperience = (index) => {
    const updatedWorkExperience = workExperience.filter((_, i) => i !== index);
    setWorkExperience(updatedWorkExperience);
  };

  const handleRemoveProject = (index) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    setProjects(updatedProjects);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoaded || !userId) {
      setError('You must be logged in to create a profile');
      return;
    }

    if (!name || !bio || !github || !linkedin || skills.length === 0 || !resume || education.length === 0 || workExperience.length === 0 || projects.length === 0) {
      setError('All fields are required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const userDoc = doc(db, 'users', userId);
      await setDoc(userDoc, {
        name,
        bio,
        github,
        linkedin,
        resume,
        skills,
        education,
        workExperience,
        projects,
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
            <TextField
              label="Resume URL"
              fullWidth
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              margin="normal"
              required
              helperText="Enter the URL of your resume (e.g., Google Drive or Dropbox link)"
            />
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

            {/* Education Section */}
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6">Education</Typography>
              {education.map((edu, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <TextField
                    label="Major"
                    fullWidth
                    value={edu.major}
                    onChange={(e) => handleEducationChange(index, 'major', e.target.value)}
                    margin="normal"
                    required
                  />
                  <TextField
                    label="Degree"
                    fullWidth
                    value={edu.degree}
                    onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                    margin="normal"
                    required
                  />
                  <TextField
                    label="Graduation Year"
                    fullWidth
                    value={edu.graduationYear}
                    onChange={(e) => handleEducationChange(index, 'graduationYear', e.target.value)}
                    margin="normal"
                    required
                  />
                  <IconButton aria-label="delete" color="secondary" onClick={() => handleRemoveEducation(index)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
              <Button startIcon={<AddCircleOutlineIcon />} onClick={handleAddEducation}>
                Add Education
              </Button>
            </Box>

            {/* Work Experience Section */}
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6">Work Experience</Typography>
              {workExperience.map((work, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <TextField
                    label="Position"
                    fullWidth
                    value={work.position}
                    onChange={(e) => handleWorkExperienceChange(index, 'position', e.target.value)}
                    margin="normal"
                    required
                  />
                  <TextField
                    label="Company"
                    fullWidth
                    value={work.company}
                    onChange={(e) => handleWorkExperienceChange(index, 'company', e.target.value)}
                    margin="normal"
                    required
                  />
                  <TextField
                    label="Start Date"
                    fullWidth
                    value={work.startDate}
                    onChange={(e) => handleWorkExperienceChange(index, 'startDate', e.target.value)}
                    margin="normal"
                    required
                  />
                  <TextField
                    label="End Date"
                    fullWidth
                    value={work.endDate}
                    onChange={(e) => handleWorkExperienceChange(index, 'endDate', e.target.value)}
                    margin="normal"
                    required
                  />
                  <IconButton aria-label="delete" color="secondary" onClick={() => handleRemoveWorkExperience(index)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
              <Button startIcon={<AddCircleOutlineIcon />} onClick={handleAddWorkExperience}>
                Add Work Experience
              </Button>
            </Box>

            {/* Projects Section */}
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6">Projects</Typography>
              {projects.map((project, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <TextField
                    label="Project Title"
                    fullWidth
                    value={project.title}
                    onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                    margin="normal"
                    required
                  />
                  <TextField
                    label="YouTube Link"
                    fullWidth
                    value={project.youtubeLink}
                    onChange={(e) => handleProjectChange(index, 'youtubeLink', e.target.value)}
                    margin="normal"
                    required
                  />
                  <TextField
                    label="Project Description"
                    fullWidth
                    multiline
                    rows={3}
                    value={project.description}
                    onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                    margin="normal"
                    required
                  />
                  <IconButton aria-label="delete" color="secondary" onClick={() => handleRemoveProject(index)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
              <Button startIcon={<AddCircleOutlineIcon />} onClick={handleAddProject}>
                Add Project
              </Button>
            </Box>

            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              disabled={loading}
              sx={{ mt: 4 }}
            >
              {loading ? 'Creating Profile...' : 'Create Profile'}
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}
