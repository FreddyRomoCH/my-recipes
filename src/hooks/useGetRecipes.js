import { useEffect, useState } from "react";
import  { recipesList } from "../services/api/recipes.js";

export const useGetRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null)

  useEffect(() => {
    const recipesFetched = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const result = await recipesList();

        if (result.error) {
          setError(result.error)
          return
        }

        setRecipes(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    recipesFetched();
  }, []);

  const getAllRecipes = () => {
    return recipes;
  }

  const getRecipesByCountry = (country) => {
    if (!country) {
      return null;
    }

    return recipes.filter(recipe => recipe.country === country)
  }

  const getRecipesByCategory = (category) => {
    const categoryName = category
    .toLowerCase()
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

    if (!category) {
      setError("No category added");
      return []
    }

    return recipes.filter(recipe => recipe.categories.some(cat => cat === categoryName))
  }

  const getSingleRecipe = ({ id }) => {
    const singleRecipe = recipes.find(recipe => String(recipe.id) === String(id))
    return singleRecipe
  }

  const getRecipesByUser = ({ id }) => {
    if (!id) {
      return [];
    }

    return recipes.filter(recipe => recipe.user_id === id)
  }

  return { getAllRecipes, getRecipesByCountry, getRecipesByCategory, getSingleRecipe, getRecipesByUser, loading, error }
};