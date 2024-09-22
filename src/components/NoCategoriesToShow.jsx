import { useGetRecipes } from "../hooks/useGetRecipes.js";
import { Boxes } from "./recipes/Boxes.jsx";

export function NoCategoriesToShow({ name }) {
  const { recipes } = useGetRecipes({ category: null });

  const recipeList = recipes.map((recipe) => {
    const { id, name, description, country, image, categories, flag } = recipe;

    return (
      <Boxes
        key={id}
        image={image}
        title={name}
        desc={description}
        country={country}
        categories={categories}
        flag={flag}
      />
    );
  });

  return (
    <section className="flex flex-col justify-center items-center w-full text-center">
      <h2 className="text-sky-950 font-medium text-3xl my-6 text-center">
        No recipes for <strong>{name}</strong> category
      </h2>

      <p className="mb-6">You can try these other amazing recipes instead</p>
      <div className="relative grid grid-cols-4 grid-rows-1 w-full mx-auto my-0 gap-3 mb-6">
        {recipeList}
      </div>
    </section>
  );
}
