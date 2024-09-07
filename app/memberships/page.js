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
              textShadow: "1px 1px 2px black",
              color: "white",
              fontSize: "4rem",
              fontWeight: "bold",
            }}
          >
            Membership Options
          </Typography>

          <Typography
            sx={{
              textShadow: "1px 1px 2px black",
              color: "white",
              fontSize: "1.2rem",
              marginTop: "1rem",
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
          {/* Free Tier */}
          <Box
            sx={{
              width: "25%",
              height: "450px",
              backgroundColor: "#f0f4f8", // Light blue-gray
              padding: "3rem",
              borderRadius: "20px",
              textAlign: "center",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography
              sx={{
                fontSize: "2rem",
                marginBottom: "1rem",
                color: "#2b4162",
                fontWeight: "bold",
              }}
            >
              Free Tier
            </Typography>
            <Typography sx={{ marginBottom: "0.5rem" }}>
              Upload up to 3 projects
            </Typography>
            <Typography sx={{ marginBottom: "0.5rem" }}>5 skill tags</Typography>
            <Typography>Basic profile visibility</Typography>
          </Box>

          {/* Premium Tier */}
          <Box
            sx={{
              width: "25%",
              height: "450px",
              backgroundColor: "#ff9999", // Light orange
              padding: "3rem",
              borderRadius: "20px",
              textAlign: "center",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography
              sx={{
                fontSize: "2rem",
                marginBottom: "1rem",
                color: "#2b4162",
                fontWeight: "bold",
              }}
            >
              Premium
            </Typography>
            <Typography sx={{ marginBottom: "0.5rem" }}>
              Upload unlimited projects
            </Typography>
            <Typography sx={{ marginBottom: "0.5rem" }}>
              Unlimited skill tags
            </Typography>
            <Typography sx={{ marginBottom: "0.5rem" }}>
              Featured profile for employers
            </Typography>
            <Typography>Verified badge</Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}


