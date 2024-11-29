import axios from "axios";
import {
  UPDATE_ORDER_STATUS_REQUEST,
  UPDATE_ORDER_STATUS_SUCCESS,
  UPDATE_ORDER_STATUS_FAILURE,
  GET_RESTAURANTS_ORDER_REQUEST,
  GET_RESTAURANTS_ORDER_SUCCESS,
  GET_RESTAURANTS_ORDER_FAILURE,
} from "./ActionType.js";
import { api } from "../../../config/api.js";

export const updateOrderStatus = ({ orderId, orderStatus, jwt }) => {
  return async (dispatch) => {
    try {
      dispatch({ type: UPDATE_ORDER_STATUS_REQUEST });

      const response = await api.put(
        `/api/admin/orders/${orderId}/${orderStatus}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      const updatedOrder = response.data;

      console.log("Updated order: ", updatedOrder);

      dispatch({
        type: UPDATE_ORDER_STATUS_SUCCESS,
        payload: updatedOrder,
      });
    } catch (error) {
      console.log("Error updating order status: ", error.response || error.message);

      // Handle specific error codes for better debugging
      const errorMessage = error.response
        ? error.response.data.message || error.response.statusText
        : error.message;

      dispatch({
        type: UPDATE_ORDER_STATUS_FAILURE,
        error: errorMessage,
      });
    }
  };
};

export const fetchRestaurantsOrder = ({ restaurantId, orderStatus, jwt }) => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_RESTAURANTS_ORDER_REQUEST });

      const { data } = await api.get(
        `/api/admin/order/restaurant/${restaurantId}`,
        {
          params: { order_status: orderStatus },
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      const orders = data;

      console.log("Fetched restaurant orders: ", orders);

      dispatch({
        type: GET_RESTAURANTS_ORDER_SUCCESS,
        payload: orders,
      });
    } catch (error) {
      console.log("Error fetching restaurant orders: ", error.response || error.message);

      // Handle specific error codes for better debugging
      const errorMessage = error.response
        ? error.response.data.message || error.response.statusText
        : error.message;

      dispatch({
        type: GET_RESTAURANTS_ORDER_FAILURE,
        error: errorMessage,
      });
    }
  };
};
