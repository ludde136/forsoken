import React from "react";
import { Box, IconButton, Link, Typography } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "linear-gradient(135deg, #2d5016 0%, #4a7c59 100%)",
        backdropFilter: "blur(10px)",
        borderTop: "3px solid #f59e0b",
        padding: "8px 16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 1000,
        height: "50px",
        boxShadow: "0 -4px 20px rgba(45, 80, 22, 0.3)",
      }}
    >
      <Typography
        variant="caption"
        sx={{
          color: "white",
          fontSize: "0.75rem",
          fontWeight: 500,
          textShadow: "0 1px 2px rgba(0,0,0,0.3)",
        }}
      >
        © 2024 Trulsrudkollen
      </Typography>

      <Box sx={{ display: "flex", gap: 1 }}>
        <Link
          href="https://www.instagram.com/trulsrudkollen"
          target="_blank"
          rel="noopener noreferrer"
        >
          <InstagramIcon
            sx={{
              fontSize: "34px",
              color: "#e4405f",
              "&:hover": {
                transform: "scale(1.1)",
              },
              transition: "all 0.2s ease",
            }}
          />
        </Link>

        <Link
          href="https://www.inatur.no/tilbud/61a68c0295acd111a0c39397"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/inatur-logo.png"
            alt="Inatur"
            style={{
              width: "auto",
              height: "34px",
              objectFit: "contain",
              cursor: "pointer",
            }}
          />
        </Link>
      </Box>
    </Box>
  );
}

export default Footer;
