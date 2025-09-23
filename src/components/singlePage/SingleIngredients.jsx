import { useTranslation } from "react-i18next";

export function SingleIngredients({ ingredients }) {
  const { t } = useTranslation();
  const listOfIngredients =
    ingredients &&
    ingredients.map((ingredient, index) => {
      return (
        <li key={`ingredient-${index}`} className="font-inter">
          - {ingredient}
        </li>
      );
    });

  return (
    <ul className="shrink flex flex-col gap-4 bg-button text-base p-4 box-border rounded font-thin">
      <li>
        <span className="font-medium text-2xl font-lora text-base">
          {t("ingredients")}:
        </span>
      </li>
      {listOfIngredients ? (
        listOfIngredients
      ) : (
        <li>{t("No ingredients added yet")}</li>
      )}
    </ul>
  );
}
