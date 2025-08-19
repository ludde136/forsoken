import { Box } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import HytteInfo from "./components/hytter/HytteInfo";
import ForHyttegjester from "./components/ForHyttegjester";
import PasswordProtection from "./components/PasswordProtection";
import Footer from "./components/Footer";
import Ikkefunnet from "./components/hytter/ikkefunnet";
import "./App.css";

function App() {
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);

  // Sjekk om brukeren allerede har riktig passord ved oppstart
  useEffect(() => {
    const savedPassword = localStorage.getItem("hyttegjester_password");
    if (savedPassword === "3579") {
      setIsPasswordCorrect(true);
    }
  }, []);

  const handlePasswordCorrect = () => {
    setIsPasswordCorrect(true);
  };

  return (
    <Router>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header />
        <Box
          sx={{
            flex: 1,
            paddingBottom: "50px",
            paddingTop: "56px",
          }}
        >
          <Routes>
            <Route path="/" element={<HytteInfo />} />
            <Route
              path="/for-hyttegjester"
              element={
                isPasswordCorrect ? (
                  <ForHyttegjester />
                ) : (
                  <PasswordProtection
                    onPasswordCorrect={handlePasswordCorrect}
                  />
                )
              }
            />
            <Route path="*" element={<Ikkefunnet />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </Router>
  );
}

export default App;
