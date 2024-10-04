import { useGetRecipes } from "../../hooks/useGetRecipes.js";
import { useUser } from "../../hooks/useUser.js";
import { Loading } from "../Loading.jsx";
import { Error } from "../Error.jsx";
import { useEffect, useState } from "react";
import { Modal } from "./Modal.jsx";
import { acceptedRecipe, deactivateRecipe } from "../../api/admin.js";
import { toast } from "sonner";
import { RecipesAdmin } from "./RecipesAdmin.jsx";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { UsersAdmin } from "./UsersAdmin.jsx";

export function Admin() {
  const { fetchRecipes, getAllRecipes, loading, error } = useGetRecipes();
  const { getUsers } = useUser();
  const [recipes, setRecipes] = useState([]);
  const [users, setUsers] = useState([]);
  const [modalAction, setModalAction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [selectedRadio, setSelectedRadio] = useState("radioRecipes");
  const [adminState, setAdminState] = useState({
    isShowing: "recipes",
  });

  useEffect(() => {
    setRecipes(getAllRecipes());
  }, [getAllRecipes, adminState.isShowing]);

  useEffect(() => {
    setUsers(getUsers());
  }, [getUsers, adminState.isShowing]);

  if (loading) {
    return (
      <h2 className="text-sky-950 font-medium text-3xl my-6 text-center">
        <Loading />
      </h2>
    );
  }

  if (error) {
    return (
      <h2 className="text-sky-950 font-medium text-3xl my-6 text-center">
        <Error error={error} />
      </h2>
    );
  }

  const openModal = (action, id, message) => {
    setModalAction(() => () => action({ id }));
    setSelectedId(id);
    setIsModalOpen(true);
    setSelectedMessage(message);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalAction(null);
    setSelectedId(null);
    setSelectedMessage(null);
  };

  const confirmAction = () => {
    if (modalAction) modalAction(selectedId);
    closeModal();
  };

  const handleAcceptRecipe = async ({ id }) => {
    const response = await acceptedRecipe(id);

    if (response && !response.error) {
      toast.success(response.success);
      setRecipes(fetchRecipes());
    } else {
      toast.error(response.error);
    }
  };

  const handleDeactivateRecipe = async ({ id }) => {
    const response = await deactivateRecipe(id);

    if (response && !response.error) {
      toast.success(response.success);
      setRecipes(fetchRecipes());
    } else {
      toast.error(response.error);
    }
  };

  const handleDeleteRecipe = () => {
    console.log("Delete recipe");
    //TODO: Implement the logic to delete a recipe
  };

  const handleRadioChange = (event) => {
    const { value } = event.target;
    setSelectedRadio(value);

    if (value === "radioRecipes") {
      setAdminState((prevState) => {
        return {
          ...prevState,
          isShowing: "recipes",
        };
      });
      setRecipes(recipes);
    }

    if (value === "radioUsers") {
      setAdminState((prevState) => {
        return {
          ...prevState,
          isShowing: "users",
        };
      });
      setRecipes(users);
    }
  };

  const thCss = "font-semibold text-lg mb-5 border-sky-950 border-b-2 py-2";
  const tableCss = "border-sky-950 border-b-2 py-2 col-span-1";

  return (
    <main className="flex flex-col justify-start items-center gap-3 py-3">
      <header>
        <h1 className="text-sky-950 font-bold text-3xl mb-6">Admin</h1>
        <div>
          <FormControl>
            <RadioGroup
              defaultValue="radioRecipes"
              name="radio-buttons-group"
              value={selectedRadio}
              onChange={handleRadioChange}
            >
              <FormControlLabel
                value="radioRecipes"
                control={<Radio />}
                label="Recipes"
              />
              <FormControlLabel
                value="radioUsers"
                control={<Radio />}
                label="Users"
              />
            </RadioGroup>
          </FormControl>
        </div>
      </header>

      {adminState.isShowing === "recipes" && (
        <RecipesAdmin
          thCss={thCss}
          tableCss={tableCss}
          onClickDeactivate={handleDeactivateRecipe}
          onClickAccept={handleAcceptRecipe}
          onClickDelete={handleDeleteRecipe}
          openModal={openModal}
          recipes={recipes}
        />
      )}

      {adminState.isShowing === "users" && (
        <UsersAdmin thCss={thCss} tableCss={tableCss} users={users} />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmAction}
        message={selectedMessage}
      />
    </main>
  );
}
