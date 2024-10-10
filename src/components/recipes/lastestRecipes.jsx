import { Boxes } from "./Boxes.jsx";
import { useGetRecipes } from "../../hooks/useGetRecipes.js";
import { Link } from "react-router-dom";
import { useGetCountries } from "../../hooks/useCountries.js";
import { Error } from "../Error.jsx";
import { useTranslation } from "react-i18next";

export function LastestRecipes() {
  const { getAllRecipes, error } = useGetRecipes();
  const recipes = getAllRecipes();
  const { getFlag } = useGetCountries();
  const { t } = useTranslation();

  const listOfRecipes =
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
          username,
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
            username={username}
            is_active={is_active}
          />
        );
      })
      .slice(0, 4);

  if (error) {
    return (
      <h2 className="text-sky-950 font-medium text-3xl my-6 text-center">
        <Error error={error} />
      </h2>
    );
  }

  return (
    <section className="relative flex flex-col justify-center items-center w-full">
      <h2 className="text-sky-950 font-bold text-3xl mb-6">
        {t("LatestRecipes")}
      </h2>
      <div className="grid grid-cols-boxes gap-4 mb-6 w-full">
        {recipes && recipes.length > 0 ? (
          listOfRecipes
        ) : (
          <p>No recipes have been added yet</p>
        )}
      </div>

      <Link
        to="/recipes"
        className="text-xl font-normal uppercase bg-sky-800 text-sky-100 w-full p-6 hover:bg-sky-950 text-center"
      >
        {t("AllRecipes")}
      </Link>
    </section>
  );
}
