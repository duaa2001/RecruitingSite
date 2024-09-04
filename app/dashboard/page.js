'use client'

import React, { useState, useEffect } from 'react';
import { TextField, Typography, Box, Container, Grid, Card, CardContent, Avatar, Link, Chip, AppBar, Toolbar, Button, CircularProgress } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import DescriptionIcon from '@mui/icons-material/Description';
import { useRouter } from 'next/navigation';
import { useUser, useClerk } from '@clerk/nextjs';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase'; // Adjust the path accordingly

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, isLoaded, isSignedIn } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const { signOut } = useClerk();
  const router = useRouter();


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const db = getFirestore();
        const usersCollection = collection(db, 'users');
        const userSnapshot = await getDocs(usersCollection);
        const userList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(userList);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isSignedIn) {
      fetchUsers();
    }
  }, [isSignedIn]);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (!isLoaded) {
    return <CircularProgress />;
  }

  if (!isSignedIn) {
    router.push('/signin');
    return null;
  }

  const handleSearch = () => {
    const filteredUsers = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setUsers(filteredUsers);
  };
  

  return (
    <Box>
      <AppBar position="static" sx={{ backgroundColor: '#10a37f' }}>
        <Toolbar>
        <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/" passHref>
              <Button color="inherit" sx={{ textTransform: 'none', color: 'white', fontSize: '2rem'}}>
                TechMarket
              </Button>
            </Link>
          </Typography>
          <Button color="inherit" onClick={() => router.push('/create_profile')}>Create Profile</Button>
          <Button color="inherit" onClick={() => router.push('/profile')}>My Profile</Button>
          <Button color="inherit" onClick={handleSignOut}>Sign Out</Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Tech Professionals
        </Typography>

         {/* Search Input */}
  <Box display="flex" mb={2} sx={{ backgroundColor: 'black' }}>
    <TextField
      label="Search profiles by name or skill"
      variant="outlined"
      size="small"
      fullWidth
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      sx={{ mr: 2, backgroundColor: 'white', input: { color: 'black' }, label: { color: 'black' } }}
    />
    <Button variant="contained" sx={{ backgroundColor: 'black', color: 'white' }} onClick={handleSearch}>
      Search
    </Button>
  </Box>

        {loading ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={3}>
            {users.map((user) => (
              <Grid item xs={12} sm={6} md={4} key={user.id}>
                <Card>
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Avatar src={user.photoURL} alt={user.name} sx={{ mr: 2 }} />
                      <Typography variant="h6">{user.name}</Typography>
                    </Box>
                    <Box mb={2}>
                      <Link href={user.github} target="_blank" rel="noopener noreferrer">
                        <GitHubIcon sx={{ mr: 1 }} />
                        GitHub
                      </Link>
                    </Box>
                    <Box mb={2}>
                      <Link href={user.linkedin} target="_blank" rel="noopener noreferrer">
                        <LinkedInIcon sx={{ mr: 1 }} />
                        LinkedIn
                      </Link>
                    </Box>
                    <Box mb={2}>
                      <Link href={user.resume} target="_blank" rel="noopener noreferrer">
                        <DescriptionIcon sx={{ mr: 1 }} />
                        Resume
                      </Link>
                    </Box>
                    <Box>
                      {user.skills && user.skills.slice(0, 5).map((skill, index) => (
                        <Chip key={index} label={skill} sx={{ mr: 1, mb: 1 }} />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}