import { useEffect, useId, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { APP_STATUS } from "../../utils/constant";
import { useForm } from "react-hook-form";
import Input from "../form/Input";
import { ButtonForm } from "../form/ButtonForm";
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
      toast.error("Please add an ingredient");
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
      toast.error("Please add an instruction");
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
    formState: { errors, isSubmitting },
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

        const { id, title } = response.data[0];

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
    "flex-1 border-2 focus:ring-0 focus:outline-none rounded-md p-2 w-full resize-y formSizingContent";
  const inputError = "border-red-500 hover:border-red-500 focus:border-red-500";
  const inputSuccess =
    "border-sky-900 hover:border-sky-500 focus:border-sky-500";

  const boxInput = "bg-sky-100 p-2 rounded-md";

  return (
    <main className="flex flex-col w-full max-w-6xl mx-auto my-3">
      <header className="mb-2">
        {formStatus === APP_STATUS.IDLE && (
          <h2 className="text-sky-950 font-bold text-3xl mb-6">
            Add your new recipe
          </h2>
        )}

        {formStatus === APP_STATUS.PENDING && <h1>Loading...</h1>}
      </header>

      <section className="relative flex flex-col justify-center items-center w-full">
        <form
          className="grid grid-cols-2 gap-5 mb-2"
          encType="multipart/form-data"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={`col-span-full ${boxInput}`}>
            <Input
              label="Title"
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
              label="Description"
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
              label="Recipe image"
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
            <label htmlFor={servingsId}>Servings</label>
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
              <span className="text-sm font-thin text-red-500">
                {errors.servings.message}
              </span>
            )}
          </div>

          <div className={`${boxInput}`}>
            <FormControl fullWidth>
              <InputLabel id={prepTimeId}>Preparation Time</InputLabel>
              <Select
                labelId={prepTimeId}
                id={prepTimeId}
                value={prep_time}
                label="Preparation Time"
                {...register("prep_time")}
                onChange={handleChangePrepTime}
              >
                <MenuItem value="Less than 10m">Less than 10m</MenuItem>
                <MenuItem value="15m">15m</MenuItem>
                <MenuItem value="30m">30m</MenuItem>
                <MenuItem value="45m">45m</MenuItem>
                <MenuItem value="1h">1h</MenuItem>
                <MenuItem value="1h 15m">1h 15m</MenuItem>
                <MenuItem value="1h 30m">1h 30m</MenuItem>
                <MenuItem value="1h 45m">1h 45m</MenuItem>
                <MenuItem value="2h">2h</MenuItem>
                <MenuItem value="More than 2h">More than 2h</MenuItem>
              </Select>
            </FormControl>

            {errors.prep_time && (
              <span className="text-sm font-thin text-red-500">
                {errors.prep_time.message}
              </span>
            )}
          </div>

          <div className={`${boxInput}`}>
            <FormControl fullWidth>
              <InputLabel id={countryId}>Country</InputLabel>
              <Select
                labelId={countryId}
                id={countryId}
                value={country}
                label="Country"
                {...register("country")}
                onChange={handleChangeCountry}
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
              <span className="text-sm font-thin text-red-500">
                {errors.country.message}
              </span>
            )}
          </div>

          <div className={`col-span-full ${boxInput}`}>
            {loading && <h2>Loading categories...</h2>}
            {error && <h2>Error getting categories: {error}</h2>}
            {listCategories.length > 0 ? (
              <>
                <h3>Categories</h3>
                {listCategories.map((category) => {
                  const { name, id } = category;

                  return (
                    <FormControlLabel
                      key={id}
                      control={<Checkbox value={id} />}
                      label={name}
                      {...register("categories")}
                    />
                  );
                })}
              </>
            ) : (
              <p>No categories to select</p>
            )}

            {errors.categories && (
              <span className="text-sm font-thin text-red-500">
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
            btnText={isSubmitting ? "Loading..." : "Add Recipe"}
            error={errors.root}
            disabled={isSubmitting}
            type="submit"
            className="rounded-md bg-sky-950 px-5 py-2 text-sky-200 text-md"
          />
        </form>
      </section>
    </main>
  );
}
