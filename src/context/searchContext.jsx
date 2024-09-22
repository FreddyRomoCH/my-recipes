import { createContext, useState } from "react";

//Create context
export const SearchContext = createContext();

//Create Provider
export function SearchProvider({ children }) {
  const [search, setSearch] = useState({
    search: "",
    error: null,
    send: false,
  });

  return (
    <SearchContext.Provider
      value={{
        search,
        setSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
