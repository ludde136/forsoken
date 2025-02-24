import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  Container,
} from "@mui/material";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import text from "../Text.json";

function Vishytter() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 4,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            mb: 4,
            textAlign: "center",
            fontSize: { xs: "1.8rem", sm: "2.2rem" }, // Responsiv tekststørrelse
          }}
        >
          Velkommen til hjemmeside!
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: { xs: 2, sm: 4 }, // Mindre gap på mobil
            justifyContent: "center",
          }}
        >
          {text.map((item) => (
            <Card
              key={item.navn1}
              sx={{
                width: { xs: "100%", sm: "450px", md: "500px" }, // Responsiv bredde
                height: "100%",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.02)",
                },
              }}
            >
              <CardHeader
                title={item.navn1.charAt(0).toUpperCase() + item.navn1.slice(1)}
                titleTypography={{ fontSize: { xs: "1.4rem", sm: "1.6rem" } }}
                subheader={
                  <Link
                    to={item.navn1}
                    style={{
                      fontSize: "1.1rem",
                      textDecoration: "underline",
                      color: "#1976d2",
                      fontWeight: "bold",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Les mer og reservere
                  </Link>
                }
              />
              <CardMedia
                component="img"
                height={{ xs: "200", sm: "300" }} // Høyere bilde på desktop
                image={item.images[0]}
                alt="Hytte"
                sx={{
                  objectFit: "cover",
                }}
              />
              <CardContent>
                <Typography
                  variant="body1"
                  sx={{
                    color: "text.secondary",
                    fontSize: { xs: "1rem", sm: "1.1rem" }, // Større tekst
                    lineHeight: 1.6,
                  }}
                >
                  {item?.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
        <Outlet />
      </Box>
    </Container>
  );
}

export default Vishytter;
