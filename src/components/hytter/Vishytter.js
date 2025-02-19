import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import text from "../Text.json";

function Vishytter() {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, p: 2 }}>
      {text.map((item) => (
        <div key={item.navn1}>
          <Card sx={{ width: 345 }}>
            <CardHeader
              title={item.navn1}
              subheader={<Link to={item.navn1}>Les mer og booking</Link>}
            />
            <CardMedia
              component="img"
              height="194"
              image="/truls/Truls_Bilde1.jpg"
              alt="Hytte"
            />
            <CardContent>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {item?.description}
              </Typography>
            </CardContent>
          </Card>
          <Outlet />
        </div>
      ))}
    </Box>
  );
}

export default Vishytter;
