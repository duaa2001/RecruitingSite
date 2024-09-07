"use client";
import {
  Toolbar,
  Box,
  Typography,
  Button,
  Container,
  CssBaseline,
} from "@mui/material";
import { SignUp } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link"; // Import Link for navigation

export default function SignUpPage() {
  return (
    <>
      <CssBaseline />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="center"
        height="100vh"
        sx={{
          backgroundColor: "#2b4162",
          backgroundImage: "linear-gradient(315deg, #2b4162 0%, #12100e 74%)",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "center",
            height: "70px",
            borderRadius: "0 0 10px 10px",
            color: "white",
            zIndex: "2",
          }}
        >
          <Box>
            <Link href="/" passHref>
              <Button
                color="inherit"
                sx={{
                  margin: "3rem",
                  fontSize: ".9rem",
                  color: "white",
                  "&:hover": { transition: ".75s", backgroundColor: "gray" },
                }}
              >
                Home
              </Button>
            </Link>

            <Link href="/memberships" passHref>
              <Button
                color="inherit"
                sx={{
                  margin: "3rem",
                  fontSize: ".9rem",
                  color: "white",
                  "&:hover": { transition: ".75s", backgroundColor: "gray" },
                }}
              >
                Memberships
              </Button>
            </Link>

            <Link href="/aboutus" passHref>
              <Button
                color="inherit"
                sx={{
                  margin: "3rem",
                  fontSize: ".9rem",
                  color: "white",
                  "&:hover": { transition: ".75s", backgroundColor: "gray" },
                }}
              >
                FAQ
              </Button>
            </Link>
          </Box>
        </Toolbar>
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            transform: "translateX(20%)",
          }}
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                my: "3rem",
                color: "white",
              }}
            >
              Sign Up
            </Typography>
            <SignUp
              path="/signup"
              routing="path"
              signInUrl="/signin"
              initialValues=""
            />
          </Box>
          <Image
            src="/images/right-recruiting.png"
            alt="Recruiting"
            width={500}
            height={400}
          />
        </Container>
      </Box>
    </>
  );
}

