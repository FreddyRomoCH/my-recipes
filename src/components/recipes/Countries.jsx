import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useId, useState } from "react";
import { useGetCountries } from "../../hooks/useCountries.js";
import { useGetRecipes } from "../../hooks/useGetRecipes.js";
import { Boxes } from "./Boxes.jsx";
import { Loading } from "../Loading.jsx";
import { Error } from "../Error.jsx";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { UtensilsIcon } from "./UtensilsIcon.jsx";

export function Countries() {
  const { getAllCountries, getFlag, loadingCountries, errorCountries } =
    useGetCountries();
  const { getRecipesByCountry, loading, error } = useGetRecipes();
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("");
  const [recipes, setRecipes] = useState([]);
  const countryId = useId();
  const { t } = useTranslation();

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
      <div className="flex flex-col justify-center items-center gap-3 bg-card border border-chip p-5 rounded-lg w-max-xl md:w-xl m-auto">
        <UtensilsIcon widthLogo="w-12" color="text-button" fill="#713B1C" />
        <p className="text-button text-md font-inter font-light">
          {flag} - {t(country)} {t("has no recipes to show yet")}
        </p>
        <Link
          to="/recipes"
          className="text-sm font-light font-inter bg-button text-base px-4 py-2 hover:bg-hover text-center m-auto rounded-lg"
        >
          {t("AllRecipes")}
        </Link>
      </div>
    ) : (
      recipes
        .filter((recipe) => recipe.is_active)
        .map((recipe) => {
          const {
            id,
            title,
            description,
            country,
            main_image,
            categories,
            is_active,
          } = recipe;

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
              is_active={is_active}
            />
          );
        })
    );

  const boxInput = "bg-card text-button p-2 rounded-md max-w-xl m-auto";

  if (loadingCountries) {
    return (
      <main className="relative max-w-6xl mx-auto w-full">
        <Loading textLoaded={t("Loading countries...")} />
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
          <label className="title-section" htmlFor={countryId}>
            {t("Select a country")}
          </label>

          <div className={`${boxInput} my-3`}>
            <FormControl fullWidth>
              <InputLabel id={countryId}>{t("Country")}</InputLabel>
              <Select
                labelId={countryId}
                id={countryId}
                value={country}
                label="Country"
                onChange={handleChangeCountry}
              >
                {countries &&
                  countries.map(({ name }) =>
                    name === "No specific country" ? null : (
                      <MenuItem value={name} key={name}>
                        {t(name)}
                      </MenuItem>
                    )
                  )}
              </Select>
            </FormControl>
          </div>

          {loading && <Loading textLoaded="Loading recipes..." />}

          {error ? (
            <Error error={error} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-(--grid-cols-boxes) gap-4 mb-6 w-full px-2.5 md:p-0">
              {renderRecipes}
            </div>
          )}
        </>
      }
    </main>
  );
}
