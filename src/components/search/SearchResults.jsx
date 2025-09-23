import { useSearchRecipes } from "../../hooks/useSearchRecipes.js";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function SearchResults({ search, setSearch }) {
  const { recipes } = useSearchRecipes({ search });
  const { t } = useTranslation();

  const handleClickMenu = () => {
    setSearch((prevState) => ({
      ...prevState,
      search: "",
      error: null,
      send: true,
    }));
  };

  return (
    <div className="results absolute top-14 z-40 w-full bg-button text-gray-200 rounded p-3">
      <ul className="flex flex-col justify-start gap-1">
        {recipes.length === 0 ? (
          <li>{t("No results found")}</li>
        ) : (
          recipes
            .filter((recipe) => recipe.is_active)
            .map((recipe) => {
              const { id, title } = recipe;

              return (
                <li key={recipe.id} className="hover:bg-hover">
                  <Link
                    to={`/recipes/${id}/${title
                      .toLocaleLowerCase()
                      .replace(/\s+/g, "-")}`}
                    onClick={() => handleClickMenu()}
                  >
                    {title}
                  </Link>
                </li>
              );
            })
            .slice(0, 10)
        )}
      </ul>
    </div>
  );
}
