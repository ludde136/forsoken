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
          py: 4, // Padding top og bottom
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            mb: 4, // Margin bottom
            textAlign: "center",
          }}
        >
          Velkommen til hjemmeside!
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 4,
            justifyContent: "center",
          }}
        >
          {text.map((item) => (
            <Card
              key={item.navn1}
              sx={{
                width: 345,
                height: "100%",
              }}
            >
              <CardHeader
                title={item.navn1.charAt(0).toUpperCase() + item.navn1.slice(1)}
                subheader={<Link to={item.navn1}>Les mer og reservere</Link>}
              />
              <CardMedia
                component="img"
                height="194"
                image={item.images[0]}
                alt="Hytte"
              />
              <CardContent>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
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
