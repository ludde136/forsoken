import { Box } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/statiske/Header";
import HytteInfo from "./components/hovedside/HytteInfo";
import ForHyttegjester from "./components/Infoside/ForHyttegjester";
import Footer from "./components/statiske/Footer";
import "./App.css";

function App() {
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
            <Route path="/for-hyttegjester" element={<ForHyttegjester />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </Router>
  );
}

export default App;
