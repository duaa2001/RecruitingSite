// components/ProfileDialog.js
import React from 'react';
import { Dialog, DialogContent, Typography, Avatar, Link, Box, Chip, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import DescriptionIcon from '@mui/icons-material/Description';
import CloseIcon from '@mui/icons-material/Close';

export default function ProfileDialog({ open, onClose, profile }) {
  if (!profile) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogContent>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
          <Avatar src={profile.photoURL} alt={profile.name} sx={{ width: 100, height: 100, mb: 2 }} />
          <Typography variant="h4">{profile.name}</Typography>
        </Box>
        <Typography variant="h6" gutterBottom>Bio</Typography>
        <Typography paragraph>{profile.bio}</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 3 }}>
          <Link href={profile.github} target="_blank" rel="noopener noreferrer" sx={{ display: 'flex', alignItems: 'center' }}>
            <GitHubIcon sx={{ mr: 1 }} />
            GitHub
          </Link>
          <Link href={profile.linkedin} target="_blank" rel="noopener noreferrer" sx={{ display: 'flex', alignItems: 'center' }}>
            <LinkedInIcon sx={{ mr: 1 }} />
            LinkedIn
          </Link>
          <Link href={profile.resume} target="_blank" rel="noopener noreferrer" sx={{ display: 'flex', alignItems: 'center' }}>
            <DescriptionIcon sx={{ mr: 1 }} />
            Resume
          </Link>
        </Box>
        <Typography variant="h6" gutterBottom>Skills</Typography>
        <Box>
          {profile.skills && profile.skills.map((skill, index) => (
            <Chip key={index} label={skill} sx={{ mr: 1, mb: 1 }} />
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
}