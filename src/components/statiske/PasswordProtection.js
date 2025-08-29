import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Container,
} from "@mui/material";
import { Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function PasswordProtection({ onPasswordCorrect }) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const navigate = useNavigate();

  // Sjekk om brukeren allerede har riktig passord (fra localStorage)
  useEffect(() => {
    const savedPassword = localStorage.getItem("hyttegjester_password");
    if (savedPassword === "3579") {
      onPasswordCorrect();
    }
  }, [onPasswordCorrect]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === "3579") {
      // Lagre passordet i localStorage
      localStorage.setItem("hyttegjester_password", "3579");
      setError("");
      onPasswordCorrect();
    } else {
      setAttempts(attempts + 1);
      setError("Feil passord. Prøv igjen.");
      setPassword("");

      if (attempts >= 2) {
        setError("For mange feil forsøk. Prøv igjen senere.");
        setTimeout(() => {
          setAttempts(0);
          setError("");
        }, 3000);
      }
    }
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 20px 20px 20px",
          background:
            "linear-gradient(135deg, rgba(248, 250, 252, 0.8) 0%, rgba(226, 232, 240, 0.6) 100%)",
        }}
      >
        <Paper
          elevation={8}
          sx={{
            padding: 4,
            borderRadius: 3,
            background: "rgba(255, 255, 255, 0.95)",
            border: "2px solid rgba(74, 124, 89, 0.2)",
            width: "100%",
            maxWidth: "400px",
          }}
        >
          <Box sx={{ textAlign: "center", marginBottom: 3 }}>
            <Lock
              sx={{
                fontSize: "3rem",
                color: "#4a7c59",
                marginBottom: 2,
              }}
            />
            <Typography
              variant="h4"
              sx={{
                color: "#2d5016",
                fontWeight: 700,
                marginBottom: 1,
              }}
            >
              Passordbeskyttet
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#4a7c59",
                lineHeight: 1.6,
              }}
            >
              Skriv inn passordet for å få tilgang til hytteinformasjon
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              type={showPassword ? "text" : "password"}
              label="Passord"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
              sx={{
                marginBottom: 2,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#4a7c59",
                  },
                  "&:hover fieldset": {
                    borderColor: "#2d5016",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#2d5016",
                  },
                },
              }}
              InputProps={{
                endAdornment: (
                  <Button
                    onClick={() => setShowPassword(!showPassword)}
                    sx={{
                      minWidth: "auto",
                      color: "#4a7c59",
                      "&:hover": {
                        color: "#2d5016",
                      },
                    }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </Button>
                ),
              }}
            />

            {error && (
              <Alert
                severity="error"
                sx={{
                  marginBottom: 2,
                  "& .MuiAlert-message": {
                    color: "#dc2626",
                  },
                }}
              >
                {error}
              </Alert>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: "#4a7c59",
                color: "white",
                fontWeight: 600,
                padding: "12px",
                fontSize: "1.1rem",
                borderRadius: 2,
                marginBottom: 2,
                "&:hover": {
                  backgroundColor: "#2d5016",
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 25px rgba(45, 80, 22, 0.3)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Gå inn
            </Button>

            <Button
              fullWidth
              variant="text"
              onClick={handleBackToHome}
              sx={{
                color: "#4a7c59",
                fontWeight: 500,
                "&:hover": {
                  color: "#2d5016",
                  backgroundColor: "rgba(74, 124, 89, 0.1)",
                },
              }}
            >
              Tilbake til hjem
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}

export default PasswordProtection;
