<<<<<<< Updated upstream
export default function MembershipsPage() {
    return (
      <div>
        <h1>Memberships</h1>
        {/* Your code here */}
      </div>
    );
  }
=======
"use client";

import { Box, Typography, Container, CssBaseline } from "@mui/material";

export default function MembershipsPage() {
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          height: "60vh",
          backgroundColor: "#2b4162",
          backgroundImage: "linear-gradient(315deg, #2b4162 0%, #12100e 74%)",
          pt: "5rem",
        }}
      >
        <Box display="flex" flexDirection="column" textAlign="center">
          <Typography
            sx={{
              textshadow: "1px 1px 2px black",
              color: "white",
              fontSize: "4rem",
            }}
          >
            Membership Options
          </Typography>

          <Typography
            sx={{
              textshadow: "1px 1px 2px black",
              color: "white",
              fontSize: "1rem",
            }}
          >
            All memberships include full access to our services and features.
          </Typography>
        </Box>

        <Box
          sx={{
            marginTop: "5rem",
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box
            sx={{
              width: "20%",
              height: "450px",
              backgroundColor: "red",
              padding: "3rem",
              borderRadius: "20px",
              textAlign: "center",
            }}
          >
            <Typography sx={{ fontSize: "2rem", marginBottom: "1rem" }}>
              Free/Basic
            </Typography>
            <p>Upload up to 5 projects </p>
            <p> 5 skill tags</p>
          </Box>

          <Box
            sx={{
              width: "20%",
              height: "450px",
              backgroundColor: "red",
              padding: "3rem",
              borderRadius: "20px",
              textAlign: "center",
            }}
          >
            <Typography sx={{ fontSize: "2rem", marginBottom: "1rem" }}>
              Plus
            </Typography>
            <p>Upload up to 20 projects</p>
            <p>10 skill tags</p>
          </Box>

          <Box
            sx={{
              width: "20%",
              height: "450px",
              backgroundColor: "red",
              padding: "3rem",
              borderRadius: "20px",
              textAlign: "center",
            }}
          >
            <Typography sx={{ fontSize: "2rem", marginBottom: "1rem" }}>
              Premium
            </Typography>
            <p>Upload unlimited projects</p>
            <p> Unlimited skill tags</p>
            <p>Verification badge</p>
          </Box>
        </Box>
      </Box>
    </>
  );
}
>>>>>>> Stashed changes
