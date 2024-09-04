'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { Box, Typography, Avatar, Link, CircularProgress,Chip } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import DescriptionIcon from '@mui/icons-material/Description';
import { db } from '../../firebase';

export default function ProfilePage() {
  const router = useRouter();
  const { id } = router.query;
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Profile ID:", id);
  }, [id]);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileDoc = doc(db, 'users', id);
        const profileSnapshot = await getDoc(profileDoc);
        if (profileSnapshot.exists()) {
          setProfile(profileSnapshot.data());
        } else {
          router.push('/404'); // Redirect to 404 if user not found
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProfile();
    }
  }, [id, router]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!profile) {
    return <Typography>User not found</Typography>;
  }

  return (
    <Box>
      <Box display="flex" alignItems="center" mb={2}>
        <Avatar src={profile.photoURL} alt={profile.name} sx={{ mr: 2, width: 100, height: 100 }} />
        <Typography variant="h4">{profile.name}</Typography>
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
      <Typography variant="h6">Skills:</Typography>
      <Box>
        {profile.skills && profile.skills.map((skill, index) => (
          <Chip key={index} label={skill} sx={{ mr: 1, mb: 1 }} />
        ))}
      </Box>
    </Box>
  );
}
