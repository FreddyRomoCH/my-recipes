import { useGetRecipes } from "../../hooks/useGetRecipes.js";
import { Boxes } from "./Boxes.jsx";
import { useGetCountries } from "../../hooks/useCountries.js";
import { Loading } from "../Loading.jsx";
import { Error } from "../Error.jsx";

export function AllRecipes() {
  const { getAllRecipes, loading, error } = useGetRecipes();
  const recipes = getAllRecipes();
  const { getFlag } = useGetCountries();

  const recipesList =
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
    });

  if (loading) {
    return (
      <main className="flex justify-center items-center">
        <Loading />
      </main>
    );
  }

  if (error) {
    return (
      <h2 className="text-sky-950 font-medium text-3xl my-6 text-center">
        <Error error={error} />
      </h2>
    );
  }

  return (
    <main className="relative max-w-6xl mx-auto w-full">
      <>
        <h2 className="text-sky-950 font-bold text-3xl my-6 text-center">
          All Recipes
        </h2>
        <div className="grid grid-cols-boxes gap-4 mb-6 w-full">
          {recipesList}
        </div>
      </>
    </main>
  );
}
