import React from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

function Header() {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "white",
        boxShadow: 1,
      }}
    >
      <Toolbar>
        <Button
          component={Link}
          to="/"
          startIcon={<HomeIcon />}
          variant="contained"
          sx={{
            margin: "auto",
            backgroundColor: "#2e7d32", // MUI's green[800]
            "&:hover": {
              backgroundColor: "#1b5e20", // MUI's green[900]
            },
            textTransform: "none", // Fjerner store bokstaver
            borderRadius: 2,
            px: 3, // Padding på sidene
            py: 1, // Padding topp og bunn
          }}
        >
          Hjem
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
