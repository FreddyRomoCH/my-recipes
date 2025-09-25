import { Link, useParams } from "react-router-dom";
import { useGetRecipes } from "../../hooks/useGetRecipes.js";
import { useGetCountries } from "../../hooks/useCountries.js";
import { Boxes } from "../recipes/Boxes.jsx";
import { useEffect, useState } from "react";
import { CategoriesSlider } from "../slider/CategoriesSlider.jsx";
import { Loading } from "../Loading.jsx";
import { Error } from "../Error.jsx";
import { useTranslation } from "react-i18next";
import { UtensilsIcon } from "../recipes/UtensilsIcon.jsx";

export function SingleCategory() {
  const [recipes, setRecipes] = useState([]);
  const { category } = useParams();
  const { t } = useTranslation();

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
    recipes
      .filter((recipe) => recipe.is_active)
      .map((recipe) => {
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
          <h2 className="title-section">
            {categoryName === "All"
              ? t("All Recipes")
              : t("Category Recipes", { category: t(categoryName) })}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-(--grid-cols-boxes) gap-4 mb-6 w-full px-2.5 md:p-0">
            {recipeList}
          </div>
        </>
      ) : (
        <h2 className="flex flex-col justify-center items-center gap-3 bg-card border border-chip p-5 rounded-lg w-max-xl md:w-xl m-auto mt-5">
          <UtensilsIcon widthLogo="w-12" color="text-button" fill="#713B1C" />
          <p className="text-button text-md font-inter font-light">
            {t("No recipes found for", { category: t(categoryName) })}
          </p>
          <Link
            to="/recipes"
            className="text-sm font-light font-inter bg-button text-base px-4 py-2 hover:bg-hover text-center m-auto rounded-lg"
          >
            {t("AllRecipes")}
          </Link>
        </h2>
      )}
    </main>
  );
}
