import { useEffect, useId, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { APP_STATUS } from "../../utils/constant";
import { useForm } from "react-hook-form";
import Input from "../form/Input";
import ButtonForm from "../form/ButtonForm";
import {
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useGetCountries } from "../../hooks/useCountries.js";
import { useCategories } from "../../hooks/useCategories.js";
import { toast } from "sonner";
import { AddInfoInput } from "../form/AddInfoInput.jsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { addRecipeSchema } from "../../schema/recipes.js";
import { postRecipes } from "../../api/createRecipes.js";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function AddRecipes() {
  const { getCategories, loading, error } = useCategories();
  const { getAllCountries } = useGetCountries();
  const { userDetails } = useAuth();
  const [formStatus, setFormStatus] = useState(APP_STATUS.IDLE);
  const [prep_time, setPrepTime] = useState("");
  const [country, setCountry] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [ingredientInput, setIngredientInput] = useState("");
  const [instructionsInput, setInstructionsInput] = useState("");
  const servingsId = useId();
  const prepTimeId = useId();
  const countryId = useId();
  const ingredientsId = useId();
  const instructionsId = useId();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const listCategories = getCategories();

  const handleChangePrepTime = (e) => {
    setPrepTime(e.target.value);
  };

  const handleChangeCountry = (e) => {
    setCountry(e.target.value);
  };

  const handleAddIngredients = () => {
    if (ingredientInput) {
      setIngredients((prevState) => [...prevState, ingredientInput]);
      setIngredientInput("");
    } else {
      toast.error(t("Please add an ingredient"));
    }
  };

  const handleChangeIngredientsInput = (e) => {
    setIngredientInput(e.target.value);
  };

  const handleAddInstructions = () => {
    if (instructionsInput) {
      setInstructions((prevState) => [...prevState, instructionsInput]);
      setInstructionsInput("");
    } else {
      toast.error(t("Please add an instruction"));
    }
  };

  const handleChangeInstructionsInput = (e) => {
    setInstructionsInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    // e.preventDefault();

    if (e.key === "Enter") {
      e.preventDefault();

      if (e.target.name === "ingredients") {
        handleAddIngredients();
      }

      if (e.target.name === "instructions") {
        handleAddInstructions();
      }
    }
  };

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addRecipeSchema),
  });

  // Change the value of the form when the state changes
  useEffect(() => {
    setValue("ingredients", ingredients);
  }, [ingredients]);

  useEffect(() => {
    setValue("instructions", instructions);
  }, [instructions]);

  const onSubmit = (data) => {
    setFormStatus(APP_STATUS.PENDING);

    const addRecipeData = {
      ...data,
      servings: parseInt(data.servings, 10),
      prep_time: parseInt(data.prep_time, 10),
      categories: data.categories.map((category) => parseInt(category, 10)),
      ingredients: data.ingredients,
      instructions: data.instructions,
      user_id: userDetails.id,
    };

    // formData to send the data with the image
    const formData = new FormData();

    for (const key in addRecipeData) {
      if (key === "main_image") {
        formData.append(key, addRecipeData[key][0]);
      } else {
        formData.append(key, JSON.stringify(addRecipeData[key]));
      }
    }

    const fetchRecipe = async () => {
      try {
        const response = await postRecipes(formData);

        if (response.error) {
          toast.error(response.error);
          setFormStatus(APP_STATUS.ERROR);
          return;
        }

        setFormStatus(APP_STATUS.SUCCESS);
        toast.success(response.success);

        const { id } = response.data;
        const { title } = addRecipeData;

        const formattedTitle = title.toLowerCase().replace(/ /g, "-");

        navigate(`/recipes/${id}/${formattedTitle}`);

        return;
      } catch (error) {
        console.error("Error in fetchRecipe:", error);
        toast.error("Error creating recipe. Try again later.");
        setFormStatus(APP_STATUS.ERROR);
        return;
      }
    };

    fetchRecipe();
  };

  const inputCss =
    "flex-1 border-2 focus:ring-0 focus:outline-none rounded-md p-2 w-full resize-y formSizingContent bg-card";
  const inputError = "border-red-700 hover:border-red-700 focus:border-red-700";
  const inputSuccess = "border-button hover:border-hover focus:border-hover";

  const boxInput = "bg-chip p-2 rounded-md";

  return (
    <main className="flex flex-col w-full max-w-6xl mx-auto my-3">
      <header className="mb-2">
        {formStatus === APP_STATUS.IDLE && (
          <h2 className="title-section">{t("Add your new recipe")}</h2>
        )}

        {formStatus === APP_STATUS.PENDING && <h1>{t("Loading...")}</h1>}
      </header>

      <section className="relative flex flex-col justify-center items-center w-full">
        <form
          className="grid grid-cols-2 gap-5 mb-2"
          encType="multipart/form-data"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={`col-span-full ${boxInput}`}>
            <Input
              label={t("Title")}
              error={errors.title}
              className={`${inputCss}
                    ${errors.title ? `${inputError}` : `${inputSuccess}`}`}
              {...register("title")}
              type="text"
              name="title"
            />
          </div>

          <div className={`col-span-full ${boxInput}`}>
            <Input
              label={t("Description")}
              error={errors.description}
              className={`${inputCss}
                    ${
                      errors.description ? `${inputError}` : `${inputSuccess}`
                    }`}
              {...register("description")}
              type="textarea"
              name="description"
            />
          </div>

          <div className={`${boxInput}`}>
            <Input
              label={t("Recipe image")}
              error={errors.main_image}
              className={`${inputCss}
            ${errors.main_image ? `${inputError}` : `${inputSuccess}`}`}
              {...register("main_image")}
              type="file"
              name="main_image"
              accept="image/jpeg, image/jpg, image/png, image/webp"
            />
          </div>

          <div className={`${boxInput}`}>
            <label htmlFor={servingsId}>{t("Servings")}</label>
            <Slider
              aria-label={servingsId}
              defaultValue={2}
              valueLabelDisplay="auto"
              shiftStep={1}
              step={1}
              marks
              min={1}
              max={20}
              {...register("servings")}
            />

            {errors.servings && (
              <span className="text-sm font-thin text-red-700">
                {errors.servings.message}
              </span>
            )}
          </div>

          <div className={`${boxInput}`}>
            <FormControl fullWidth>
              <InputLabel id={prepTimeId}>{t("Preparation Time")}</InputLabel>
              <Select
                labelId={prepTimeId}
                id={prepTimeId}
                value={prep_time}
                label={t("Preparation Time")}
                {...register("prep_time")}
                onChange={handleChangePrepTime}
                className="bg-card"
              >
                <MenuItem value={10}>{t("Less than")} 10m</MenuItem>
                <MenuItem value={15}>15m</MenuItem>
                <MenuItem value={30}>30m</MenuItem>
                <MenuItem value={45}>45m</MenuItem>
                <MenuItem value={60}>1h</MenuItem>
                <MenuItem value={75}>1h 15m</MenuItem>
                <MenuItem value={90}>1h 30m</MenuItem>
                <MenuItem value={105}>1h 45m</MenuItem>
                <MenuItem value={120}>2h</MenuItem>
                <MenuItem value={121}>{t("More than")} 2h</MenuItem>
              </Select>
            </FormControl>

            {errors.prep_time && (
              <span className="text-sm font-thin text-red-700">
                {errors.prep_time.message}
              </span>
            )}
          </div>

          <div className={`${boxInput}`}>
            <FormControl fullWidth>
              <InputLabel id={countryId}>{t("Country")}</InputLabel>
              <Select
                labelId={countryId}
                id={countryId}
                value={country}
                label={t("Couuntry")}
                {...register("country")}
                onChange={handleChangeCountry}
                className="bg-card"
              >
                {getAllCountries &&
                  getAllCountries.map(({ name }) => (
                    <MenuItem value={name} key={name}>
                      {name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            {errors.country && (
              <span className="text-sm font-thin text-red-700">
                {errors.country.message}
              </span>
            )}
          </div>

          <div className={`col-span-full ${boxInput}`}>
            {loading && <h2>{t("Loading categories...")}</h2>}
            {error && (
              <h2>
                {t("Error getting categories")}: {error}
              </h2>
            )}
            {listCategories.length > 0 ? (
              <>
                <h3>{t("Categories")}</h3>
                {listCategories.map((category) => {
                  const { name, id } = category;

                  return (
                    <FormControlLabel
                      key={id}
                      control={<Checkbox value={id} />}
                      label={t(name)}
                      {...register("categories")}
                    />
                  );
                })}
              </>
            ) : (
              <p>{t("No categories to select")}</p>
            )}

            {errors.categories && (
              <span className="text-sm font-thin text-red-700">
                {errors.categories.message}
              </span>
            )}
          </div>

          {/* Ingredients */}
          <div className={`col-span-full ${boxInput}`}>
            <AddInfoInput
              title="ingredients"
              type={"text"}
              inputID={ingredientsId}
              valueInput={ingredientInput}
              onChange={handleChangeIngredientsInput}
              className={`${inputCss} ${
                errors.ingredients ? `${inputError}` : `${inputSuccess}`
              }`}
              error={errors}
              onClick={handleAddIngredients}
              state={ingredients}
              setState={setIngredients}
              name="ingredients"
              onKeyDown={handleKeyDown}
            />
          </div>

          {/* Instructions */}
          <div className={`col-span-full ${boxInput}`}>
            <AddInfoInput
              title="instructions"
              type="textarea"
              inputID={instructionsId}
              valueInput={instructionsInput}
              onChange={handleChangeInstructionsInput}
              className={`${inputCss} ${
                errors.instructions ? `${inputError}` : `${inputSuccess}`
              }`}
              error={errors}
              onClick={handleAddInstructions}
              state={instructions}
              setState={setInstructions}
              name="instructions"
              onKeyDown={handleKeyDown}
            />
          </div>

          {/* Categories */}

          <ButtonForm
            lastChild="true"
            btnText={
              formStatus === APP_STATUS.PENDING
                ? t("Loading...")
                : t("Add Recipe")
            }
            error={errors.root}
            type="submit"
            disabled={formStatus === APP_STATUS.PENDING}
            className="rounded-md bg-button font-inter px-5 py-2 text-base text-md"
          />
        </form>
      </section>
    </main>
  );
}
