import { Link } from "react-router-dom";
import { SingleImage } from "./SingleImage";

export function SingleInfoRecipe({
  categories,
  title,
  user_id,
  username,
  servings,
  prep_time,
  country,
  description,
  image,
}) {
  const categoriesList =
    categories &&
    categories.map((category) => {
      return (
        <li key={category} className="font-thin text-sm">
          <Link to={`/category/${category.toLowerCase().replace(/\s/g, "-")}`}>
            {category}
          </Link>
        </li>
      );
    });

  return (
    <>
      <h2 className="text-sky-950 font-bold text-3xl text-center">{title}</h2>
      <ul className="flex flex-row gap-2">{categoriesList}</ul>

      <h4 className="text-slate-950 font-light">
        Posted by{" "}
        <Link
          className="bg-blue-900 text-sky-100 px-2 py-1 rounded-xl"
          to={"/recipes"}
          state={{
            user_id: user_id,
          }}
        >
          {username}
        </Link>
      </h4>

      <SingleImage country={country} image={image} title={title} />

      <section className="information rounded bg-sky-100 text-sky-950 w-full mb-4 p-4">
        <p className="text-base font-medium mb-4">{description}</p>
        <ul className="flex flex-row justify-around gap-2 flex-wrap items-center">
          <li>
            <strong>Servings:</strong> {servings}
          </li>
          <li>
            <strong>Prep Time:</strong> {prep_time}
          </li>
          <li>
            <strong>Country:</strong> {country}
          </li>
        </ul>
      </section>
    </>
  );
}
