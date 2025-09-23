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
      <h2 className="title-section">
        <Error error={error} />
      </h2>
    );
  }

  return (
    <>
      <section className="relative flex flex-col justify-center items-center w-full">
        <h2 className="text-button font-medium text-3xl my-8 font-lora">
          {t("NewestRecipes")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-(--grid-cols-boxes) gap-4 mb-6 w-full px-2.5 md:p-0">
          {recipes && recipes.length > 0 ? (
            listOfRecipes
          ) : (
            <p>No recipes have been added yet</p>
          )}
        </div>
      </section>

      <Link
        to="/recipes"
        className="text-xl font-normal bg-button text-base p-4 hover:bg-hover text-center w-60 m-auto rounded-2xl my-5"
      >
        {t("AllRecipes")}
      </Link>
    </>
  );
}
