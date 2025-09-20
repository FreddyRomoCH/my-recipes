import { useEffect, useState } from "react";
import { useGetRecipes } from "./useGetRecipes";
import { useTranslation } from "react-i18next";

export function useSearchRecipes({ search }) {
  const { getAllRecipes } = useGetRecipes();
  const [recipes, setRecipes] = useState([]);
  const { t } = useTranslation();

  const recipeList = getAllRecipes();

  useEffect(() => {
    if (!search) {
      setRecipes([]);
      return;
    }

    const lowerSearch = search.toLowerCase();

    const matchedRecipes = recipeList.filter((recipe) => {
      const { title, categories, country } = recipe;

      // traducir categorías antes de comparar
      const translatedCategories = categories.map((cat) =>
        t(cat).toLowerCase()
      );

      return (
        title.toLowerCase().includes(lowerSearch) ||
        translatedCategories.some((cat) => cat.includes(lowerSearch)) ||
        country.toLowerCase().includes(lowerSearch)
      );
    });

    setRecipes(matchedRecipes);
  }, [search, recipeList, t]);

  return { recipes };
}
