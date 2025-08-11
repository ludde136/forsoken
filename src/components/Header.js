import React from "react";
import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";
import { HomeIcon, NatureIcon } from "@mui/icons-material";
import { useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

  const handleHomeClick = () => {
    // Hvis vi ikke er på hovedsiden, naviger til hjem
    if (location.pathname !== "/") {
      window.location.href = "/";
    } else {
      // Hvis vi allerede er på hjem, bare scroll til toppen
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        background: "linear-gradient(135deg, #2d5016 0%, #4a7c59 100%)",
        backdropFilter: "blur(10px)",
        boxShadow: "0 4px 20px rgba(45, 80, 22, 0.3)",
        height: "56px",
        borderBottom: "2px solid #6b8e23",
      }}
    >
      <Toolbar sx={{ minHeight: "56px", px: { xs: 1, sm: 2 } }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <NatureIcon sx={{ color: "#f59e0b", fontSize: "1.5rem" }} />
          <Typography
            variant="h6"
            sx={{
              color: "white",
              fontWeight: 600,
              fontSize: { xs: "1rem", sm: "1.2rem" },
              textShadow: "0 1px 2px rgba(0,0,0,0.3)",
            }}
          >
            Trulsrudkollen
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Button
          onClick={handleHomeClick}
          startIcon={<HomeIcon />}
          variant="contained"
          size="small"
          sx={{
            background: "linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)",
            "&:hover": {
              background: "linear-gradient(135deg, #ea580c 0%, #dc2626 100%)",
              transform: "translateY(-2px)",
              boxShadow: "0 6px 20px rgba(245, 158, 11, 0.4)",
            },
            textTransform: "none",
            borderRadius: 3,
            px: 2.5,
            py: 0.75,
            transition: "all 0.3s ease",
            fontSize: "0.875rem",
            fontWeight: 600,
            color: "white",
            border: "2px solid rgba(255,255,255,0.2)",
          }}
        >
          Hjem
        </Button>
        <Box sx={{ flexGrow: 1 }} />
      </Toolbar>
    </AppBar>
  );
}

export default Header;
