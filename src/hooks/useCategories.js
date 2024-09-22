import { useState, useEffect } from "react";

import { categoriesList } from "../services/api/categories.js";

export function useCategories() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [listCategories, setListCategories] = useState([]);
  
    useEffect(() => {
      setLoading(true);
      setError(null);

      const fetchCategories = async () => {
        try {
          const result = await categoriesList()
          const { categories } = result;

          if (result.error) {
            setError(result.error);
          }
  
          const allCategories = categories.map((category) => {
            return category;
          });
      
          setListCategories([...allCategories]);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      }

      fetchCategories();
      
    }, []);

    const getCategories = () => {
      if (listCategories.length === 0) {
        return [];
      }

      return listCategories;
    }
  
    return { getCategories, loading, error };
  } 