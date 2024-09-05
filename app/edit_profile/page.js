'use client'

import React, { useState, useEffect } from 'react';
import { Typography, Box, Container, TextField, Button, Paper, Chip, CircularProgress, AppBar, Toolbar, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link, IconButton } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { doc, getDoc, updateDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase'; // Adjust the path accordingly

export default function EditProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [github, setGithub] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [resume, setResume] = useState('');
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [education, setEducation] = useState([]);
  const [workExperience, setWorkExperience] = useState([]);
  const [projects, setProjects] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const { isLoaded, userId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      if (isLoaded && userId) {
        try {
          const userDoc = doc(db, 'users', userId);
          const userSnapshot = await getDoc(userDoc);
          if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            setProfile(userData);
            setName(userData.name || '');
            setBio(userData.bio || '');
            setGithub(userData.github || '');
            setLinkedin(userData.linkedin || '');
            setResume(userData.resume || '');
            setSkills(userData.skills || []);
            setEducation(userData.education || []);
            setWorkExperience(userData.workExperience || []);
            setProjects(userData.projects || []);
          } else {
            setError('No profile found. Please create your profile.');
          }
        } catch (err) {
          console.error('Error fetching profile:', err);
          setError('Failed to load profile');
        } finally {
          setLoading(false);
        }
      } else if (isLoaded && !userId) {
        router.push('/sign-in');
      }
    };

    fetchProfile();
  }, [isLoaded, userId, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      setError('User not authenticated');
      return;
    }

    setUpdating(true);
    setError(null);
    setSuccessMessage('');

    try {
      const userDoc = doc(db, 'users', userId);
      const profileData = {
        name,
        bio,
        github,
        linkedin,
        resume,
        skills,
        education,
        workExperience,
        projects,
      };

      if (profile) {
        await updateDoc(userDoc, profileData);
      } else {
        await setDoc(userDoc, profileData);
      }

      setSuccessMessage('Profile updated successfully!');
      setProfile(prev => ({ ...prev, ...profileData }));
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile: ' + err.message);
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteProfile = async () => {
    if (!userId) {
      setError('User not authenticated');
      return;
    }

    setDeleting(true);
    setError(null);
    setSuccessMessage('');

    try {
      const userDoc = doc(db, 'users', userId);
      await deleteDoc(userDoc);
      setSuccessMessage('Profile deleted successfully!');
      setProfile(null);
      // Reset all form fields
      setName('');
      setBio('');
      setGithub('');
      setLinkedin('');
      setResume('');
      setSkills([]);
      setEducation([]);
      setWorkExperience([]);
      setProjects([]);
      // Optionally, redirect to dashboard or home page
      router.push('/dashboard');
    } catch (err) {
      console.error('Error deleting profile:', err);
      setError('Failed to delete profile: ' + err.message);
    } finally {
      setDeleting(false);
      setOpenDeleteDialog(false);
    }
  };

  const handleSkillAdd = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleSkillDelete = (skillToDelete) => {
    setSkills(skills.filter(skill => skill !== skillToDelete));
  };

  const handleEducationChange = (index, field, value) => {
    const newEducation = [...education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    setEducation(newEducation);
  };

  const handleAddEducation = () => {
    setEducation([...education, { major: '', degree: '', graduationYear: '' }]);
  };

  const handleRemoveEducation = (index) => {
    setEducation(education.filter((_, i) => i !== index));
  };

  const handleWorkExperienceChange = (index, field, value) => {
    const newWorkExperience = [...workExperience];
    newWorkExperience[index] = { ...newWorkExperience[index], [field]: value };
    setWorkExperience(newWorkExperience);
  };

  const handleAddWorkExperience = () => {
    setWorkExperience([...workExperience, { position: '', company: '', startDate: '', endDate: '' }]);
  };

  const handleRemoveWorkExperience = (index) => {
    setWorkExperience(workExperience.filter((_, i) => i !== index));
  };

  const handleProjectChange = (index, field, value) => {
    const newProjects = [...projects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    setProjects(newProjects);
  };

  const handleAddProject = () => {
    setProjects([...projects, { title: '', youtubeLink: '', description: '' }]);
  };

  const handleRemoveProject = (index) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  const isFormValid = name && bio && github && linkedin && resume && skills.length > 0;

  if (!isLoaded || loading) {
    return <CircularProgress />;
  }

  return (
    <Box>
      <AppBar position="static" color="transparent" elevation={4}>
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
            {profile ? 'My Profile' : 'Create Profile'}
          </Typography>
          {successMessage && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {successMessage}
            </Alert>
          )}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
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
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleSkillAdd())}
                  sx={{ mr: 1 }}
                />
                <Button variant="outlined" onClick={handleSkillAdd}>
                  Add
                </Button>
              </Box>
            </Box>

            <Box sx={{ mt: 2, mb: 2 }}>
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
                  <IconButton onClick={() => handleRemoveEducation(index)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
              <Button startIcon={<AddCircleOutlineIcon />} onClick={handleAddEducation} variant="outlined">
                Add Education
              </Button>
            </Box>

            <Box sx={{ mt: 2, mb: 2 }}>
              <Typography variant="h6">Work Experience</Typography>
              {workExperience.map((exp, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <TextField
                    label="Position"
                    fullWidth
                    value={exp.position}
                    onChange={(e) => handleWorkExperienceChange(index, 'position', e.target.value)}
                    margin="normal"
                    required
                  />
                  <TextField
                    label="Company"
                    fullWidth
                    value={exp.company}
                    onChange={(e) => handleWorkExperienceChange(index, 'company', e.target.value)}
                    margin="normal"
                    required
                  />
                  <TextField
                    label="Start Date"
                    fullWidth
                    type="date"
                    value={exp.startDate}
                    onChange={(e) => handleWorkExperienceChange(index, 'startDate', e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    margin="normal"
                    required
                  />
                  <TextField
                    label="End Date"
                    fullWidth
                    type="date"
                    value={exp.endDate}
                    onChange={(e) => handleWorkExperienceChange(index, 'endDate', e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    margin="normal"
                    required
                  />
                  <IconButton onClick={() => handleRemoveWorkExperience(index)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
              <Button startIcon={<AddCircleOutlineIcon />} onClick={handleAddWorkExperience} variant="outlined">
                Add Work Experience
              </Button>
            </Box>

            <Box sx={{ mt: 2, mb: 2 }}>
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
                    label="Description"
                    fullWidth
                    multiline
                    rows={3}
                    value={project.description}
                    onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                    margin="normal"
                    required
                  />
                  <IconButton onClick={() => handleRemoveProject(index)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
              <Button startIcon={<AddCircleOutlineIcon />} onClick={handleAddProject} variant="outlined">
                Add Project
              </Button>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                disabled={updating || !isFormValid}
              >
                {updating ? 'Updating...' : (profile ? 'Update Profile' : 'Create Profile')}
              </Button>

              
              {profile && (
                <Button 
                  variant="contained" 
                  color="error"
                  onClick={() => setOpenDeleteDialog(true)}
                  disabled={deleting}
                >
                  {deleting ? 'Deleting...' : 'Delete Profile'}
                </Button>
              )}
            </Box>
          </form>
        </Paper>
      </Container>

      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete your profile?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action cannot be undone. All your profile data will be permanently deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDeleteProfile} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
