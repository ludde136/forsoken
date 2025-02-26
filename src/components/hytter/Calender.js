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
import * as yup from "yup";

const WEEKDAY_PRICE = 900;
const WEEKEND_PRICE = 1500;
const ANNEX_PRICE = 400;
const FIREWOOD_PRICE = 100;

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .matches(
      /^[A-Za-zÆØÅæøå]+ [A-Za-zÆØÅæøå]+/,
      "Vennligst skriv inn både for- og etternavn"
    )
    .required("Navn er påkrevd"),

  phone: yup
    .string()
    .matches(
      /^[0-9]{8}$/,
      "Vennligst skriv inn et gyldig 8-sifret telefonnummer"
    )
    .required("Telefonnummer er påkrevd"),

  email: yup
    .string()
    .email("Vennligst skriv inn en gyldig e-postadresse")
    .required("E-post er påkrevd"),

  birthYear: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : Number(value)))
    .test("age", "Du må være minst 25 år for å leie hytta", (value) => {
      if (!value) return false;
      const currentYear = new Date().getFullYear();
      const age = currentYear - value;
      return age >= 25;
    })
    .required("Fødselsår er påkrevd"),
});

const isWeekend = (date) => {
  const day = date.getDay();
  return day === 5 || day === 6; // 5 er fredag, 6 er lørdag
};

const CalendarComponent = () => {
  const [date] = useState(new Date());
  const [bookedDates, setBookedDates] = useState([]);
  const [priceChanges, setPriceChanges] = useState([]);
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
        const allBookings = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            ...data,
            start: new Date(data.start),
            end: new Date(data.end),
            status: data.status || "booked",
            isPriceChange: data.isPriceChange || false,
            totalPrice: data.totalPrice,
          };
        });

        // Separer bookinger og prisendringer
        const bookings = allBookings.filter(
          (booking) => !booking.isPriceChange && booking.status === "booked"
        );
        const prices = allBookings.filter((booking) => booking.isPriceChange);

        setBookedDates(bookings);
        setPriceChanges(prices);
      } catch (error) {
        console.error("Feil ved henting av bookinger:", error);
      }
    };
    fetchBookings();
  }, []);

  const handleBookingRequest = async () => {
    try {
      await validationSchema.validate(userInfo, { abortEarly: false });

      // Hvis validering er vellykket, fortsett med booking
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
        setShowPaymentDialog(true);
      }
    } catch (err) {
      // Håndter valideringsfeil
      const newErrors = {};
      if (err.inner) {
        err.inner.forEach((error) => {
          newErrors[error.path] = true;
        });
      }
      setErrors(newErrors);
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

  const getDatePrice = (date) => {
    // Sjekk om datoen har en prisendring
    const priceChange = priceChanges.find((change) => {
      const changeStart = new Date(change.start);
      const changeEnd = new Date(change.end);
      return date >= changeStart && date <= changeEnd;
    });

    if (priceChange) {
      return parseInt(priceChange.totalPrice);
    }

    // Hvis ingen prisendring, bruk standard priser
    return isWeekend(date) ? WEEKEND_PRICE : WEEKDAY_PRICE;
  };

  const calculateTotalPrice = (start, end) => {
    if (!start || !end) return 0;

    let totalPrice = 0;
    const currentDate = new Date(start);
    const endDate = new Date(end);

    while (currentDate < endDate) {
      totalPrice += getDatePrice(currentDate);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return totalPrice;
  };

  const tileContent = ({ date }) => {
    if (isBeforeToday(date) || isAfterOneYear(date)) {
      return null;
    }

    const price = getDatePrice(date);
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
    if (!startDate || !endDate) return 0;

    const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    let total = calculateTotalPrice(startDate, endDate);

    if (extras.annex) {
      total += ANNEX_PRICE * days;
    }
    if (extras.firewood) {
      total += FIREWOOD_PRICE * days;
    }

    return total;
  };

  const handleInputChange = async (field, value) => {
    try {
      let validationValue = value;
      if (field === "birthYear") {
        validationValue = value === "" ? undefined : Number(value);
      }

      await validationSchema.validateAt(field, {
        ...userInfo,
        [field]: validationValue,
      });
      setErrors((prev) => ({ ...prev, [field]: false }));
    } catch (err) {
      setErrors((prev) => ({ ...prev, [field]: true }));
    }

    setUserInfo((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="App">
      <h1>Bestillingskalender</h1>
      <Calendar
        onChange={handleDateChange}
        value={date}
        tileContent={tileContent}
        tileClassName={tileClassName}
        view="month"
        onDrillUp={() => null}
        onClickMonth={() => null}
        onClickYear={() => null}
      />
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
                Ordinære priser: Hverdager {WEEKDAY_PRICE} kr/døgn • Helg{" "}
                {WEEKEND_PRICE} kr/døgn
                {priceChanges.length > 0 && (
                  <>
                    <br />
                    Prisene kan avvike i perioder med høy etterspørsel
                  </>
                )}
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
                onChange={(e) => handleInputChange("name", e.target.value)}
                startAdornment={
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                }
              />
              {errors.name && (
                <FormHelperText>
                  Vennligst skriv inn både for- og etternavn
                </FormHelperText>
              )}
            </FormControl>

            <FormControl error={errors.phone} size="small" variant="outlined">
              <InputLabel>Telefonnummer</InputLabel>
              <OutlinedInput
                label="Telefonnummer"
                value={userInfo.phone}
                onChange={(e) => {
                  const onlyNumbers = e.target.value.replace(/[^0-9]/g, "");
                  handleInputChange("phone", onlyNumbers);
                }}
                startAdornment={
                  <InputAdornment position="start">
                    <Phone />
                  </InputAdornment>
                }
              />
              {errors.phone && (
                <FormHelperText>
                  Vennligst skriv inn et gyldig 8-sifret telefonnummer
                </FormHelperText>
              )}
            </FormControl>

            <FormControl error={errors.email} size="small" variant="outlined">
              <InputLabel>E-post</InputLabel>
              <OutlinedInput
                label="E-post"
                value={userInfo.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                startAdornment={
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                }
              />
              {errors.email && (
                <FormHelperText>
                  Vennligst skriv inn en gyldig e-postadresse
                </FormHelperText>
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
                type="number"
                onChange={(e) => {
                  const year = e.target.value;
                  if (year.length <= 4) {
                    handleInputChange("birthYear", year);
                  }
                }}
                startAdornment={
                  <InputAdornment position="start">
                    <Cake />
                  </InputAdornment>
                }
              />
              {errors.birthYear && (
                <FormHelperText>
                  Du må være minst 25 år for å leie hytta
                </FormHelperText>
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
