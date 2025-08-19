import React from "react";
import { AppBar, Toolbar, Box, Typography, Button } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useLocation, Link, useNavigate } from "react-router-dom";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleHomeClick = () => {
    // Send custom event for å tilbakestille bildet til det første
    window.dispatchEvent(new CustomEvent("resetImageToFirst"));

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

  const handleCabinGuestClick = () => {
    // Sjekk om brukeren allerede har riktig passord
    const savedPassword = localStorage.getItem("hyttegjester_password");
    if (savedPassword === "3579") {
      // Brukeren har allerede riktig passord, naviger direkte
      navigate("/for-hyttegjester");
    } else {
      // Brukeren må skrive inn passord, naviger til passordskjermen
      navigate("/for-hyttegjester");
    }
  };

  return (
    <AppBar
      position="fixed"
      className="modern-header"
      sx={{
        background: "rgba(45, 80, 22, 0.95)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow: "0 12px 40px rgba(45, 80, 22, 0.3)",
        height: "64px",
        borderBottom: "2px solid rgba(245, 158, 11, 0.3)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          background: "rgba(45, 80, 22, 0.98)",
          boxShadow: "0 16px 50px rgba(45, 80, 22, 0.4)",
        },
      }}
    >
      <Toolbar sx={{ minHeight: "64px", px: { xs: 2, sm: 3 } }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            animation: "slideInLeft 0.8s ease-out",
            cursor: "pointer",
            padding: "8px 16px",
            borderRadius: "12px",
            transition: "all 0.3s ease",
            "&:hover": {
              background: "rgba(255, 255, 255, 0.1)",
              transform: "scale(1.02)",
            },
          }}
          onClick={handleHomeClick}
        >
          <FavoriteIcon
            sx={{
              color: "#f59e0b",
              fontSize: "2rem",
              filter: "drop-shadow(0 2px 4px rgba(245, 158, 11, 0.3))",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "scale(1.1) rotate(5deg)",
                filter: "drop-shadow(0 4px 8px rgba(245, 158, 11, 0.5))",
              },
            }}
          />
          <Typography
            variant="h6"
            sx={{
              color: "#ffffff",
              fontWeight: 700,
              fontSize: { xs: "1.1rem", sm: "1.4rem" },
              textShadow:
                "0 2px 4px rgba(0,0,0,0.8), 0 4px 8px rgba(0,0,0,0.6)",
              letterSpacing: "0.5px",
              transition: "all 0.3s ease",
              "&:hover": {
                textShadow:
                  "0 4px 8px rgba(0,0,0,0.9), 0 6px 12px rgba(0,0,0,0.7)",
                transform: "scale(1.02)",
                color: "#f8fafc",
              },
            }}
          >
            Trulsrudkollen
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }} />

        {/* Lenke til "For hyttegjester" */}
        <Button
          onClick={handleCabinGuestClick}
          variant="text"
          sx={{
            color: "#ffffff",
            fontWeight: 600,
            fontSize: { xs: "0.9rem", sm: "1rem" },
            textTransform: "none",
            padding: "8px 16px",
            borderRadius: "12px",
            transition: "all 0.3s ease",
            "&:hover": {
              background: "rgba(255, 255, 255, 0.1)",
              transform: "scale(1.05)",
              color: "#f8fafc",
            },
          }}
        >
          For hyttegjester
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
