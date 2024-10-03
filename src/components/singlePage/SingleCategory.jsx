import { useParams } from "react-router-dom";
import { useGetRecipes } from "../../hooks/useGetRecipes.js";
import { useGetCountries } from "../../hooks/useCountries.js";
import { Boxes } from "../recipes/Boxes.jsx";
import { useEffect, useState } from "react";
import { CategoriesSlider } from "../slider/CategoriesSlider.jsx";
import { Loading } from "../Loading.jsx";
import { Error } from "../Error.jsx";

export function SingleCategory() {
  const [recipes, setRecipes] = useState([]);
  const { category } = useParams();

  const categoryName = category
    .toLowerCase()
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const { getAllRecipes, getRecipesByCategory, loading, error } =
    useGetRecipes();
  const { getFlag } = useGetCountries();

  useEffect(() => {
    if (!loading) {
      if (category === "all") {
        const recipesFetched = getAllRecipes();
        setRecipes(recipesFetched);
        return;
      }

      const recipesFetched = getRecipesByCategory(category);
      setRecipes(recipesFetched);
    }
  }, [category, loading]);

  const recipeList =
    recipes &&
    recipes.length > 0 &&
    recipes.map((recipe) => {
      const {
        id,
        title,
        description,
        country,
        main_image,
        categories,
        is_active,
      } = recipe;
      const flag = getFlag(country);

      return (
        <Boxes
          key={id}
          id={id}
          image={main_image}
          title={title}
          desc={description}
          country={country}
          categories={categories}
          flag={flag}
          is_active={is_active}
        />
      );
    });

  if (loading) {
    return (
      <main className="flex justify-center items-center">
        <Loading />
      </main>
    );
  }

  return (
    <main className="flex flex-col w-full max-w-6xl mx-auto my-3">
      <CategoriesSlider />
      {error && <Error error={error} />}

      {recipes && recipes.length > 0 ? (
        <>
          <h2 className="text-sky-950 font-bold text-3xl my-6 text-center">
            {categoryName} Recipes
          </h2>
          <div className="grid grid-cols-boxes gap-4 mb-6 w-full">
            {recipeList}
          </div>
        </>
      ) : (
        <h2 className="text-sky-950 font-bold text-3xl my-6 text-center">
          No recipes found for {categoryName}
        </h2>
      )}
    </main>
  );
}
