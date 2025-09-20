import { Link } from "react-router-dom";
import { SingleImage } from "./SingleImage";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const categoriesList =
    categories &&
    categories.map((category) => {
      return (
        <li key={category} className="font-thin text-sm">
          <Link to={`/category/${category.toLowerCase().replace(/\s/g, "-")}`}>
            {t(category)}
          </Link>
        </li>
      );
    });

  // Helper function to format minutes as "X hr Y min"
  function formatPrepTime(minutes) {
    if (minutes < 60) return `${minutes} min.`;
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins === 0
      ? `${hrs} hr${hrs > 1 ? "s" : ""}`
      : `${hrs} hr${hrs > 1 ? "s" : ""} ${mins} min.`;
  }

  const noCountry = "No specific";

  return (
    <>
      <h2 className="text-sky-950 font-bold text-3xl text-center">{title}</h2>
      <ul className="flex flex-row gap-2">{categoriesList}</ul>

      <h4 className="text-slate-950 font-light">
        {t("Posted by")}{" "}
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
            <strong>{t("Servings")}:</strong> {servings}
          </li>
          <li>
            <strong>{t("Preparation Time")}:</strong>{" "}
            {formatPrepTime(prep_time)}
          </li>
          <li>
            <strong>{t("Country")}:</strong>{" "}
            {country === "No specific country" ? t(noCountry) : t(country)}
          </li>
        </ul>
      </section>
    </>
  );
}
