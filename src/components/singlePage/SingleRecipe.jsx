import { useParams } from "react-router-dom";
import { useGetRecipes } from "../../hooks/useGetRecipes.js";
import { Loading } from "../Loading.jsx";
import { SingleInfoRecipe } from "./SingleInfoRecipe.jsx";
import { SingleIngredients } from "./SingleIngredients.jsx";
import { SingleInstructions } from "./SingleInstructions.jsx";
import { Error } from "../Error.jsx";

export function SingleRecipe() {
  const { id } = useParams();
  const { getSingleRecipe, loading, error } = useGetRecipes();
  const recipe = getSingleRecipe({ id });

  if (loading) {
    return (
      <h2 className="flex justify-center items-center">
        <Loading />
      </h2>
    );
  }

  if (error) {
    return <Error error={error} />;
  }

  if (!recipe) {
    return null;
  }

  const {
    title,
    description,
    main_image: image,
    country,
    categories,
    servings,
    prep_time,
    ingredients,
    instructions,
    username,
    user_id,
  } = recipe;

  return (
    <main className="relative max-w-6xl my-3 mx-auto w-full">
      <div
        key={id}
        className="flex flex-col justify-center items-center w-full px-2 md:px-0 content-center mx-auto gap-3"
      >
        <SingleInfoRecipe
          categories={categories}
          title={title}
          user_id={user_id}
          username={username}
          servings={servings}
          prep_time={prep_time}
          country={country}
          description={description}
          image={image}
        />

        <section className="preparation rounded-2xl bg-chip text-secondary-text w-full mb-4 p-4">
          <div className="information flex flex-col md:flex-row justify-center gap-6">
            <SingleIngredients ingredients={ingredients} />

            <SingleInstructions instructions={instructions} />
          </div>
        </section>
      </div>
    </main>
  );
}
