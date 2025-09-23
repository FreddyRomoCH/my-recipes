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
    categories.map((category, index) => {
      const isLast = index === categories.length - 1;
      return (
        <li
          key={`${category}-${index}`}
          className="font-light font-lora text-sm text-secondary-text flex items-center"
        >
          <Link to={`/category/${category.toLowerCase().replace(/\s/g, "-")}`}>
            {t(category)}
          </Link>
          {!isLast && (
            <span className="mx-2 text-secondary-text" aria-hidden>
              ·
            </span>
          )}
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
      <h2 className="title-section mb-20">{title}</h2>
      <ul className="flex flex-row gap-2 text-secondary-text">
        {categoriesList}
      </ul>

      <h4 className="text-slate-950 font-light m-3">
        {t("Posted by")}{" "}
        <Link
          className="bg-button text-base px-2 font-lora py-1 rounded-xl"
          to={"/recipes"}
          state={{
            user_id: user_id,
          }}
        >
          {username}
        </Link>
      </h4>

      <SingleImage country={country} image={image} title={title} />

      <section className="information rounded-2xl bg-chip text-secondary-text w-full mb-4 p-4">
        <p className="text-secondary-text font-inter font-medium mb-4">
          {description}
        </p>
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
