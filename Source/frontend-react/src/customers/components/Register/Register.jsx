import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Button,
  TextField,
  Typography,
  CssBaseline,
  Container,
  MenuItem,
  Select,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../State/Authentication/Action";

const initialValues = {
  fullName: "",
  email: "",
  password: "",
  role: "ROLE_CUSTOMER",
};

const validationSchema = Yup.object({
  fullName: Yup.string().required("Full Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  role: Yup.string().required("Type is required"),
});

const RegistrationForm = () => {
  const [openSnackBar, setOpenSnackBar] = useState(false); // Snackbar state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    // Dispatch registration action
    dispatch(registerUser({ userData: values, navigate }));

    // Show Snackbar after successful registration
    setOpenSnackBar(true);
  };

  // Close Snackbar after it hides
  const handleCloseSnackBar = () => {
    setOpenSnackBar(false);
    navigate("/account/login"); // Navigate to the login page after closing the Snackbar
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Typography className="text-center" variant="h5">
          Register
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <Field
              as={TextField}
              variant="outlined"
              margin="normal"
              fullWidth
              label="Full Name"
              name="fullName"
              id="fullName"
              autoComplete="fullName"
              helperText={<ErrorMessage name="fullName" />}
              error={Boolean(<ErrorMessage name="fullName" />)} // Show error if validation fails
            />
            <Field
              as={TextField}
              variant="outlined"
              margin="normal"
              fullWidth
              label="Email Address"
              name="email"
              id="email"
              autoComplete="email"
              helperText={<ErrorMessage name="email" />}
              error={Boolean(<ErrorMessage name="email" />)} // Show error if validation fails
            />
            <Field
              as={TextField}
              variant="outlined"
              margin="normal"
              fullWidth
              label="Password"
              name="password"
              type="password"
              id="password"
              helperText={<ErrorMessage name="password" />}
              error={Boolean(<ErrorMessage name="password" />)} // Show error if validation fails
            />
            <Field
              as={Select}
              variant="outlined"
              margin="normal"
              fullWidth
              name="role"
              id="role"
              helperText={<ErrorMessage name="role" />}
              error={Boolean(<ErrorMessage name="role" />)} // Show error if validation fails
            >
              <MenuItem value="ROLE_CUSTOMER">Customer</MenuItem>
              <MenuItem value="ROLE_RESTAURANT_OWNER">Restaurant Owner</MenuItem>
            </Field>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
            >
              Register
            </Button>
          </Form>
        </Formik>
        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
          Already have an account?{" "}
          <Button onClick={() => navigate("/account/login")}>Login</Button>
        </Typography>
      </div>

      {/* Snackbar for successful registration */}
      <Snackbar
        sx={{
          position: "fixed",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
        }}
        open={openSnackBar}
        autoHideDuration={3000}
        onClose={handleCloseSnackBar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Registration Successful
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default RegistrationForm;
