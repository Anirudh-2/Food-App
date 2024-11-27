import {
  Button,
  Card,
  Divider,
  IconButton,
  Snackbar,
  Modal,
  Box,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import AddressCard from "../../components/Address/AddressCard";
import CartItemCard from "../../components/CartItem/CartItemCard";
import { useDispatch, useSelector } from "react-redux";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createOrder } from "../../../State/Customers/Orders/Action";
import { findCart } from "../../../State/Customers/Cart/cart.action";
import { isValid } from "../../util/ValidToOrder";
import { cartTotal } from "./totalPay";
import { clearCartAction } from "../../../State/Customers/Cart/cart.action";

// Initial values for the new address form
const initialValues = {
  streetAddress: "",
  state: "",
  pincode: "",
  city: "",
};

// Validation schema for the new address form
const validationSchema = Yup.object().shape({
  streetAddress: Yup.string().required("Street Address is required"),
  state: Yup.string().required("State is required"),
  pincode: Yup.string()
    .required("Pincode is required")
    .matches(/^\d{6}$/, "Pincode must be 6 digits"),
  city: Yup.string().required("City is required"),
});

// Modal styles for address form
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  outline: "none",
  p: 4,
};

const Cart = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [paymentOption, setPaymentOption] = useState({
    onlinePayment: false,
    cashOnDelivery: false,
  }); // Track payment options
  const dispatch = useDispatch();
  const { cart, auth } = useSelector((store) => store);
  const [openAddressModal, setOpenAddressModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null); // Track selected address
  const [showPaymentOptions, setShowPaymentOptions] = useState(false); // Control payment option visibility

  const handleCloseAddressModal = () => {
    setOpenAddressModal(false);
  };

  const handleOpenAddressModal = () => setOpenAddressModal(true);

  useEffect(() => {
    dispatch(findCart(localStorage.getItem("jwt")));
  }, [dispatch]);

  const handleSelectAddress = (address) => {
    setSelectedAddress(address); // Set the selected address
    setShowPaymentOptions(true); // Show payment options after address selection
  };

  const handleSubmit = (values, { resetForm }) => {
    const data = {
      jwt: localStorage.getItem("jwt"),
      order: {
        restaurantId: cart.cartItems[0].food?.restaurant.id,
        deliveryAddress: {
          fullName: auth.user?.fullName,
          streetAddress: values.streetAddress,
          city: values.city,
          state: values.state,
          postalCode: values.pincode,
          country: "India",
        },
      },
    };

    if (isValid(cart.cartItems)) {
      dispatch(createOrder(data)); // Create the order
      setOpenSnackbar(true); // Show success Snackbar
    } else {
      setOpenSnackbar(true); // Show Snackbar for invalid items
    }
  };

  const createOrderUsingSelectedAddress = () => {
    const data = {
      token: localStorage.getItem("jwt"),
      order: {
        restaurantId: cart.cartItems[0].food.restaurant.id,
        deliveryAddress: {
          fullName: auth.user?.fullName,
          streetAddress: selectedAddress.streetAddress,
          city: selectedAddress.city,
          state: selectedAddress.state,
          postalCode: selectedAddress.pincode,
          country: "India",
        },
      },
    };
    
    if (isValid(cart.cartItems)) {
      dispatch(createOrder(data)); // Create the order
      dispatch(clearCartAction(localStorage.getItem("jwt"))); // Clear the cart after placing the order
      setOpenSnackbar(true); // Show success Snackbar
    } else {
      setOpenSnackbar(true); // Show Snackbar for invalid items
    }
  };
  
  const handlePaymentOptionChange = (event) => {
    // Ensure only one checkbox is checked at a time
    if (event.target.name === "onlinePayment") {
      setPaymentOption({
        onlinePayment: true,
        cashOnDelivery: false,
      });
    } else if (event.target.name === "cashOnDelivery") {
      setPaymentOption({
        onlinePayment: false,
        cashOnDelivery: true,
      });
    }
  };

  const handleOrderPlacement = () => {
    if (paymentOption.onlinePayment) {
      // Redirect to online payment gateway (Stripe checkout)
      // The payment URL here is a placeholder, replace it with the actual Stripe checkout session URL
      window.location.href = "https://checkout.stripe.com/c/pay/cs_test_a1EWZ9mSkkKOkCZ5HmO2Rm8AXWXKDJRGI5Cr6JOUkJMEwCK5XLa3cJrzjO#fidkdWxOYHwnPyd1blpxYHZxWjA0VEliTG1OVjRwYD1gXTA0U1J%2FY2xvPHJjXFNcSWJwX3BQNGw1SjZoSUtvMEx8QlUzQmthR2NuV0JwN0lBYUI2cG9RcFVHcnw2ZkpsYXxTaG5PNTZIMmpwNTVVN3J0ak9oYCcpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl";
    } else if (paymentOption.cashOnDelivery) {
      // Proceed with order placement for Cash on Delivery
      createOrderUsingSelectedAddress();
      dispatch(clearCartAction(localStorage.getItem("jwt"))); // Clear the cart after placing the order
    } else {
      // No payment option selected, show an error or prompt the user to select one
      alert("Please select a payment method.");
    }
};


  const handleCloseSnackbar = () => setOpenSnackbar(false);

  return (
    <Fragment>
      {cart.cartItems.length > 0 ? (
        <main className="lg:flex justify-between">
          <section className="lg:w-[30%] space-y-6 lg:min-h-screen pt-10">
            {cart.cartItems.map((item, i) => (
              <CartItemCard key={i} item={item} />
            ))}

            <Divider />
            <div className="billDetails px-5 text-sm">
              <p className="font-extralight py-5">Bill Details</p>
              <div className="space-y-3">
                <div className="flex justify-between text-gray-400">
                  <p>Item Total</p>
                  <p>₹{cartTotal(cart.cartItems)}</p>
                </div>
                <div className="flex justify-between text-gray-400">
                  <p>Deliver Fee</p>
                  <p>₹21</p>
                </div>
                <div className="flex justify-between text-gray-400">
                  <p>Platform Fee</p>
                  <p>₹5</p>
                </div>
                <div className="flex justify-between text-gray-400">
                  <p>GST and Restaurant Charges</p>
                  <p>₹33</p>
                </div>
                <Divider />
                <div className="flex justify-between text-gray-400">
                  <p>Total Pay</p>
                  <p>₹{cartTotal(cart.cartItems) + 33}</p>
                </div>
              </div>
            </div>
          </section>
          <Divider orientation="vertical" flexItem />
          <section className="lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0">
            <div className="text-center">
              <h1 className="font-semibold text-2xl py-10">Choose Delivery Address</h1>
              <div className="flex gap-5 flex-wrap justify-center">
                {auth.user?.addresses.map((item, index) => (
                  <AddressCard
                    key={index}
                    handleSelectAddress={handleSelectAddress}
                    item={item}
                    showButton={true}
                  />
                ))}

                <Card className="flex flex-col justify-center items-center p-5 w-64">
                  <div className="flex space-x-5">
                    <AddLocationAltIcon />
                    <div className="space-y-5">
                      <p>Add New Address</p>
                      <Button
                        onClick={handleOpenAddressModal}
                        sx={{ padding: "8px 20px" }}
                        variant="contained"
                      >
                        Add Address
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </section>
        </main>
      ) : (
        <div className="flex h-[90vh] justify-center items-center">
          <div className="text-center space-y-5">
            <RemoveShoppingCartIcon sx={{ width: "10rem", height: "10rem" }} />
            <p className="font-bold text-3xl">Your Cart Is Empty</p>
          </div>
        </div>
      )}

      {/* Address Modal */}
      <Modal open={openAddressModal} onClose={handleCloseAddressModal}>
        <Box sx={style}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    name="streetAddress"
                    as={TextField}
                    label="Street Address"
                    fullWidth
                    variant="outlined"
                    error={!!ErrorMessage("streetAddress")}
                    helperText={<ErrorMessage name="streetAddress" />}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    name="state"
                    as={TextField}
                    label="State"
                    fullWidth
                    variant="outlined"
                    error={!!ErrorMessage("state")}
                    helperText={<ErrorMessage name="state" />}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    name="pincode"
                    as={TextField}
                    label="Pincode"
                    fullWidth
                    variant="outlined"
                    error={!!ErrorMessage("pincode")}
                    helperText={<ErrorMessage name="pincode" />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    name="city"
                    as={TextField}
                    label="City"
                    fullWidth
                    variant="outlined"
                    error={!!ErrorMessage("city")}
                    helperText={<ErrorMessage name="city" />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary">
                    Deliver Here
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Box>
      </Modal>

      {/* Payment Options Modal */}
      {showPaymentOptions && (
        <Modal open={showPaymentOptions} onClose={() => setShowPaymentOptions(false)}>
          <Box sx={style}>
            <h2>Choose Payment Option</h2>
            <FormControlLabel
              control={
                <Checkbox
                  checked={paymentOption.onlinePayment}
                  onChange={handlePaymentOptionChange}
                  name="onlinePayment"
                />
              }
              label="Online Payment"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={paymentOption.cashOnDelivery}
                  onChange={handlePaymentOptionChange}
                  name="cashOnDelivery"
                />
              }
              label="Cash On Delivery"
            />
            <Button onClick={handleOrderPlacement} fullWidth variant="contained">
              Place Order
            </Button>
          </Box>
        </Modal>
      )}

      {/* Snackbar for order status */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Order Placed Successfully"
      />
    </Fragment>
  );
};

export default Cart;  