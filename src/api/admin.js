import axios from "axios";
import { API_URL } from "../utils/config";

export const acceptedRecipe = async (id) => {
    try {
      const response = await axios.patch(
        `${API_URL}/recipes/${id}`,
        {
          is_active: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

        return response.data;

    } catch (error) {
        console.log('Accept recipe error:', error)
      return { error: "Error accepting recipe" };
    }
  };

  export const deactivateRecipe = async (id) => {
    try {
      const response = await axios.patch(
        `${API_URL}/recipes/${id}`,
        {
          is_active: false,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

        return response.data;

    } catch (error) {
        console.error('Deactivate recipe error:', error)
      return { error: "Error deactivating recipe" };
    }
  };