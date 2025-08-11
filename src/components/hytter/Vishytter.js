import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  Container,
  Grid,
} from "@mui/material";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import text from "../Text.json";

function Vishytter() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        px: { xs: 1, sm: 2 },
        width: "100%",
        maxWidth: "100%",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: { xs: 2, sm: 3 }, // Redusert padding
          width: "100%",
          maxWidth: "100vw",
          overflow: "hidden",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            mb: { xs: 2, sm: 3 },
            textAlign: "center",
            fontSize: { xs: "1.5rem", sm: "2rem" },
            fontWeight: 700,
            background: "linear-gradient(135deg, #2d5016 0%, #4a7c59 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 2px 4px rgba(0,0,0,0.1)",
            position: "relative",
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: "-8px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "60px",
              height: "3px",
              background: "linear-gradient(90deg, #f59e0b 0%, #ea580c 100%)",
              borderRadius: "2px",
            },
          }}
        >
          Våre hytter
        </Typography>

        <Grid
          container
          spacing={{ xs: 2, sm: 3 }}
          justifyContent="center"
          sx={{ width: "100%" }}
        >
          {text.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.navn1}>
              <Card
                sx={{
                  height: "100%",
                  transition: "all 0.3s ease",
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                  border: "2px solid transparent",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 12px 30px rgba(45, 80, 22, 0.2)",
                    border: "2px solid #4a7c59",
                    background:
                      "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
                  },
                  borderRadius: 3,
                  overflow: "hidden",
                  position: "relative",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "4px",
                    background:
                      "linear-gradient(90deg, #2d5016 0%, #4a7c59 50%, #6b8e23 100%)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200" // Redusert bildehøyde
                  image={item.images[0]}
                  alt="Hytte"
                  sx={{
                    objectFit: "cover",
                  }}
                />
                <CardHeader
                  title={
                    item.navn1.charAt(0).toUpperCase() + item.navn1.slice(1)
                  }
                  titleTypographyProps={{
                    variant: "h6",
                    fontSize: { xs: "1.1rem", sm: "1.2rem" },
                    fontWeight: 600,
                  }}
                  sx={{ pb: 1 }}
                />
                <CardContent sx={{ pt: 0, pb: 2 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      fontSize: "0.875rem",
                      lineHeight: 1.5,
                      mb: 2,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {item?.description}
                  </Typography>
                  <Link
                    to={item.navn1}
                    style={{
                      fontSize: "0.875rem",
                      textDecoration: "none",
                      color: "#2d5016",
                      fontWeight: 600,
                      padding: "10px 20px",
                      border: "2px solid #4a7c59",
                      borderRadius: "25px",
                      display: "inline-block",
                      transition: "all 0.3s ease",
                      background:
                        "linear-gradient(135deg, #4a7c59 0%, #6b8e23 100%)",
                      color: "white",
                      boxShadow: "0 2px 8px rgba(45, 80, 22, 0.2)",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background =
                        "linear-gradient(135deg, #2d5016 0%, #4a7c59 100%)";
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow =
                        "0 4px 15px rgba(45, 80, 22, 0.4)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background =
                        "linear-gradient(135deg, #4a7c59 0%, #6b8e23 100%)";
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow =
                        "0 2px 8px rgba(45, 80, 22, 0.2)";
                    }}
                  >
                    Se detaljer
                  </Link>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Outlet />
      </Box>
    </Container>
  );
}

export default Vishytter;
