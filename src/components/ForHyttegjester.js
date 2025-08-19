import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Switch,
  FormControlLabel,
} from "@mui/material";
import {
  CheckCircle,
  Info,
  Phone,
  Email,
  LocationOn,
  Warning,
  Home,
  Fireplace,
  WaterDrop,
  Lightbulb,
  LocalFireDepartment as FireExtinguisher,
  LocalDining,
  OutdoorGrill,
  Storage,
} from "@mui/icons-material";
import { translations } from "./translations";

function ForHyttegjester() {
  const [language, setLanguage] = useState("no");
  const t = translations[language];

  const handleLanguageChange = () => {
    setLanguage(language === "no" ? "en" : "no");
  };

  return (
    <Box
      sx={{
        padding: { xs: 2, sm: 4 },
        maxWidth: "1200px",
        margin: "0 auto",
        paddingTop: "80px", // Plass til header
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, rgba(248, 250, 252, 0.8) 0%, rgba(226, 232, 240, 0.6) 100%)",
      }}
    >
      {/* Språkswitch */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: 2,
        }}
      >
        <FormControlLabel
          control={
            <Switch
              checked={language === "en"}
              onChange={handleLanguageChange}
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": {
                  color: "#4a7c59",
                },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: "#4a7c59",
                },
              }}
            />
          }
          label={
            <Typography
              variant="body2"
              sx={{
                color: "#4a7c59",
                fontWeight: 500,
                fontSize: "0.9rem",
              }}
            >
              {language === "no" ? "🇳🇴 Norsk" : "🇬🇧 English"}
            </Typography>
          }
          labelPlacement="start"
        />
      </Box>

      {/* Hovedtittel */}
      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
          marginBottom: 4,
          color: "#2d5016",
          fontWeight: 700,
          fontSize: { xs: "2rem", sm: "3rem" },
          textShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        {t.title}
      </Typography>

      {/* Velkommen seksjon */}
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          marginBottom: 4,
          borderRadius: 3,
          background: "rgba(255, 255, 255, 0.95)",
          border: "2px solid rgba(74, 124, 89, 0.2)",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            marginBottom: 2,
            color: "#2d5016",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Info sx={{ color: "#f59e0b" }} />
          {t.welcome.title}
        </Typography>
        <Typography
          variant="body1"
          sx={{ lineHeight: 1.8, fontSize: "1.1rem" }}
        >
          {t.welcome.description}
        </Typography>
      </Paper>

      {/* Ankomst og bruk av hytta */}
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          marginBottom: 4,
          borderRadius: 3,
          background: "rgba(255, 255, 255, 0.95)",
          border: "2px solid rgba(74, 124, 89, 0.2)",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            marginBottom: 3,
            color: "#2d5016",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Home sx={{ color: "#f59e0b" }} />
          {t.arrival.title}
        </Typography>

        {/* Ankomst */}
        <Box sx={{ marginBottom: 3 }}>
          <Typography
            variant="h6"
            sx={{
              color: "#4a7c59",
              marginBottom: 2,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <CheckCircle sx={{ color: "#4a7c59" }} />
            {t.arrival.arrivalSection.title}
          </Typography>
          <List dense>
            {t.arrival.arrivalSection.items.map((item, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  {index === 0 && <Fireplace sx={{ color: "#4a7c59" }} />}
                  {index === 1 && (
                    <FireExtinguisher sx={{ color: "#dc2626" }} />
                  )}
                  {index === 2 && <WaterDrop sx={{ color: "#4a7c59" }} />}
                  {index === 3 && <Lightbulb sx={{ color: "#4a7c59" }} />}
                </ListItemIcon>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </Box>

        <Box sx={{ textAlign: "center", marginY: 3 }}>
          <Typography
            variant="body2"
            sx={{
              color: "#4a7c59",
              textDecoration: "underline",
              cursor: "pointer",
              "&:hover": {
                color: "#2d5016",
              },
            }}
            component="a"
            href="/Infoskriv.docx"
            download
          >
            {t.arrival.download}
          </Typography>
        </Box>

        <Divider sx={{ marginY: 2 }} />

        {/* Aske */}
        <Box sx={{ marginBottom: 3 }}>
          <Typography variant="h6" sx={{ color: "#4a7c59", marginBottom: 2 }}>
            {t.arrival.ash.title}
          </Typography>
          <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
            {t.arrival.ash.description}
          </Typography>
        </Box>

        {/* Brann */}
        <Box sx={{ marginBottom: 3 }}>
          <Typography
            variant="h6"
            sx={{
              color: "#dc2626",
              marginBottom: 2,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Warning sx={{ color: "#dc2626" }} />
            {t.arrival.fire.title}
          </Typography>
          <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
            {t.arrival.fire.description}
          </Typography>
        </Box>

        {/* Do */}
        <Box sx={{ marginBottom: 3 }}>
          <Typography variant="h6" sx={{ color: "#4a7c59", marginBottom: 2 }}>
            {t.arrival.toilet.title}
          </Typography>
          <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
            {t.arrival.toilet.description}
          </Typography>
        </Box>

        {/* Førstehjelp */}
        <Box sx={{ marginBottom: 3 }}>
          <Typography
            variant="h6"
            sx={{
              color: "#dc2626",
              marginBottom: 2,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Warning sx={{ color: "#dc2626" }} />
            {t.arrival.firstAid.title}
          </Typography>
          <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
            {t.arrival.firstAid.description}
          </Typography>
        </Box>

        {/* Gass */}
        <Box sx={{ marginBottom: 3 }}>
          <Typography
            variant="h6"
            sx={{
              color: "#4a7c59",
              marginBottom: 2,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Fireplace sx={{ color: "#4a7c59" }} />
            {t.arrival.gas.title}
          </Typography>
          <Typography variant="body2" sx={{ lineHeight: 1.6, marginBottom: 1 }}>
            {t.arrival.gas.description1}
          </Typography>
          <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
            {t.arrival.gas.description2}
          </Typography>
        </Box>

        {/* Kjøleskap på gass */}
        <Box sx={{ marginBottom: 3 }}>
          <Typography variant="h6" sx={{ color: "#4a7c59", marginBottom: 2 }}>
            {t.arrival.fridge.title}
          </Typography>
          <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
            {t.arrival.fridge.description}
          </Typography>
        </Box>

        {/* Koketopp */}
        <Box sx={{ marginBottom: 3 }}>
          <Typography
            variant="h6"
            sx={{
              color: "#4a7c59",
              marginBottom: 2,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <LocalDining sx={{ color: "#4a7c59" }} />
            {t.arrival.stove.title}
          </Typography>
          <Typography variant="body2" sx={{ lineHeight: 1.6, marginBottom: 1 }}>
            {t.arrival.stove.description1}
          </Typography>
          <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
            {t.arrival.stove.description2}
          </Typography>
        </Box>

        {/* Lys - strøm */}
        <Box sx={{ marginBottom: 3 }}>
          <Typography
            variant="h6"
            sx={{
              color: "#4a7c59",
              marginBottom: 2,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Lightbulb sx={{ color: "#4a7c59" }} />
            {t.arrival.electricity.title}
          </Typography>
          <Typography variant="body2" sx={{ lineHeight: 1.6, marginBottom: 1 }}>
            {t.arrival.electricity.description1}
          </Typography>
          <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
            {t.arrival.electricity.description2}
          </Typography>
        </Box>

        {/* Lys */}
        <Box sx={{ marginBottom: 3 }}>
          <Typography variant="h6" sx={{ color: "#4a7c59", marginBottom: 2 }}>
            {t.arrival.light.title}
          </Typography>
          <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
            {t.arrival.light.description}
          </Typography>
        </Box>

        {/* Vedovn */}
        <Box sx={{ marginBottom: 3 }}>
          <Typography
            variant="h6"
            sx={{
              color: "#4a7c59",
              marginBottom: 2,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Fireplace sx={{ color: "#4a7c59" }} />
            {t.arrival.woodStove.title}
          </Typography>
          <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
            {t.arrival.woodStove.description}
          </Typography>
        </Box>

        {/* Peis */}
        <Box sx={{ marginBottom: 3 }}>
          <Typography
            variant="h6"
            sx={{
              color: "#4a7c59",
              marginBottom: 2,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Fireplace sx={{ color: "#4a7c59" }} />
            {t.arrival.fireplace.title}
          </Typography>
          <Typography variant="body2" sx={{ lineHeight: 1.6, marginBottom: 1 }}>
            {t.arrival.fireplace.description1}
          </Typography>
          <Typography variant="body2" sx={{ lineHeight: 1.6, marginBottom: 1 }}>
            {t.arrival.fireplace.description2}
          </Typography>
          <Typography variant="body2" sx={{ lineHeight: 1.6, marginBottom: 1 }}>
            {t.arrival.fireplace.description3}
          </Typography>
        </Box>

        {/* Uteplassen */}
        <Box sx={{ marginBottom: 3 }}>
          <Typography
            variant="h6"
            sx={{
              color: "#4a7c59",
              marginBottom: 2,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <OutdoorGrill sx={{ color: "#4a7c59" }} />
            {t.arrival.outdoor.title}
          </Typography>
          <Typography variant="body2" sx={{ lineHeight: 1.6, marginBottom: 1 }}>
            {t.arrival.outdoor.description1}
          </Typography>
          <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
            {t.arrival.outdoor.description2}
          </Typography>
        </Box>

        {/* Uthus */}
        <Box sx={{ marginBottom: 3 }}>
          <Typography
            variant="h6"
            sx={{
              color: "#4a7c59",
              marginBottom: 2,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Storage sx={{ color: "#4a7c59" }} />
            {t.arrival.shed.title}
          </Typography>
          <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
            {t.arrival.shed.description}
          </Typography>
        </Box>

        {/* Vann */}
        <Box sx={{ marginBottom: 3 }}>
          <Typography
            variant="h6"
            sx={{
              color: "#4a7c59",
              marginBottom: 2,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <WaterDrop sx={{ color: "#4a7c59" }} />
            {t.arrival.water.title}
          </Typography>
          <Typography variant="body2" sx={{ lineHeight: 1.6, marginBottom: 1 }}>
            {t.arrival.water.description1}
          </Typography>
          <Typography variant="body2" sx={{ lineHeight: 1.6, marginBottom: 1 }}>
            {t.arrival.water.description2}
          </Typography>
          <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
            {t.arrival.water.description3}
          </Typography>
        </Box>

        {/* Ved */}
        <Box sx={{ marginBottom: 3 }}>
          <Typography
            variant="h6"
            sx={{
              color: "#4a7c59",
              marginBottom: 2,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Fireplace sx={{ color: "#4a7c59" }} />
            {t.arrival.wood.title}
          </Typography>
          <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
            {t.arrival.wood.description}
          </Typography>
        </Box>
      </Paper>

      {/* Kontaktinformasjon */}
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          marginBottom: 4,
          borderRadius: 3,
          background: "rgba(255, 255, 255, 0.95)",
          border: "2px solid rgba(74, 124, 89, 0.2)",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            marginBottom: 3,
            color: "#2d5016",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Phone sx={{ color: "#f59e0b" }} />
          {t.contact.title}
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 3,
          }}
        >
          <Box>
            <Typography variant="h6" sx={{ color: "#4a7c59", marginBottom: 2 }}>
              {t.contact.duringStay.title}
            </Typography>
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <Phone sx={{ color: "#4a7c59" }} />
                </ListItemIcon>
                <ListItemText
                  primary={t.contact.duringStay.phone.primary}
                  secondary={t.contact.duringStay.phone.secondary}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Email sx={{ color: "#4a7c59" }} />
                </ListItemIcon>
                <ListItemText
                  primary={t.contact.duringStay.email.primary}
                  secondary={t.contact.duringStay.email.secondary}
                />
              </ListItem>
            </List>
          </Box>

          <Box>
            <Typography variant="h6" sx={{ color: "#4a7c59", marginBottom: 2 }}>
              {t.contact.emergency.title}
            </Typography>
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <Info sx={{ color: "#dc2626" }} />
                </ListItemIcon>
                <ListItemText
                  primary={t.contact.emergency.emergency.primary}
                  secondary={t.contact.emergency.emergency.secondary}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <LocationOn sx={{ color: "#4a7c59" }} />
                </ListItemIcon>
                <ListItemText
                  primary={t.contact.emergency.hospital.primary}
                  secondary={t.contact.emergency.hospital.secondary}
                />
              </ListItem>
            </List>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default ForHyttegjester;
