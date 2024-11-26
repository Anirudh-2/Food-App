import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Snackbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../../State/Customers/Cart/cart.action";
import { categorizedIngredients } from "../../util/CategorizeIngredients";

const MenuItemCard = ({ item }) => {
  const dispatch = useDispatch();

  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false); // State to control Snackbar visibility

  const handleCheckboxChange = (itemName) => {
    if (selectedIngredients.includes(itemName)) {
      setSelectedIngredients(
        selectedIngredients.filter((item) => item !== itemName)
      );
    } else {
      setSelectedIngredients([...selectedIngredients, itemName]);
    }
  };

  const handleAddItemToCart = (e) => {
    e.preventDefault(); // Prevent default form submission

    const data = {
      token: localStorage.getItem("jwt"),
      cartItem: {
        menuItemId: item.id,
        quantity: 1,
        ingredients: selectedIngredients,
      },
    };

    // Dispatch the action to add item to the cart
    dispatch(addItemToCart(data));

    // Show Snackbar with success message
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false); // Close the Snackbar
  };

  return (
    <div className="lg:flex items-center justify-between box">
      <div className="lg:flex items-center lg:space-x-5">
        <img
          className="w-[7rem] h-[7rem] object-cover"
          src={item.images[0]}
          alt=""
        />

        <div className="space-y-1 lg:space-y-5 lg:max-w-2xl">
          <p className="font-semibold text-xl">{item.name}</p>
          <p>₹{item.price}</p>
          <p className="text-gray-400">{item.description}</p>
        </div>
      </div>

      <form onSubmit={handleAddItemToCart} className="w-full">
        <div className="flex gap-5 flex-wrap">
          {Object.keys(categorizedIngredients(item?.ingredients))?.map(
            (category) => (
              <div key={category} className="pr-5">
                <p>{category}</p>
                <FormGroup>
                  {categorizedIngredients(item?.ingredients)[category].map(
                    (ingredient) => (
                      <FormControlLabel
                        key={ingredient.name}
                        control={
                          <Checkbox
                            checked={selectedIngredients.includes(
                              ingredient.name
                            )}
                            onChange={() =>
                              handleCheckboxChange(ingredient.name)
                            }
                            disabled={!ingredient.inStoke}
                          />
                        }
                        label={ingredient.name}
                      />
                    )
                  )}
                </FormGroup>
              </div>
            )
          )}
        </div>

        <div className="pt-5">
          <Button
            variant="contained"
            disabled={!item.available}
            type="submit"
            size="small" // Button size reduced to small
          >
            {item.available ? "Add To Cart" : "Out of stock"}
          </Button>
        </div>
      </form>

      {/* Snackbar for success message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000} // Snackbar will disappear after 3 seconds
        onClose={handleCloseSnackbar}
        message="Item added successfully"
      />
    </div>
  );
};

export default MenuItemCard;
