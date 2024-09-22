import { useEffect, useMemo, useState } from "react";
import { countriesList } from "../services/api/countries.js";

export function useGetCountries() {
    const [loadingCountries, setLoadingCountries] = useState(false);
    const [errorCountries, setErrorCountries] = useState(null);
    const [listAllCountries, setListAllCountries] = useState([]);
  
    useEffect(() => {
      setLoadingCountries(true);
      setErrorCountries(null);

      try {
        if (!countriesList || countriesList.length === 0) {
          errorCountries('No countries found');
        }
        setListAllCountries(countriesList);
      } catch (error) {
        setErrorCountries(error.message);
      } finally {
        setLoadingCountries(false);
      }
    }, []);

    // We use useMemo to avoid unnecessary re-renders since the list of countries is static
    const getAllCountries = useMemo(() => {
      return listAllCountries
    }, [listAllCountries])
    
    const getFlag = ({ country }) => {
      if (!country) return null
      const data = listAllCountries.find(c => c.name === country)
      if (!data) return null;
      const { flag } = data;
      return flag ? flag : null
    }
  
    return { getAllCountries, getFlag, loadingCountries, errorCountries };
  } 