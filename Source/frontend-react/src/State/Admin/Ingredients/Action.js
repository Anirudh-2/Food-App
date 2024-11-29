import axios from 'axios';
import { 
  CREATE_INGREDIENT_CATEGORY_FAILURE, 
  CREATE_INGREDIENT_CATEGORY_SUCCESS, 
  CREATE_INGREDIENT_SUCCESS, 
  GET_INGREDIENTS, 
  GET_INGREDIENT_CATEGORY_FAILURE, 
  GET_INGREDIENT_CATEGORY_SUCCESS, 
  UPDATE_STOCK, 
  DELETE_CATEGORY, 
  DELETE_INGREDIENT 
} from './ActionType';
import { API_URL, api } from '../../../config/api';

export const getIngredientsOfRestaurant = ({ id, jwt }) => {
  return async (dispatch) => {
    try {
      if (!id) {
        console.error("Restaurant ID is missing");
        return;
      }

      const response = await api.get(`/api/admin/ingredients/restaurant/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      console.log("get all ingredients ", response.data);
      dispatch({
        type: GET_INGREDIENTS,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error fetching ingredients: ", error);
    }
  };
};

export const createIngredient = ({ data, jwt }) => {
  return async (dispatch) => {
    try {
      const response = await api.post(`/api/admin/ingredients`, data, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("create ingredients ", response.data);
      dispatch({
        type: CREATE_INGREDIENT_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error creating ingredient:", error);
    }
  };
};

export const createIngredientCategory = ({ data, jwt }) => {
  console.log("data ", data, "jwt", jwt);
  return async (dispatch) => {
    try {
      const response = await api.post(`/api/admin/ingredients/category`, data, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("create ingredients category", response.data);
      dispatch({
        type: CREATE_INGREDIENT_CATEGORY_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error creating ingredient category:", error);
    }
  };
};

export const getIngredientCategory = ({ id, jwt }) => {
  return async (dispatch) => {
    try {
      if (!id) {
        console.error("Restaurant ID is missing");
        return;
      }

      const response = await api.get(`/api/admin/ingredients/restaurant/${id}/category`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      console.log("get ingredients category", response.data);
      dispatch({
        type: GET_INGREDIENT_CATEGORY_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error fetching ingredient category: ", error);
    }
  };
};

export const updateStockOfIngredient = ({ id, jwt }) => {
  return async (dispatch) => {
    try {
      if (!id) {
        console.error("Ingredient ID is missing for stock update");
        return;
      }

      const { data } = await api.put(
        `/api/admin/ingredients/${id}/stoke`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      dispatch({
        type: UPDATE_STOCK,
        payload: data,
      });
      console.log("update ingredients stock ", data);
    } catch (error) {
      console.error("Error updating stock for ingredient: ", error);
    }
  };
};

export const deleteIngredient = (id, jwt) => {
  return async (dispatch) => {
    try {
      if (!id) {
        console.error("Ingredient ID is missing");
        return;
      }

      const response = await axios.delete(`/api/ingredients/${id}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });

      if (response.status === 200) {
        dispatch({
          type: DELETE_INGREDIENT,
          payload: id,
        });
        console.log("Ingredient deleted successfully.");
      } else {
        console.error("Failed to delete ingredient, response status:", response.status);
      }
    } catch (error) {
      console.error("Error deleting ingredient:", error);
    }
  };
};


export const deleteCategory = (id, jwt) => {
  return async (dispatch) => {
    try {
      if (!id) {
        console.error("Category ID is missing");
        return;
      }

      const response = await axios.delete(`/api/categories/${id}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });

      if (response.status === 200) {
        dispatch({
          type: DELETE_CATEGORY,
          payload: id,
        });
        console.log("Category deleted successfully.");
      } else {
        console.error("Failed to delete category, response status:", response.status);
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };
};
