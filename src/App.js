import { Box } from "@mui/material";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import HytteInfo from "./components/hytter/HytteInfo";
import Footer from "./components/Footer";
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
            paddingBottom: "70px", // Padding for footer
            paddingTop: "64px", // Padding for header (standard AppBar height)
          }}
        >
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/trulsrudkollen" replace />}
            />
            <Route path="/:sted" element={<HytteInfo />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </Router>
  );
}

export default App;
