import React, { useState } from "react";
import { TextField, Button, FormControl, Snackbar, Alert } from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createCategoryAction } from "../../State/Customers/Restaurant/restaurant.action";
import * as Yup from "yup";
import { useFormik } from "formik";

const CreateCategory = ({ handleClose }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { auth, restaurant } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  // State for Snackbar
  const [openSnackBar, setOpenSnackBar] = useState(false);

  // Form validation schema using Yup
  const validationSchema = Yup.object({
    categoryName: Yup.string().required("Category name is required"),
  });

  // Formik hook for form handling
  const formik = useFormik({
    initialValues: {
      categoryName: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const data = {
        name: values.categoryName,
        restaurant: {
          id,
        },
      };
      dispatch(createCategoryAction({ reqData: data, jwt: auth.jwt || jwt }));
      setOpenSnackBar(true); // Show Snackbar after successful submission
      formik.resetForm(); // Reset the form after submission
      handleClose(); // Close the modal
    },
  });

  return (
    <div className="p-5">
      <h1 className="text-gray-400 text-center text-xl pb-10">Create Category</h1>
      <form className="space-y-5" onSubmit={formik.handleSubmit}>
        <TextField
          label="Category Name"
          name="categoryName"
          value={formik.values.categoryName}
          onChange={formik.handleChange}
          fullWidth
          error={formik.touched.categoryName && Boolean(formik.errors.categoryName)}
          helperText={formik.touched.categoryName && formik.errors.categoryName}
        />
        <Button type="submit" variant="contained" color="primary">
          Create
        </Button>
      </form>

      {/* Snackbar */}
      <Snackbar
        sx={{
          position: "fixed",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
        }}
        open={openSnackBar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackBar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          New Category is Created
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CreateCategory;
