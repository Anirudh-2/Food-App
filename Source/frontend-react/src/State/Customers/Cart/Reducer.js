import { LOGOUT } from "../../Authentication/ActionType";
import * as actionTypes from "./ActionTypes";

const initialState = {
  cart: null,
  cartItems: [],
  loading: false,
  error: null,
  success: null,  // Success state for indicating successful actions like adding/removing items
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    // Request actions (Loading state)
    case actionTypes.FIND_CART_REQUEST:
    case actionTypes.GET_ALL_CART_ITEMS_REQUEST:
    case actionTypes.UPDATE_CARTITEM_REQUEST:
    case actionTypes.REMOVE_CARTITEM_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,  // Reset error state on new request
      };

    // Success actions (Cart operations)
    case actionTypes.FIND_CART_SUCCESS:
    case actionTypes.CLEARE_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        cart: action.payload,
        cartItems: action.payload.items || [],  // Ensure cart items are updated
        success: "Cart loaded successfully",  // Add success message
      };
    case actionTypes.ADD_ITEM_TO_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        cartItems: [action.payload, ...state.cartItems],  // Add new item at the beginning
        success: "Item added to cart",  // Success message
      };
    case actionTypes.UPDATE_CARTITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
        success: "Item updated in cart",  // Success message
      };
    case actionTypes.REMOVE_CARTITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        cartItems: state.cartItems.filter((item) =>
          item.id !== action.payload
        ),
        success: "Item removed from cart",  // Success message
      };

    // Failure actions (Error state)
    case actionTypes.FIND_CART_FAILURE:
    case actionTypes.UPDATE_CARTITEM_FAILURE:
    case actionTypes.REMOVE_CARTITEM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,  // Set the error state
        success: null,  // Clear success on failure
      };

    // Handle logout (Clear cart and remove JWT from local storage)
    case LOGOUT:
      localStorage.removeItem("jwt");  // Clear JWT token on logout
      return {
        ...state,
        cartItems: [],  // Clear cart items
        cart: null,  // Reset cart
        success: "Logout successful",  // Success message
      };

    default:
      return state;
  }
};

export default cartReducer;
