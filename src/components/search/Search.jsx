import { SearchResults } from "./SearchResults.jsx";
import { useValidateSearch } from "../../hooks/useValidateSearch.js";
import { useTranslation } from "react-i18next";

export function Search() {
  const { search, setSearch } = useValidateSearch();
  const { t } = useTranslation();

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    setSearch((preState) => ({
      ...preState,
      search: event.target.value,
      send: false,
    }));
  };

  return (
    <div className="flex flex-col relative">
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          value={search.search}
          className="rounded-md p-1 text-sky-950 border-2 border-transparent focus:border-sky-600 focus:ring-0 focus:outline-none box-border"
          name="SearchName"
          type="text"
          placeholder={t("Search")}
        />
      </form>
      {search.error && (
        <p className="text-red-500 absolute -bottom-5">{search.error}</p>
      )}
      {search.search.length > 2 && !search.error && (
        <SearchResults search={search.search} setSearch={setSearch} />
      )}
    </div>
  );
}
