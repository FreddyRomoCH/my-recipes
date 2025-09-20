import { useRef, useEffect, useContext } from "react";
import { SearchContext } from "../context/searchContext";
import i18next from "i18next";

export function useValidateSearch() {
  const { search, setSearch } = useContext(SearchContext);
  const isFirstSearch = useRef(true);

  useEffect(() => {
    if (isFirstSearch.current || search.send === true) {
      isFirstSearch.current = search.search === "";
      return;
    }

    if (search.search === "") {
      setSearch(prevState => ({
        ...prevState,
        error: i18next.t("We need a search term")
      }))
      return;
    }

    if (search.search.match(/^\d+$/)) {
      setSearch(prevState => ({
        ...prevState,
        error: i18next.t("No numbers allowed")
      }))
      return;
    }

    if (search.search.length > 20) {
      setSearch(prevState => ({
        ...prevState,
        error: i18next.t("Search is too long")
      }))
      return;
    }

    if (search.search.length < 3) {
      setSearch(prevState => ({
        ...prevState,
        error: i18next.t("Search is too short")
      }))
      return;
    }

    setSearch(prevState => {
      return {
        ...prevState,
        error: null
      }
    })

  }, [search.search, setSearch]);

  return { search, setSearch, isFirstSearch };
}
