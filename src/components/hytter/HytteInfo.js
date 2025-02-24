import React from "react";
import { useParams } from "react-router-dom";
import Ikkefunnet from "../ikkefunnet";
import text from "../Text.json";
import Calender from "./Calender";
import { IconButton, Typography, Box, Divider, Modal } from "@mui/material";
import {
  ArrowBackIos,
  ArrowForwardIos,
  CheckCircleOutline,
  Close,
} from "@mui/icons-material";
import { useState } from "react";

function HytteInfo() {
  const [index, setIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const { sted } = useParams();

  // Finn riktig hytte fra text.json
  const hytte = text.find((item) => item.navn1.toLowerCase() === sted);
  const images = hytte?.images || [];

  const handleNext = () => setIndex((prev) => (prev + 1) % images.length);
  const handlePrev = () =>
    setIndex((prev) => (prev - 1 + images.length) % images.length);

  const gyldigeHytter = text.map((item) => item.navn1.toLowerCase());

  if (!gyldigeHytter.includes(sted)) {
    return <Ikkefunnet />;
  }

  // Legg til sjekk for hytte
  if (!hytte) {
    return <Ikkefunnet />;
  }

  return (
    <Box sx={{ padding: 3 }}>
      {/* Første seksjon med to kolonner */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 4,
          marginBottom: 4,
        }}
      >
        {/* Venstre kolonne */}
        <Box>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
              }}
            >
              <IconButton onClick={handlePrev}>
                <ArrowBackIos />
              </IconButton>
              <img
                src={images[index]}
                alt="Slide"
                style={{
                  width: 300,
                  height: 200,
                  objectFit: "cover",
                  cursor: "pointer",
                }}
                onClick={() => setOpenModal(true)}
              />
              <IconButton onClick={handleNext}>
                <ArrowForwardIos />
              </IconButton>
            </div>
            <Calender sted={sted} />
          </div>
        </Box>

        {/* Modal for fullskjerm bildevisning */}
        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
          className="modal-container"
        >
          <div className="modal-content">
            <IconButton
              onClick={() => setOpenModal(false)}
              className="modal-close-button"
            >
              <Close />
            </IconButton>
            <div className="modal-navigation">
              <img
                src={images[index]}
                alt="Fullscreen"
                className="modal-image"
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
        </Modal>

        {/* Høyre kolonne */}
        <Box>
          <Typography
            variant="h5"
            sx={{
              marginBottom: 2,
              textAlign: { xs: "center", md: "left" },
            }}
          >
            {hytte.title}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: { xs: "center", md: "left" },
              color: "text.secondary",
              lineHeight: 1.6,
              marginBottom: 3,
            }}
          >
            {hytte.description}
          </Typography>

          {/* Ny seksjon for detaljer */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              gap: 2,
              marginBottom: 3,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Størrelse:
            </Typography>
            <Typography variant="body2">{hytte.size}</Typography>

            <Typography variant="body2" color="text.secondary">
              Antall soverom:
            </Typography>
            <Typography variant="body2">{hytte["Antall soverom"]}</Typography>

            <Typography variant="body2" color="text.secondary">
              Areal:
            </Typography>
            <Typography variant="body2">{hytte.Areal}</Typography>

            <Typography variant="body2" color="text.secondary">
              Ankomst:
            </Typography>
            <Typography variant="body2">{hytte.Ankomst}</Typography>

            <Typography variant="body2" color="text.secondary">
              Avreise:
            </Typography>
            <Typography variant="body2">{hytte.Avreise}</Typography>

            <Typography variant="body2" color="text.secondary">
              Adresse:
            </Typography>
            <Typography variant="body2">{hytte.Adresse}</Typography>

            <Typography variant="body2" color="text.secondary">
              Poststed:
            </Typography>
            <Typography variant="body2">{hytte.Poststed}</Typography>
          </Box>

          {/* Kontaktinformasjon seksjon */}
          <Typography
            variant="h6"
            sx={{
              marginTop: 3,
              marginBottom: 2,
              textAlign: { xs: "center", md: "left" },
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
            <Typography variant="body2" color="text.secondary">
              Navn:
            </Typography>
            <Typography variant="body2">{hytte.Navn}</Typography>

            <Typography variant="body2" color="text.secondary">
              Telefon:
            </Typography>
            <Typography variant="body2">{hytte.Telefon}</Typography>

            <Typography variant="body2" color="text.secondary">
              E-post:
            </Typography>
            <Typography variant="body2">{hytte["E-post"]}</Typography>
          </Box>
        </Box>
      </Box>

      {/* Fasiliteter-seksjon */}
      <Divider sx={{ my: 4 }} />
      <Typography variant="h6" sx={{ mb: 2 }}>
        Fasiliteter og informasjon
      </Typography>
      <Box
        sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 3 }}
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
              hytte["Utstyr og fasiliteter"]["Tilgjengelig med buss eller tog"]
            }
          />
          <FacilityItem
            title="Husdyr tillatt"
            value={hytte["Utstyr og fasiliteter"]["Husdyr tillatt"]}
          />
        </Box>
      </Box>

      {/* Om hytta-seksjon */}
      <Divider sx={{ my: 4 }} />
      <Typography variant="h6" sx={{ mb: 2 }}>
        Om hytta
      </Typography>
      <Typography variant="body1" paragraph>
        {hytte["Om hytta"]}
      </Typography>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Detaljert informasjon
      </Typography>
      <Typography variant="body1" paragraph>
        {hytte["info"]}
      </Typography>
      {/* Hytteregler-seksjon */}
      <Divider sx={{ my: 4 }} />
      <Box sx={{ pl: 0 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Hytteregler
        </Typography>
        <Box>
          {hytte.Hytteregler.split(". ").map((rule, index) => (
            <Box
              key={index}
              sx={{ display: "flex", alignItems: "flex-start", mb: 1 }}
            >
              <CheckCircleOutline
                sx={{ mr: 1, color: "success.main", fontSize: 20 }}
              />
              <Typography variant="body1">{rule.trim()}.</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Avbestillingsregler-seksjon */}
      <Divider sx={{ my: 4 }} />
      <Box sx={{ pl: 0 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Avbestillingsregler
        </Typography>
        <Box>
          {hytte.Avbestillingsregler.split(". ").map((rule, index) => (
            <Box
              key={index}
              sx={{ display: "flex", alignItems: "flex-start", mb: 1 }}
            >
              <CheckCircleOutline
                sx={{ mr: 1, color: "success.main", fontSize: 20 }}
              />
              <Typography variant="body1">{rule.trim()}.</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Anneks-seksjon */}
      <Divider sx={{ my: 4 }} />
      <Typography variant="h6" sx={{ mb: 2 }}>
        Anneks
      </Typography>
      <Typography variant="body1" paragraph>
        {hytte["Anneks"]}
      </Typography>

      {/* Vann-seksjon */}
      <Divider sx={{ my: 4 }} />
      <Typography variant="h6" sx={{ mb: 2 }}>
        Vann
      </Typography>
      <Typography variant="body1" paragraph>
        {hytte["vann"]}
      </Typography>

      {/* Solcellestrøm-seksjon */}
      <Divider sx={{ my: 4 }} />
      <Typography variant="h6" sx={{ mb: 2 }}>
        Solcellestrøm
      </Typography>
      <Typography variant="body1" paragraph>
        {hytte["Solcellestrøm"]}
      </Typography>

      {/* Nøkkelhenting-seksjon */}
      <Divider sx={{ my: 4 }} />
      <Typography variant="h6" sx={{ mb: 2 }}>
        Nøkkelhenting
      </Typography>
      <Typography variant="body1" paragraph>
        {hytte["Nøkkelhenting"]}
      </Typography>

      {/* Turtips-seksjon */}
      <Divider sx={{ my: 4 }} />
      <Box sx={{ pl: 0 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Turtips og adkomst
        </Typography>
        <Box>
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
            Korteste vei:
          </Typography>
          <Typography variant="body1" paragraph>
            {hytte["Korteste vei"]}
          </Typography>

          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
            Adkomst sommer:
          </Typography>
          <Typography variant="body1" paragraph>
            {hytte["Adkomst sommer"]}
          </Typography>

          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
            Adkomst vinter:
          </Typography>
          <Typography variant="body1" paragraph>
            {hytte["Adkomst vinter"]}
          </Typography>
        </Box>
      </Box>

      {/* Historie-seksjon */}
      <Divider sx={{ my: 4 }} />
      <Typography variant="h6" sx={{ mb: 2 }}>
        Historien
      </Typography>
      <Typography variant="body1" paragraph>
        {hytte["Historien"]}
      </Typography>
    </Box>
  );
}

// Hjelpefunksjon for å vise hver fasilitet
const FacilityItem = ({ title, value }) => (
  <Box>
    <Typography variant="body2" color="text.secondary" fontWeight="bold">
      {title}
    </Typography>
    <Typography variant="body2">{value}</Typography>
  </Box>
);

export default HytteInfo;
