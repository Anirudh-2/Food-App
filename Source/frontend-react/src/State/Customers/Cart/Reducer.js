import { LOGOUT } from "../../Authentication/ActionType";
import * as actionTypes from "./ActionTypes";

const initialState = {
  cart: null,
  cartItems: [],
  loading: false,
  error: null,
  success: null,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FIND_CART_REQUEST:
    case actionTypes.GET_ALL_CART_ITEMS_REQUEST:
    case actionTypes.UPDATE_CARTITEM_REQUEST:
    case actionTypes.REMOVE_CARTITEM_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    // Success actions
    case actionTypes.FIND_CART_SUCCESS:
    case actionTypes.CLEARE_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        cart: action.payload,
        cartItems: action.payload.items || [],
        success: "Cart loaded successfully",
      };

    case actionTypes.ADD_ITEM_TO_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        cartItems: [action.payload, ...state.cartItems],
        success: "Item added to cart",
      };

    case actionTypes.UPDATE_CARTITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
        success: "Item updated in cart",
      };

    case actionTypes.REMOVE_CARTITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
        success: "Item removed from cart",
      };

    // Failure actions
    case actionTypes.FIND_CART_FAILURE:
    case actionTypes.UPDATE_CARTITEM_FAILURE:
    case actionTypes.REMOVE_CARTITEM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: null,
      };

    case actionTypes.CLEARE_CART_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Handle logout
    case LOGOUT:
      localStorage.removeItem("jwt");
      return {
        ...state,
        cartItems: [],
        cart: null,
        success: null,
      };

    default:
      return state;
  }
};

export default cartReducer;
