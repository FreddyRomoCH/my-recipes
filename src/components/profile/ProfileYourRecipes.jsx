import { useEffect, useState } from "react";
import { useGetRecipes } from "../../hooks/useGetRecipes.js";
import { useGetCountries } from "../../hooks/useCountries.js";
import { Boxes } from "../recipes/Boxes.jsx";
import { Loading } from "../Loading.jsx";
import { Error } from "../Error.jsx";
import { useTranslation } from "react-i18next";

export function ProfileYourRecipes({ userDetails }) {
  const [recipes, setRecipes] = useState([]);
  const { getRecipesByUser, loading, error } = useGetRecipes();
  const { getFlag } = useGetCountries();
  const { id } = userDetails;
  const { t } = useTranslation();

  useEffect(() => {
    if (!error || !loading) {
      const userRecipes = getRecipesByUser({ id });
      setRecipes(userRecipes);
    }
  }, [loading, error, id]);

  const sectionCSS = `flex flex-col justify-center items-center gap-3 bg-sky-200 p-4 w-full max-w-5xl rounded-lg`;

  if (loading) {
    return (
      <section className={`${sectionCSS}`}>
        <Loading textLoaded={t("Loading your recipes") + "..."} />
      </section>
    );
  }

  if (error) {
    <section className={`${sectionCSS}`}>
      <Error error={error} />
    </section>;
  }

  const renderUserRecipes =
    recipes && recipes.length > 0 ? (
      recipes.map((recipe) => {
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
    ) : (
      <p>{t("No recipes have been added yet")}</p>
    );

  return (
    <section className={`${sectionCSS}`}>
      <h2 className="text-2xl font-semibold mb-3">{t("Your Recipes")}</h2>
      <div className="grid grid-cols-boxes gap-4 mb-6 w-full">
        {renderUserRecipes}
      </div>
    </section>
  );
}
