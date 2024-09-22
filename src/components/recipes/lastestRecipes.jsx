import { Boxes } from "./Boxes.jsx";
import { useGetRecipes } from "../../hooks/useGetRecipes.js";
import { Link } from "react-router-dom";
import { useGetCountries } from "../../hooks/useCountries.js";
import { Loading } from "../Loading.jsx";
import { Error } from "../Error.jsx";

export function LastestRecipes() {
  const { getAllRecipes, loading, error } = useGetRecipes();
  const recipes = getAllRecipes();
  const { getFlag } = useGetCountries();

  const listOfRecipes =
    recipes &&
    recipes.length > 0 &&
    recipes
      .map((recipe) => {
        const {
          id,
          title,
          description,
          country,
          main_image,
          categories,
          username,
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
          />
        );
      })
      .reverse()
      .slice(0, 4);

  if (loading) {
    return (
      <h2 className="text-sky-950 font-medium text-3xl my-6 text-center">
        <Loading />
      </h2>
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
    <section className="relative flex flex-col justify-center items-center w-full">
      <h2 className="text-sky-950 font-bold text-3xl mb-6">Latest Recipes</h2>
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
        See all recipes
      </Link>
    </section>
  );
}
