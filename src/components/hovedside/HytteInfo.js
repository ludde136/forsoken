import React, { useState, useMemo, useEffect } from "react";
import text from "../Text.json";
import Calender from "./Calender";
import { IconButton, Typography, Box, Modal } from "@mui/material";
import { CardMedia } from "@mui/material";
import {
  ArrowBackIos,
  ArrowForwardIos,
  CheckCircleOutline,
  Close,
} from "@mui/icons-material";

function HytteInfo() {
  const [index, setIndex] = useState(5); // Start med sjette bilde som sannsynligvis er et hyttebilde
  const [openModal, setOpenModal] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);

  // Hent hytte fra text.json (nå et direkte objekt)
  const hytte = text;

  // Memoize images for performance
  const images = useMemo(() => hytte?.images || [], [hytte]);

  // Debug: Log bildene for å se hva som skjer
  console.log("Hytte:", hytte);
  console.log("Images:", images);
  console.log("Current index:", index);
  console.log("Current image:", images[index]);

  // Lyt til custom event for å tilbakestille bildet til det første
  useEffect(() => {
    const handleResetImage = () => {
      setIndex(0);
    };

    window.addEventListener("resetImageToFirst", handleResetImage);

    // Cleanup
    return () => {
      window.removeEventListener("resetImageToFirst", handleResetImage);
    };
  }, []);

  const handleNext = () => setIndex((prev) => (prev + 1) % images.length);
  const handlePrev = () =>
    setIndex((prev) => (prev - 1 + images.length) % images.length);

  // Touch-støtte for mobil
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handlePrev(); // Swipe til venstre = gå til forrige bilde
    }
    if (isRightSwipe) {
      handleNext(); // Swipe til høyre = gå til neste bilde
    }
  };

  // Sjekk om hytten eksisterer
  if (!hytte) {
    return (
      <Box sx={{ textAlign: "center", padding: 4 }}>
        <Typography variant="h4" color="error">
          Hytte ikke funnet
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      className="animate-fade-in"
      sx={{
        padding: { xs: 2, sm: 4 },
        maxWidth: "100%",
        overflow: "hidden",
        background:
          "linear-gradient(135deg, rgba(248, 250, 252, 0.8) 0%, rgba(226, 232, 240, 0.6) 100%)",
        minHeight: "100vh",
      }}
    >
      {/* Første seksjon med to kolonner */}
      <Box
        className="modern-grid"
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: { xs: 3, md: 5 },
          marginBottom: { xs: 3, md: 5 },
        }}
      >
        {/* Venstre kolonne */}
        <Box
          className="animate-slide-left"
          sx={{
            width: "100%",
            overflow: "hidden",
            animationDelay: "0.2s",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
              width: "100%",
            }}
          >
            <div
              className="glass-card"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                padding: "20px",
                borderRadius: "20px",
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(74, 124, 89, 0.2)",
                boxShadow: "0 8px 32px rgba(45, 80, 22, 0.12)",
              }}
            >
              <div
                style={{
                  position: "relative",
                  display: "inline-block",
                }}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                <CardMedia
                  component="img"
                  src={images[index]}
                  alt="Slide"
                  loading="lazy"
                  onLoad={() => setIsImageLoading(false)}
                  style={{
                    width: "100%",
                    maxWidth: 350,
                    height: "auto",
                    maxHeight: 250,
                    objectFit: "cover",
                    filter: isImageLoading ? "blur(10px)" : "none",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    userSelect: "none",
                    WebkitUserSelect: "none",
                    MozUserSelect: "none",
                    borderRadius: "16px",
                    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
                    touchAction: "none",
                  }}
                  className="hover-lift"
                />

                {/* Venstre klikkbar side for forrige bilde */}
                <div
                  onClick={handlePrev}
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: "33%",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "transparent",
                    transition: "background-color 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "rgba(74, 124, 89, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent";
                  }}
                >
                  <ArrowBackIos
                    style={{
                      color: "rgba(0, 0, 0, 0.7)",
                      fontSize: "2rem",
                      filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
                      transition: "all 0.2s ease",
                    }}
                  />
                </div>

                {/* Midten - klikkbar for fullskjerm */}
                <div
                  onClick={() => setOpenModal(true)}
                  style={{
                    position: "absolute",
                    left: "33%",
                    top: 0,
                    bottom: 0,
                    width: "34%",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "transparent",
                    transition: "background-color 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "rgba(74, 124, 89, 0.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent";
                  }}
                />

                {/* Høyre klikkbar side for neste bilde */}
                <div
                  onClick={handleNext}
                  style={{
                    position: "absolute",
                    right: 0,
                    top: 0,
                    bottom: 0,
                    width: "33%",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "transparent",
                    transition: "background-color 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "rgba(74, 124, 89, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent";
                  }}
                >
                  <ArrowForwardIos
                    style={{
                      color: "rgba(0, 0, 0, 0.7)",
                      fontSize: "2rem",
                      filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
                      transition: "all 0.2s ease",
                    }}
                  />
                </div>
              </div>
            </div>
            <Box className="glass-card" sx={{ width: "100%" }}>
              <Calender sted="trulsrudkollen" />
            </Box>
          </div>
        </Box>

        {/* Modal for fullskjerm bildevisning */}
        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
          className="modal-container"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="modal-backdrop"
            onClick={() => setOpenModal(false)}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div
              className="modal-content"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              onClick={(e) => e.stopPropagation()}
            >
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenModal(false);
                }}
                className="modal-close-button"
                sx={{
                  background: "rgba(0, 0, 0, 0.7)",
                  color: "white",
                  "&:hover": {
                    background: "rgba(0, 0, 0, 0.9)",
                    transform: "scale(1.1)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <Close />
              </IconButton>
              <div
                className="modal-navigation"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                onClick={(e) => e.stopPropagation()}
              >
                <CardMedia
                  component="img"
                  src={images[index]}
                  alt="Fullscreen"
                  className="modal-image"
                  onTouchStart={onTouchStart}
                  onTouchMove={onTouchMove}
                  onTouchEnd={onTouchEnd}
                  onClick={(e) => e.stopPropagation()}
                  style={{ touchAction: "none" }}
                />
                <div
                  className="navigation-overlay left"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                >
                  <IconButton className="modal-nav-button">
                    <ArrowBackIos />
                  </IconButton>
                </div>
                <div
                  className="navigation-overlay right"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                >
                  <IconButton className="modal-nav-button">
                    <ArrowForwardIos />
                  </IconButton>
                </div>
              </div>
            </div>
          </div>
        </Modal>

        {/* Høyre kolonne */}
        <Box
          className="animate-slide-right"
          sx={{
            width: "100%",
            animationDelay: "0.4s",
          }}
        >
          <Box
            className="glass-card"
            sx={{ padding: "24px", marginBottom: "24px" }}
          >
            <Typography
              variant="h4"
              className="modern-title"
              sx={{
                marginBottom: 3,
                textAlign: { xs: "center", md: "left" },
                fontSize: { xs: "1.5rem", sm: "2rem" },
                fontWeight: 700,
                background: "linear-gradient(135deg, #2d5016 0%, #4a7c59 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: "-8px",
                  left: { xs: "50%", md: "0" },
                  transform: { xs: "translateX(-50%)", md: "none" },
                  width: "80px",
                  height: "3px",
                  background:
                    "linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)",
                  borderRadius: "2px",
                },
              }}
            >
              {hytte.title}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                textAlign: { xs: "center", md: "left" },
                color: "text.secondary",
                lineHeight: 1.8,
                marginBottom: 3,
                fontSize: "1.1rem",
                fontWeight: 500,
              }}
            >
              {hytte.description}
            </Typography>
          </Box>

          {/* Ny seksjon for detaljer */}
          <Box
            className="glass-card"
            sx={{
              padding: "24px",
              marginBottom: "24px",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                marginBottom: 2,
                color: "#2d5016",
                fontWeight: 600,
                fontSize: "1.2rem",
              }}
            >
              Hytteinformasjon
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                gap: 2,
                marginBottom: 2,
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight="600"
              >
                Størrelse:
              </Typography>
              <Typography variant="body2" fontWeight="500">
                {hytte.size}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight="600"
              >
                Antall soverom:
              </Typography>
              <Typography variant="body2" fontWeight="500">
                {hytte["Antall soverom"]}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight="600"
              >
                Areal:
              </Typography>
              <Typography variant="body2" fontWeight="500">
                {hytte.Areal}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight="600"
              >
                Ankomst:
              </Typography>
              <Typography variant="body2" fontWeight="500">
                {hytte.Ankomst}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight="600"
              >
                Avreise:
              </Typography>
              <Typography variant="body2" fontWeight="500">
                {hytte.Avreise}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight="600"
              >
                Adresse:
              </Typography>
              <Typography variant="body2" fontWeight="500">
                {hytte.Adresse}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight="600"
              >
                Poststed:
              </Typography>
              <Typography variant="body2" fontWeight="500">
                {hytte.Poststed}
              </Typography>
            </Box>
          </Box>

          {/* Kontaktinformasjon seksjon */}
          <Box
            className="glass-card"
            sx={{
              padding: "24px",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                marginBottom: 3,
                textAlign: { xs: "center", md: "left" },
                color: "#2d5016",
                fontWeight: 600,
                fontSize: "1.2rem",
              }}
            >
              Kontakt utleier
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                gap: 2,
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight="600"
              >
                Navn:
              </Typography>
              <Typography variant="body2" fontWeight="500">
                {hytte.Navn}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight="600"
              >
                Telefon:
              </Typography>
              <Typography variant="body2" fontWeight="500">
                {hytte.Telefon}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight="600"
              >
                E-post:
              </Typography>
              <Typography variant="body2" fontWeight="500">
                {hytte["E-post"]}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Fasiliteter-seksjon */}
      <Box className="glass-card" sx={{ padding: "32px", margin: "32px 0" }}>
        <Typography
          variant="h5"
          className="modern-title"
          sx={{
            mb: 4,
            textAlign: "center",
            fontSize: "1.8rem",
          }}
        >
          Fasiliteter og informasjon
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: 4,
          }}
        >
          {/* Kolonne 1 */}
          <Box>
            <FacilityItem
              title="Oppvarming"
              value={hytte["Utstyr og fasiliteter"].Oppvarming}
            />
            <FacilityItem
              title="Strøm/Solcelle"
              value={hytte["Utstyr og fasiliteter"]["Strøm/Solcelle"]}
            />
            <FacilityItem
              title="Mobildekning"
              value={hytte["Utstyr og fasiliteter"].Mobildekning}
            />
            <FacilityItem
              title="WiFi"
              value={hytte["Utstyr og fasiliteter"].WiFi}
            />
            <FacilityItem
              title="Parkering"
              value={hytte["Utstyr og fasiliteter"].Parkering}
            />
            <FacilityItem
              title="Elbillader"
              value={hytte["Utstyr og fasiliteter"].Elbillader}
            />
            <FacilityItem
              title="Innlagt vann"
              value={hytte["Utstyr og fasiliteter"]["Innlagt vann"]}
            />
          </Box>

          {/* Kolonne 2 */}
          <Box>
            <FacilityItem
              title="Utedo"
              value={hytte["Utstyr og fasiliteter"].Utedo}
            />
            <FacilityItem
              title="Toalett inne"
              value={hytte["Utstyr og fasiliteter"]["Toalett inne"]}
            />
            <FacilityItem
              title="Dusj"
              value={hytte["Utstyr og fasiliteter"].Dusj}
            />
            <FacilityItem
              title="Kokemuligheter"
              value={hytte["Utstyr og fasiliteter"].Kokemuligheter}
            />
            <FacilityItem
              title="Stekeovn"
              value={hytte["Utstyr og fasiliteter"].Stekeovn}
            />
            <FacilityItem
              title="Kjøleskap"
              value={hytte["Utstyr og fasiliteter"].Kjøleskap}
            />
            <FacilityItem
              title="Fryser"
              value={hytte["Utstyr og fasiliteter"].Fryser}
            />
          </Box>

          {/* Kolonne 3 */}
          <Box>
            <FacilityItem
              title="Dyner/puter"
              value={hytte["Utstyr og fasiliteter"]["Dyner/puter"]}
            />
            <FacilityItem
              title="Sengetøy"
              value={hytte["Utstyr og fasiliteter"].Sengetøy}
            />
            <FacilityItem
              title="Kjøkkenutstyr"
              value={hytte["Utstyr og fasiliteter"].Kjøkkenutstyr}
            />
            <FacilityItem
              title="Båt tilgjengelig"
              value={hytte["Utstyr og fasiliteter"]["Båt tilgjengelig"]}
            />
            <FacilityItem
              title="Handikaptilpasset"
              value={hytte["Utstyr og fasiliteter"].Handikaptilpasset}
            />
            <FacilityItem
              title="Tilgjengelig med buss eller tog"
              value={
                hytte["Utstyr og fasiliteter"][
                  "Tilgjengelig med buss eller tog"
                ]
              }
            />
            <FacilityItem
              title="Husdyr tillatt"
              value={hytte["Utstyr og fasiliteter"]["Husdyr tillatt"]}
            />
          </Box>
        </Box>
      </Box>

      {/* Om hytta-seksjon */}
      <Box className="glass-card" sx={{ padding: "32px", margin: "32px 0" }}>
        <Typography
          variant="h5"
          className="modern-title"
          sx={{
            mb: 3,
            textAlign: "center",
            fontSize: "1.8rem",
          }}
        >
          Om hytta
        </Typography>
        <Typography
          variant="body1"
          paragraph
          sx={{ lineHeight: 1.8, fontSize: "1.1rem" }}
        >
          {hytte["Om hytta"]}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            mb: 3,
            mt: 4,
            color: "#2d5016",
            fontWeight: 600,
            fontSize: "1.3rem",
          }}
        >
          Detaljert informasjon
        </Typography>
        <Typography
          variant="body1"
          paragraph
          sx={{ lineHeight: 1.8, fontSize: "1.1rem" }}
        >
          {hytte["info"]}
        </Typography>
      </Box>

      {/* Hytteregler-seksjon */}
      <Box className="glass-card" sx={{ padding: "32px", margin: "32px 0" }}>
        <Typography
          variant="h5"
          className="modern-title"
          sx={{
            mb: 4,
            textAlign: "center",
            fontSize: "1.8rem",
          }}
        >
          Hytteregler
        </Typography>
        <Box>
          {hytte.Hytteregler.split(". ").map((rule, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "flex-start",
                mb: 2,
                padding: "12px",
                background: "rgba(74, 124, 89, 0.05)",
                borderRadius: "12px",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: "rgba(74, 124, 89, 0.1)",
                  transform: "translateX(8px)",
                },
              }}
            >
              <CheckCircleOutline
                sx={{
                  mr: 2,
                  color: "success.main",
                  fontSize: 24,
                  flexShrink: 0,
                }}
              />
              <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                {rule.trim()}.
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Avbestillingsregler-seksjon */}
      <Box className="glass-card" sx={{ padding: "32px", margin: "32px 0" }}>
        <Typography
          variant="h5"
          className="modern-title"
          sx={{
            mb: 4,
            textAlign: "center",
            fontSize: "1.8rem",
          }}
        >
          Avbestillingsregler
        </Typography>
        <Box>
          {hytte.Avbestillingsregler.split(". ").map((rule, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "flex-start",
                mb: 2,
                padding: "12px",
                background: "rgba(245, 158, 11, 0.05)",
                borderRadius: "12px",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: "rgba(245, 158, 11, 0.1)",
                  transform: "translateX(8px)",
                },
              }}
            >
              <CheckCircleOutline
                sx={{
                  mr: 2,
                  color: "#f59e0b",
                  fontSize: 24,
                  flexShrink: 0,
                }}
              />
              <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                {rule.trim()}.
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Anneks-seksjon */}
      <Box className="glass-card" sx={{ padding: "32px", margin: "32px 0" }}>
        <Typography
          variant="h5"
          className="modern-title"
          sx={{
            mb: 3,
            textAlign: "center",
            fontSize: "1.8rem",
          }}
        >
          Anneks
        </Typography>
        <Typography
          variant="body1"
          paragraph
          sx={{ lineHeight: 1.8, fontSize: "1.1rem" }}
        >
          {hytte["Anneks"]}
        </Typography>
      </Box>

      {/* Utstyr-seksjon */}
      <Box className="glass-card" sx={{ padding: "32px", margin: "32px 0" }}>
        <Typography
          variant="h5"
          className="modern-title"
          sx={{
            mb: 3,
            textAlign: "center",
            fontSize: "1.8rem",
          }}
        >
          Utstyr
        </Typography>
        <Typography
          variant="body1"
          paragraph
          sx={{ lineHeight: 1.8, fontSize: "1.1rem" }}
        >
          {hytte["utstyr"]}
        </Typography>
      </Box>

      {/* Vann-seksjon */}
      <Box className="glass-card" sx={{ padding: "32px", margin: "32px 0" }}>
        <Typography
          variant="h5"
          className="modern-title"
          sx={{
            mb: 3,
            textAlign: "center",
            fontSize: "1.8rem",
          }}
        >
          Vann
        </Typography>
        <Typography
          variant="body1"
          paragraph
          sx={{ lineHeight: 1.8, fontSize: "1.1rem" }}
        >
          {hytte["vann"]}
        </Typography>
      </Box>

      {/* Solcellestrøm-seksjon */}
      <Box className="glass-card" sx={{ padding: "32px", margin: "32px 0" }}>
        <Typography
          variant="h5"
          className="modern-title"
          sx={{
            mb: 3,
            textAlign: "center",
            fontSize: "1.8rem",
          }}
        >
          Solcellestrøm
        </Typography>
        <Typography
          variant="body1"
          paragraph
          sx={{ lineHeight: 1.8, fontSize: "1.1rem" }}
        >
          {hytte["Solcellestrøm"]}
        </Typography>
      </Box>

      {/* Nøkkelhenting-seksjon */}
      <Box className="glass-card" sx={{ padding: "32px", margin: "32px 0" }}>
        <Typography
          variant="h5"
          className="modern-title"
          sx={{
            mb: 3,
            textAlign: "center",
            fontSize: "1.8rem",
          }}
        >
          Nøkkelhenting
        </Typography>
        <Typography
          variant="body1"
          paragraph
          sx={{ lineHeight: 1.8, fontSize: "1.1rem" }}
        >
          {hytte["Nøkkelhenting"]}
        </Typography>
      </Box>

      {/* Turtips-seksjon */}
      <Box className="glass-card" sx={{ padding: "32px", margin: "32px 0" }}>
        <Typography
          variant="h5"
          className="modern-title"
          sx={{
            mb: 4,
            textAlign: "center",
            fontSize: "1.8rem",
          }}
        >
          Turtips og adkomst
        </Typography>
        <Box>
          <Box
            sx={{
              mb: 3,
              padding: "16px",
              background: "rgba(74, 124, 89, 0.05)",
              borderRadius: "12px",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ mb: 1, fontWeight: "bold", color: "#2d5016" }}
            >
              Korteste vei:
            </Typography>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.6 }}>
              {hytte["Korteste vei"]}
            </Typography>
          </Box>

          <Box
            sx={{
              mb: 3,
              padding: "16px",
              background: "rgba(74, 124, 89, 0.05)",
              borderRadius: "12px",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ mb: 1, fontWeight: "bold", color: "#2d5016" }}
            >
              Adkomst sommer:
            </Typography>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.6 }}>
              {hytte["Adkomst sommer"]}
            </Typography>
          </Box>

          <Box
            sx={{
              mb: 3,
              padding: "16px",
              background: "rgba(74, 124, 89, 0.05)",
              borderRadius: "12px",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ mb: 1, fontWeight: "bold", color: "#2d5016" }}
            >
              Adkomst vinter:
            </Typography>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.6 }}>
              {hytte["Adkomst vinter"]}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Historie-seksjon */}
      <Box className="glass-card" sx={{ padding: "32px", margin: "32px 0" }}>
        <Typography
          variant="h5"
          className="modern-title"
          sx={{
            mb: 3,
            textAlign: "center",
            fontSize: "1.8rem",
          }}
        >
          Historien
        </Typography>
        <Typography
          variant="body1"
          paragraph
          sx={{ lineHeight: 1.8, fontSize: "1.1rem" }}
        >
          {hytte["Historien"]}
        </Typography>
      </Box>
    </Box>
  );
}

// Hjelpefunksjon for å vise hver fasilitet
const FacilityItem = ({ title, value }) => (
  <Box
    sx={{
      padding: "12px",
      marginBottom: "8px",
      background: "rgba(74, 124, 89, 0.05)",
      borderRadius: "12px",
      transition: "all 0.3s ease",
      "&:hover": {
        background: "rgba(74, 124, 89, 0.1)",
        transform: "translateX(4px)",
      },
    }}
  >
    <Typography
      variant="body2"
      color="text.secondary"
      fontWeight="bold"
      sx={{ mb: 0.5 }}
    >
      {title}
    </Typography>
    <Typography variant="body2" fontWeight="500">
      {value}
    </Typography>
  </Box>
);

export default HytteInfo;
