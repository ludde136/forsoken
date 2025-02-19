import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { db } from "../../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import {
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  InputAdornment,
  OutlinedInput,
  FormControl,
  FormHelperText,
  InputLabel,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Person, Phone, Email, Cake } from "@mui/icons-material";

const WEEKDAY_PRICE = 900;
const WEEKEND_PRICE = 1500;
const ANNEX_PRICE = 400;
const FIREWOOD_PRICE = 100;

const isWeekend = (date) => {
  const day = date.getDay();
  return day === 5 || day === 6; // 5 er fredag, 6 er lørdag
};

const calculateTotalPrice = (start, end) => {
  if (!start || !end) return 0;

  let totalPrice = 0;
  const currentDate = new Date(start);
  const endDate = new Date(end);

  // Gå gjennom hver dag i perioden, men ikke inkluder sluttdatoen
  while (currentDate < endDate) {
    // Endret fra <= til <
    totalPrice += isWeekend(currentDate) ? WEEKEND_PRICE : WEEKDAY_PRICE;
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return totalPrice;
};

const CalendarComponent = () => {
  const [date] = useState(new Date());
  const [bookedDates, setBookedDates] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  // Combine name, phone, email, and birthYear into one object
  const [userInfo, setUserInfo] = useState({
    name: "",
    phone: "",
    email: "",
    birthYear: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    phone: false,
    email: false,
    birthYear: false,
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [extras, setExtras] = useState({
    annex: false,
    firewood: false,
  });

  // Legg til ny state for betalingsdialog
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [confirmedAmount, setConfirmedAmount] = useState(0);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "bookings"));
        const allBookings = querySnapshot.docs
          .map((doc) => {
            const data = doc.data();
            // Sjekk om vi har en fullstendig booking eller bare sperrede datoer
            if (data.start && data.end) {
              return {
                ...data,
                start: new Date(data.start),
                end: new Date(data.end),
                // Hvis booking mangler status, behandle den som sperret
                status: data.status || "booked",
              };
            }
            return null;
          })
          .filter(Boolean); // Fjerner eventuelle null-verdier

        // Filtrer ut bookinger som enten er bekreftet eller mangler brukerinfo
        const confirmedBookings = allBookings.filter(
          (booking) => booking.status === "booked"
        );
        setBookedDates(confirmedBookings);
      } catch (error) {
        console.error("Feil ved henting av bookinger:", error);
      }
    };
    fetchBookings();
  }, []);

  const handleBookingRequest = async () => {
    if (
      !userInfo.name ||
      !userInfo.phone ||
      !userInfo.email ||
      !userInfo.birthYear
    ) {
      setErrors({
        name: !userInfo.name,
        phone: !userInfo.phone,
        email: !userInfo.email,
        birthYear: !userInfo.birthYear,
      });
      return;
    }

    if (startDate && endDate) {
      const finalPrice = getTotalPrice();
      const newBooking = {
        ...userInfo,
        start: startDate.toDateString(),
        end: endDate.toDateString(),
        totalPrice: finalPrice,
        status: "pending",
      };

      await addDoc(collection(db, "bookings"), newBooking);
      setStartDate(null);
      setEndDate(null);
      setUserInfo({ name: "", phone: "", email: "", birthYear: "" });
      setExtras({ annex: false, firewood: false });
      setOpenDialog(false);
      setConfirmedAmount(finalPrice);
      setShowPaymentDialog(true); // Vis betalingsdialog i stedet for alert
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setUserInfo({ name: "", phone: "", email: "", birthYear: "" });
    setErrors({ name: false, phone: false, email: false, birthYear: false });
    setExtras({ annex: false, firewood: false });
  };

  const handleClearDates = () => {
    setStartDate(null);
    setEndDate(null);
    setTotalPrice(0);
  };

  const isBooked = (date) => {
    return bookedDates.some((booking) => {
      const bookingStart = booking.start;
      const bookingEnd = booking.end;

      // Sammenlign datoen med booking-perioden, uavhengig av om det er en full booking eller sperret dato
      return date >= bookingStart && date <= bookingEnd;
    });
  };

  const isBeforeToday = (date) => {
    return date < new Date().setHours(0, 0, 0, 0); // Prevent dates before today
  };

  const isAfterOneYear = (date) => {
    const oneYearLater = new Date();
    oneYearLater.setFullYear(oneYearLater.getFullYear() + 1); // Prevent booking more than a year ahead
    return date > oneYearLater;
  };

  const hasBookedDatesBetween = (start, end) => {
    if (!start || !end) return false;

    // Sjekk om det er noen fullstendig bookede dager mellom datoene
    const hasFullyBookedDays = bookedDates.some((booking) => {
      const bookingStart = new Date(booking.start);
      const bookingEnd = new Date(booking.end);

      // Sjekk om bookingen er helt mellom start og slutt
      return (
        (bookingStart > start && bookingStart < end) ||
        (bookingEnd > start && bookingEnd < end) ||
        (bookingStart <= start && bookingEnd >= end)
      );
    });

    return hasFullyBookedDays;
  };

  const handleDateChange = (selectedDate) => {
    if (isBeforeToday(selectedDate) || isAfterOneYear(selectedDate)) {
      return;
    }

    if (!startDate) {
      const isStartOfBooking = bookedDates.some(
        (booking) =>
          booking.start.toDateString() === selectedDate.toDateString() &&
          booking.start.toDateString() !== booking.end.toDateString()
      );

      if (isStartOfBooking) {
        alert("Du kan ikke starte en booking på en dato som er opptatt");
        return;
      }

      setStartDate(selectedDate);
      setTotalPrice(0);
    } else if (!endDate) {
      if (selectedDate > startDate) {
        if (hasBookedDatesBetween(startDate, selectedDate)) {
          alert(
            "Du kan ikke velge en periode som overlapper med eksisterende bookinger"
          );
          return;
        }

        setEndDate(selectedDate);
        const price = calculateTotalPrice(startDate, selectedDate);
        setTotalPrice(price);
        setOpenDialog(true);
      } else {
        setStartDate(selectedDate);
        setTotalPrice(0);
      }
    } else {
      setStartDate(selectedDate);
      setEndDate(null);
      setTotalPrice(0);
    }
  };

  const tileContent = ({ date }) => {
    if (isBeforeToday(date) || isAfterOneYear(date)) {
      return null;
    }

    const price = isWeekend(date) ? WEEKEND_PRICE : WEEKDAY_PRICE;
    return <Typography className="calendar-price">{price}kr</Typography>;
  };

  const tileClassName = ({ date }) => {
    const isBookedDate = isBooked(date);
    const isStartDate =
      startDate && date.toDateString() === startDate.toDateString();
    const isEndDate = endDate && date.toDateString() === endDate.toDateString();

    if (isAfterOneYear(date)) {
      return "invalid-date";
    }
    if (isBeforeToday(date)) {
      return "invalid-date";
    }

    // Sjekk om datoen er start eller slutt på eksisterende bookinger
    const isBookingStart = bookedDates.some(
      (booking) => date.getTime() === booking.start.getTime()
    );
    const isBookingEnd = bookedDates.some(
      (booking) => date.getTime() === booking.end.getTime()
    );

    // Hvis datoen er både start og slutt på bookinger
    if (isBookingStart && isBookingEnd) {
      return "booked-both-sides";
    }

    // Hvis datoen er start på en booking og er valgt som sluttdato
    if (isBookingStart && isEndDate) {
      return "booked-boundary";
    }

    // Hvis datoen er slutt på en booking og er valgt som startdato
    if (isBookingEnd && isStartDate) {
      return "booked-boundary-reverse";
    }

    // Hvis datoen er start på en booking (mot ledig dato)
    if (isBookingStart) {
      return "booked-start-only";
    }

    // Hvis datoen er slutt på en booking (mot ledig dato)
    if (isBookingEnd) {
      return "booked-end-only";
    }

    if (isBookedDate) {
      return "booked";
    }

    if (isStartDate && !isEndDate) {
      return "selected-start";
    }

    if (isEndDate && !isStartDate) {
      return "selected-end";
    }

    if (startDate && endDate && date >= startDate && date <= endDate) {
      return "selected";
    }

    return "";
  };

  const getTotalPrice = () => {
    const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    let total = totalPrice;

    if (extras.annex) {
      total += ANNEX_PRICE * days;
    }
    if (extras.firewood) {
      total += FIREWOOD_PRICE * days;
    }

    return total;
  };

  return (
    <div className="App">
      <h1>Bestillingskalender</h1>
      <div className="calendar-container">
        <Calendar
          onChange={handleDateChange}
          value={date}
          tileContent={tileContent}
          tileClassName={tileClassName}
        />
      </div>
      {startDate && (
        <div className="booking-dates">
          <Typography>
            Valgt startdato:{" "}
            {startDate.toLocaleDateString("no-NO", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Typography>
          {endDate && (
            <>
              <Typography>
                Valgt sluttdato:{" "}
                {endDate.toLocaleDateString("no-NO", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Typography>
              <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
                Total pris: {getTotalPrice()} kr
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Hverdager: {WEEKDAY_PRICE} kr/døgn • Helg: {WEEKEND_PRICE}{" "}
                kr/døgn
              </Typography>
            </>
          )}
        </div>
      )}
      <div className="booking-buttons">
        <Button
          variant="contained"
          color="secondary"
          onClick={handleClearDates}
        >
          Tøm datoer
        </Button>
      </div>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Bekreft booking</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              pt: 1,
            }}
          >
            <Typography variant="body1">
              Grunnpris for oppholdet: {totalPrice} kr
            </Typography>

            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Tilvalg:
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={extras.annex}
                    onChange={(e) =>
                      setExtras({ ...extras, annex: e.target.checked })
                    }
                  />
                }
                label={`Anneks (${ANNEX_PRICE} kr per døgn)`}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={extras.firewood}
                    onChange={(e) =>
                      setExtras({ ...extras, firewood: e.target.checked })
                    }
                  />
                }
                label={`Ved (${FIREWOOD_PRICE} kr per døgn)`}
              />
            </Box>

            <Typography variant="h6" sx={{ mb: 2 }}>
              Total pris: {getTotalPrice()} kr
            </Typography>

            <FormControl error={errors.name} size="small" variant="outlined">
              <InputLabel>Navn</InputLabel>
              <OutlinedInput
                label="Navn"
                value={userInfo.name}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, name: e.target.value })
                }
                startAdornment={
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                }
              />
              {errors.name && (
                <FormHelperText>Navn er obligatorisk</FormHelperText>
              )}
            </FormControl>

            <FormControl error={errors.phone} size="small" variant="outlined">
              <InputLabel>Telefonnummer</InputLabel>
              <OutlinedInput
                label="Telefonnummer"
                value={userInfo.phone}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, phone: e.target.value })
                }
                startAdornment={
                  <InputAdornment position="start">
                    <Phone />
                  </InputAdornment>
                }
              />
              {errors.phone && (
                <FormHelperText>Telefonnummer er obligatorisk</FormHelperText>
              )}
            </FormControl>

            <FormControl error={errors.email} size="small" variant="outlined">
              <InputLabel>E-post</InputLabel>
              <OutlinedInput
                label="E-post"
                value={userInfo.email}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, email: e.target.value })
                }
                startAdornment={
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                }
              />
              {errors.email && (
                <FormHelperText>E-post er obligatorisk</FormHelperText>
              )}
            </FormControl>

            <FormControl
              error={errors.birthYear}
              size="small"
              variant="outlined"
            >
              <InputLabel>Fødselsår</InputLabel>
              <OutlinedInput
                label="Fødselsår"
                value={userInfo.birthYear}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, birthYear: e.target.value })
                }
                startAdornment={
                  <InputAdornment position="start">
                    <Cake />
                  </InputAdornment>
                }
              />
              {errors.birthYear && (
                <FormHelperText>Fødselsår er obligatorisk</FormHelperText>
              )}
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Avbryt
          </Button>
          <Button onClick={handleBookingRequest} color="primary">
            Bekreft booking
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={showPaymentDialog}
        onClose={() => setShowPaymentDialog(false)}
      >
        <DialogTitle>Takk for din booking!</DialogTitle>
        <DialogContent>
          <Box sx={{ py: 2 }}>
            <Typography variant="body1" paragraph>
              Så hyggelig at du vil leie hytta! For å bekrefte bookingen din,
              vennligst Vipps {confirmedAmount} kr til nummer 90150051.
            </Typography>
            <Typography variant="body1" paragraph>
              Merk betalingen med navn og dato for oppholdet.
            </Typography>
            <Typography variant="body1" paragraph>
              Du vil motta en SMS med nøkkel og praktisk informasjon dagen før
              oppholdet. Ta kontakt hvis du ikke har hørt noe innen da.
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Hvis de valgte datoene mot formodning ikke skulle være
              tilgjengelige, vil det innbetalte beløpet bli tilbakeført i sin
              helhet.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPaymentDialog(false)} color="primary">
            OK, jeg har betalt
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CalendarComponent;
