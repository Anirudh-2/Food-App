import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEventAction, getRestaurnatsEvents, deleteEventAction } from "../../State/Customers/Restaurant/restaurant.action";
import { Box, Button, Grid, Modal, TextField, Snackbar, Alert } from "@mui/material";
import EventCard from "./EventCard";
import { useFormik } from "formik";
import * as Yup from "yup";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  outline: "none",
  boxShadow: 24,
  p: 4,
};

const initialValues = {
  image: "",
  location: "",
  name: "",
  startedAt: null,
  endsAt: null,
};

// Validation schema using Yup
const validationSchema = Yup.object({
  image: Yup.string().required("Image URL is required"),
  location: Yup.string().required("Location is required"),
  name: Yup.string().required("Event name is required"),
  startedAt: Yup.date().required("Start date and time are required"),
  endsAt: Yup.date()
    .required("End date and time are required")
    .min(Yup.ref("startedAt"), "End time must be after start time"),
});

const Events = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const dispatch = useDispatch();
  const { restaurant, auth } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatch(
        createEventAction({
          data: values,
          restaurantId: restaurant?.usersRestaurant?.id,
          jwt,
        })
      );
      setSnackBarMessage("Event Created Successfully!");
      setOpenSnackBar(true);
      formik.resetForm();
      setOpenModal(false);
    },
  });

  const handleDelete = (eventId) => {
    dispatch(deleteEventAction(eventId));
    setSnackBarMessage("Event Deleted Successfully!");
    setOpenSnackBar(true);
  };

  useEffect(() => {
    if (restaurant?.usersRestaurant) {
      dispatch(
        getRestaurnatsEvents({
          restaurantId: restaurant?.usersRestaurant?.id,
          jwt: auth.jwt || jwt,
        })
      );
    }
  }, [restaurant?.usersRestaurant, dispatch]);

  return (
    <div>
      <div className="p-5">
        <Button
          sx={{ padding: "1rem 2rem" }}
          onClick={() => setOpenModal(true)}
          variant="contained"
          color="primary"
        >
          Create New Event
        </Button>
      </div>

      <div className="mt-5 px-5 flex flex-wrap gap-5">
        {restaurant?.restaurantsEvents?.map((item) => (
          item && (
            <EventCard
              key={item.id}
              item={item}
              onDelete={() => handleDelete(item.id)}  // Pass the delete handler to EventCard
            />
          )
        ))}
      </div>

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  name="image"
                  label="Image URL"
                  variant="outlined"
                  fullWidth
                  value={formik.values.image}
                  onChange={formik.handleChange}
                  error={formik.touched.image && Boolean(formik.errors.image)}
                  helperText={formik.touched.image && formik.errors.image}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="location"
                  label="Location"
                  variant="outlined"
                  fullWidth
                  value={formik.values.location}
                  onChange={formik.handleChange}
                  error={formik.touched.location && Boolean(formik.errors.location)}
                  helperText={formik.touched.location && formik.errors.location}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  label="Event Name"
                  variant="outlined"
                  fullWidth
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="Start Date and Time"
                    value={formik.values.startedAt}
                    onChange={(newValue) => formik.setFieldValue("startedAt", newValue)}
                    inputFormat="MM/dd/yyyy hh:mm a"
                    className="w-full"
                    sx={{ width: "100%" }}
                    error={formik.touched.startedAt && Boolean(formik.errors.startedAt)}
                    helperText={formik.touched.startedAt && formik.errors.startedAt}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="End Date and Time"
                    value={formik.values.endsAt}
                    onChange={(newValue) => formik.setFieldValue("endsAt", newValue)}
                    inputFormat="MM/dd/yyyy hh:mm a"
                    className="w-full"
                    sx={{ width: "100%" }}
                    error={formik.touched.endsAt && Boolean(formik.errors.endsAt)}
                    helperText={formik.touched.endsAt && formik.errors.endsAt}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
            <Box mt={2}>
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>

      {/* Snackbar */}
      <Snackbar
        sx={{
          position: "fixed",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "blue",
        }}
        open={openSnackBar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackBar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          {snackBarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Events;
