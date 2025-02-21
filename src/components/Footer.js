import React from "react";
import { Box, IconButton, Link } from "@mui/material";
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
        backgroundColor: "white",
        borderTop: "1px solid #e0e0e0",
        padding: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        zIndex: 1000,
      }}
    >
      <Link
        href="https://www.instagram.com/trulsrudkollen"
        target="_blank"
        rel="noopener noreferrer"
      >
        <IconButton>
          <InstagramIcon className="instagram-icon" />
        </IconButton>
      </Link>

      <Link
        href="https://www.inatur.no/tilbud/61a68c0295acd111a0c39397"
        target="_blank"
        rel="noopener noreferrer"
      >
        <IconButton>
          <img src="/inatur-logo.png" alt="Inatur" className="footer-icon" />
        </IconButton>
      </Link>
    </Box>
  );
}

export default Footer;
