"use client";

import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Typography,
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Avatar,
  Link,
  Chip,
  AppBar,
  Toolbar,
  Button,
  CircularProgress,
  IconButton,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import DescriptionIcon from "@mui/icons-material/Description";
import WorkIcon from "@mui/icons-material/Work";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/navigation";
import { useUser, useClerk } from "@clerk/nextjs";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import "../styles/styles.css";
import HeadlineTicker from "../components/HeadlineTicker";
import ProfileDialog from "../components/ProfileDialog";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [educationFilter, setEducationFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const { user, isLoaded, isSignedIn } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [hasProfile, setHasProfile] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const { signOut } = useClerk();
  const [headlines, setHeadlines] = useState([]);
  const router = useRouter();
  const [filteredMajors, SetFilteredMajors] = useState([]);
  const [selectedMajors, setSelectedMajors] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, "users");
        const userSnapshot = await getDocs(usersCollection);
        const userList = userSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(userList);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    const checkUserProfile = async () => {
      if (user) {
        const userDoc = doc(db, "users", user.id);
        const userSnapshot = await getDoc(userDoc);
        setHasProfile(userSnapshot.exists());
      }
    };

    const fetchHeadlines = async () => {
      const fetchedHeadlines = [
        "New jobs in tech are up by 20% this month!",
        "Demand for React developers continues to rise.",
        "AI skills are becoming essential in the job market.",
        "Remote work opportunities are increasing in tech.",
      ];
      setHeadlines(fetchedHeadlines);
    };

    if (isSignedIn) {
      fetchUsers();
      checkUserProfile();
      fetchHeadlines();
    }
  }, [isSignedIn, user]);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleOpenProfile = (profile) => {
    setSelectedProfile(profile);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (!isSignedIn) {
    router.push("/signin");
    return null;
  }

  const handleSearch = () => {
    const filtered = users.filter((user) => {
      const nameMatch = user.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const skillsMatch =
        Array.isArray(user.skills) &&
        user.skills.some((skill) =>
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        );
      const educationMatch =
        educationFilter === "" || user.education === educationFilter;

      return (nameMatch || skillsMatch) && educationMatch;
    });
    setFilteredUsers(filtered);
  };

  const ModifyCategory = (event) => {
    if (selectedMajors.includes(event.target.value)) {
      setSelectedMajors(
        selectedMajors.filter((major) => major !== event.target.value)
      );
    } else {
      setSelectedMajors([...selectedMajors, event.target.value]);
    }
    SetFilteredMajors([...filteredMajors, event.target.value]);
  };
  console.log(`THIS IS THE SELECTED MAJORS: ${selectedMajors}`);

  return (
    <>
      <Box className="Container">
        <AppBar position="static" color="transparent" elevation={3}>
          <Container>
            <Toolbar>
              <Link href="/" underline="none" color="inherit">
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}
                >
                  <WorkIcon sx={{ mr: 1 }} />
                  TechMarket
                </Typography>
              </Link>
              <Box sx={{ flexGrow: 1 }} />
              {hasProfile ? (
                <Button
                  color="inherit"
                  onClick={() => router.push("/edit_profile")}
                  sx={{ mr: 2 }}
                >
                  My Profile
                </Button>
              ) : (
                <Button
                  color="inherit"
                  onClick={() => router.push("/create_profile")}
                  sx={{ mr: 2 }}
                >
                  Create Profile
                </Button>
              )}
              <IconButton color="inherit" onClick={handleSignOut}>
                <LogoutIcon />
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>

        <Container sx={{ mt: 4 }}>
          <Typography variant="h4" gutterBottom>
            Tech Professionals
          </Typography>

          <HeadlineTicker headlines={headlines} />

          {/* Search Input */}
          <Box display="flex" sx={{ mt: 2, mb: 2 }}>
            <TextField
              label="Search profiles by name or skill"
              variant="outlined"
              size="small"
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ mr: 2 }}
            />
            <Button
              variant="contained"
              onClick={handleSearch}
              className="button"
              sx={{ height: "40px" }}
            >
              Search
            </Button>
          </Box>

          <FormControl sx={{ mr: 2, minWidth: 150, mb: 2 }}>
            {" "}
            {/* Add margin bottom */}
            <InputLabel>Education</InputLabel>
            <Select
              value={educationFilter}
              label="Education"
              onChange={(e) => setEducationFilter(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Bachelor">Bachelor&apos;s</MenuItem>
              <MenuItem value="Master">Master&apos;s</MenuItem>
            </Select>
          </FormControl>
        </Container>
        <Box width={"100%"} display="flex" justifyContent="center">
          <Box mx={4} width={"70%"}>
            {loading ? (
              <CircularProgress />
            ) : filteredUsers.length > 0 ? (
              <Grid container spacing={3}>
                {filteredUsers.map((user) => (
                  <Grid item xs={12} sm={6} md={4} key={user.id}>
                    <Card
                      onClick={() => handleOpenProfile(user)}
                      style={{ cursor: "pointer" }}
                    >
                      <CardContent>
                        <Box display="flex" alignItems="center" mb={2}>
                          <Avatar
                            src={user.photoURL}
                            alt={user.name}
                            sx={{ mr: 2 }}
                          />
                          <Typography variant="h6">{user.name}</Typography>
                        </Box>
                        <Box mb={2}>
                          <GitHubIcon sx={{ mr: 1 }} />
                          GitHub
                        </Box>
                        <Box mb={2}>
                          <LinkedInIcon sx={{ mr: 1 }} />
                          LinkedIn
                        </Box>
                        <Box mb={2}>
                          <DescriptionIcon sx={{ mr: 1 }} />
                          Resume
                        </Box>
                        <Box>
                          {user.skills &&
                            user.skills
                              .slice(0, 8)
                              .map((skill, index) => (
                                <Chip
                                  key={index}
                                  label={skill}
                                  sx={{ mr: 1, mb: 1 }}
                                />
                              ))}
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography>No users found.</Typography>
            )}
          </Box>

          <ProfileDialog
            open={openDialog}
            onClose={handleCloseDialog}
            profile={selectedProfile}
          />
        </Box>
      </Box>
    </>
  );
}
