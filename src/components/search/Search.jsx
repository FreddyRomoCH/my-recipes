import { SearchResults } from "./SearchResults.jsx";
import { useValidateSearch } from "../../hooks/useValidateSearch.js";

export function Search() {
  const { search, setSearch } = useValidateSearch();

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
          placeholder="Pizza, Beef, Chicken, etc."
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
