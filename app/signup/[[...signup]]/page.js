"use client";
import { Toolbar, Box, Typography, Button, Container } from "@mui/material";
import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function SignUpPage() {
  return (
    <>
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
            <Button
              color="'inherit"
              sx={{
                margin: "3rem",
                fontSize: ".9rem",
                "&:hover": { transition: ".75s", backgroundColor: "gray" },
              }}
              onClick={() => {
                window.location.href("/");
              }}
            >
              Home
            </Button>

            <Button
              color="inherit"
              sx={{
                margin: "3rem",
                fontSize: ".9rem",
                "&:hover": { transition: ".75s", backgroundColor: "gray" },
              }}
              onClick={() => {
                window.location.href = "/memberships";
              }}
            >
              Memberships
            </Button>
            <Button
              color="inherit"
              sx={{
                margin: "3rem",
                fontSize: ".9rem",
                "&:hover": { transition: ".75s", backgroundColor: "gray" },
              }}
              onClick={() => {
                window.location.href = "/about-us";
              }}
            >
              About US
            </Button>
            <Button
              color="inherit"
              sx={{
                mx: "3rem",
                fontSize: ".9rem",
                "&:hover": { transition: ".75s", backgroundColor: "gray" },
              }}
              onClick={() => {
                window.location.href = "/contact-us";
              }}
            >
              Contact
            </Button>
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
