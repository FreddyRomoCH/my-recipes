import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useId, useState } from "react";
import { useGetCountries } from "../../hooks/useCountries.js";
import { useGetRecipes } from "../../hooks/useGetRecipes.js";
import { Boxes } from "./Boxes.jsx";
import { Loading } from "../Loading.jsx";
import { Error } from "../Error.jsx";

export function Countries() {
  const { getAllCountries, getFlag, loadingCountries, errorCountries } =
    useGetCountries();
  const { getRecipesByCountry, loading, error } = useGetRecipes();
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("");
  const [recipes, setRecipes] = useState([]);
  const countryId = useId();

  const flag = getFlag({ country });

  useEffect(() => {
    setCountries(getAllCountries);
  }, [getAllCountries]);

  useEffect(() => {
    if (country) {
      const recipesByCountry = getRecipesByCountry(country);
      setRecipes(recipesByCountry);
    }
  }, [country, getRecipesByCountry]);

  const handleChangeCountry = (event) => {
    const selectedCountry = event.target.value;
    setCountry(selectedCountry);
  };

  const renderRecipes =
    recipes.length === 0 && country ? (
      <p className="bg-sky-950 text-sky-100 text-lg font-light p-2 rounded">
        {flag} - {country} has no recipes to show yet
      </p>
    ) : (
      recipes.map((recipe) => {
        const { id, title, description, country, main_image, categories } =
          recipe;

        return (
          <Boxes
            key={id}
            id={id}
            image={main_image}
            title={title}
            desc={description}
            country={country}
            categories={categories}
            flag={flag}
          />
        );
      })
    );

  const boxInput = "bg-sky-100 p-2 rounded-md";

  if (loadingCountries) {
    return (
      <main className="relative max-w-6xl mx-auto w-full">
        <Loading textLoaded="Loading countries..." />
      </main>
    );
  }

  if (errorCountries) {
    return (
      <main className="relative max-w-6xl mx-auto w-full">
        <Error error={errorCountries} />
      </main>
    );
  }

  return (
    <main className="relative max-w-6xl mx-auto w-full">
      {
        <>
          <label
            className="text-sky-950 font-medium text-3xl my-6 text-center"
            htmlFor={countryId}
          >
            Select a country
          </label>

          <div className={`${boxInput} my-3`}>
            <FormControl fullWidth>
              <InputLabel id={countryId}>Country</InputLabel>
              <Select
                labelId={countryId}
                id={countryId}
                value={country}
                label="Country"
                onChange={handleChangeCountry}
              >
                {countries &&
                  countries.map(({ name }) => (
                    <MenuItem value={name} key={name}>
                      {name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div>

          {loading && <Loading textLoaded="Loading recipes..." />}

          {error ? (
            <Error error={error} />
          ) : (
            <div className="grid grid-cols-boxes gap-4 mb-6 w-full">
              {renderRecipes}
            </div>
          )}
        </>
      }
    </main>
  );
}
