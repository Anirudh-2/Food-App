import { api } from "../../../config/api";
import { createOrderFailure, createOrderRequest, createOrderSuccess, getUsersOrdersFailure, getUsersOrdersRequest, getUsersOrdersSuccess } from "./ActionCreators";
import { GET_USERS_NOTIFICATION_FAILURE, GET_USERS_NOTIFICATION_SUCCESS } from "./ActionTypes";


// Updated createOrder action
export const createOrder = (reqData) => {
  return async (dispatch) => {
    dispatch(createOrderRequest());
    try {
      const { data } = await api.post('/api/order', reqData.order, {
        headers: {
          Authorization: `Bearer ${reqData.jwt}`,
        },
      });

      if (data.payment_url) {
        window.location.href = data.payment_url;
      }
      console.log("Created order data:", data);
      dispatch(createOrderSuccess(data));

      // Refetch the user's orders after successfully placing an order
      dispatch(getUsersOrders(reqData.jwt));  // Refetch the orders list
    } catch (error) {
      console.log("Error:", error);
      dispatch(createOrderFailure(error));
    }
  };
};



// getUsersOrders Action - to fetch orders
export const getUsersOrders = (jwt) => {
  return async (dispatch) => {
    dispatch(getUsersOrdersRequest());
    try {
      const { data } = await api.get(`/api/order/user`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("Fetched user's orders:", data);
      dispatch(getUsersOrdersSuccess(data));
    } catch (error) {
      console.log("Error fetching orders:", error);
      dispatch(getUsersOrdersFailure(error));
    }
  };
};



export const getUsersNotificationAction = () => {
  return async (dispatch) => {
    dispatch(createOrderRequest());
    try {
      const {data} = await api.get('/api/notifications');
     
      console.log("all notifications ",data)
      dispatch({type:GET_USERS_NOTIFICATION_SUCCESS,payload:data});
    } catch (error) {
      console.log("error ",error)
      dispatch({type:GET_USERS_NOTIFICATION_FAILURE,payload:error});
    }
  };
};
