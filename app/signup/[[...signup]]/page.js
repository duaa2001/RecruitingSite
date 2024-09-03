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

export default function SignUpPage() {
  return (
    <>
      <Box
        height="100vh"
        width="100vw"
        sx={{ background: "linear-gradient(#e66465, #9198e5)" }}
        disableGutters
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "center",
            height: "70px",
          }}
        >
          <Box>
            <Button
              color="'inherit"
              sx={{ margin: "3rem", fontSize: ".9rem" }}
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
              }}
              onClick={() => {
                window.location.href = "/contact-us";
              }}
            >
              Contact
            </Button>
          </Box>
        </Toolbar>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", textAlign: "center", my: "3rem" }}
          >
            Sign Up
          </Typography>
          <SignUp path="/signup" routing="path" signInUrl="/signin" />
        </Box>
      </Box>
    </>
  );
}
