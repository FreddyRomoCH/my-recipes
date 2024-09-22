import { useSearchRecipes } from "../../hooks/useSearchRecipes.js";
import { Link } from "react-router-dom";

export function SearchResults({ search, setSearch }) {
  const { recipes } = useSearchRecipes({ search });

  const handleClickMenu = () => {
    setSearch((prevState) => ({
      ...prevState,
      search: "",
      error: null,
      send: true,
    }));
  };

  return (
    <div className="results absolute top-14 z-40 w-full bg-sky-100 rounded p-3">
      <ul className="flex flex-col justify-start gap-1">
        {recipes.length === 0 ? (
          <li>No results found</li>
        ) : (
          recipes
            .map((recipe) => {
              const { id, title } = recipe;

              return (
                <li key={recipe.id}>
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
