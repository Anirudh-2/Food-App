import React, { useState } from "react";
import {
  TextField,
  Button,
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createIngredient } from "../../State/Admin/Ingredients/Action";
import * as Yup from "yup";
import { useFormik } from "formik";

const CreateIngredientForm = ({ handleClose }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { auth, restaurant, ingredients } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  // State for Snackbar
  const [openSnackBar, setOpenSnackBar] = useState(false);

  // Form validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required("Ingredient name is required"),
    ingredientCategoryId: Yup.string().required("Category is required"),
  });

  // Formik hook
  const formik = useFormik({
    initialValues: {
      name: "",
      ingredientCategoryId: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const data = { ...values, restaurantId: restaurant.usersRestaurant.id };
      dispatch(createIngredient({ jwt: auth.jwt || jwt, data }));
      setOpenSnackBar(true); // Show Snackbar after successful submission
      formik.resetForm(); // Reset the form after submission
      handleClose(); // Close the form
    },
  });

  return (
    <div className="p-5">
      <h1 className="text-gray-400 text-center text-xl pb-10">Create Ingredient</h1>
      <form className="space-y-5" onSubmit={formik.handleSubmit}>
        <TextField
          label="Ingredient"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          fullWidth
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />

        <FormControl fullWidth error={formik.touched.ingredientCategoryId && Boolean(formik.errors.ingredientCategoryId)}>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={formik.values.ingredientCategoryId}
            label="Category"
            name="ingredientCategoryId"
            onChange={formik.handleChange}
          >
            {ingredients.category.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
          {formik.touched.ingredientCategoryId && formik.errors.ingredientCategoryId && (
            <p style={{ color: "red" }}>{formik.errors.ingredientCategoryId}</p>
          )}
        </FormControl>

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
          New Ingredient is Created
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CreateIngredientForm;
