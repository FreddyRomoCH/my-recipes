import { useEffect, useState } from "react";
// import { getRecipes } from "../services/api/recipes"
import { useGetRecipes } from "./useGetRecipes";

export function useSearchRecipes({ search }) {
  const { getAllRecipes } = useGetRecipes() 
  const [recipes, setRecipes] = useState([]);

  const recipeList = getAllRecipes();

  useEffect(() => {
    const matchedRecipes = recipeList.filter((recipe) => {
      const { title, categories, country } = recipe;
      return (
        title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
        categories.find((category) => category.toLocaleLowerCase().includes(search.toLocaleLowerCase())) ||
        country.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      );
    });

    setRecipes(matchedRecipes);
  }, [search]);

  return { recipes };
}