import { useTranslation } from "react-i18next";

export function SingleIngredients({ ingredients }) {
  const { t } = useTranslation();
  const listOfIngredients =
    ingredients &&
    ingredients.map((ingredient, index) => {
      return <li key={`ingredient-${index}`}>- {ingredient}</li>;
    });

  return (
    <ul className="shrink flex flex-col gap-4 bg-sky-950 text-sky-100 p-4 box-border rounded font-thin">
      <li>
        <span className="font-semibold text-lg">{t("ingredients")}:</span>
      </li>
      {listOfIngredients ? (
        listOfIngredients
      ) : (
        <li>{t("No ingredients added yet")}</li>
      )}
    </ul>
  );
}
