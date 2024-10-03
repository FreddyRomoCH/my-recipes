import { useGetRecipes } from "../../hooks/useGetRecipes.js";
import { Loading } from "../Loading.jsx";
import { Error } from "../Error.jsx";
import { DB_URL } from "../../utils/constant";
import { format } from "date-fns";
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "./Modal.jsx";
import { acceptedRecipe, deactivateRecipe } from "../../api/admin.js";
import { toast } from "sonner";

export function Admin() {
  const { fetchRecipes, getAllRecipes, loading, error } = useGetRecipes();
  const [recipes, setRecipes] = useState([]);
  const [modalAction, setModalAction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    setRecipes(getAllRecipes());
  }, [getAllRecipes]);

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

  const thCss = "font-semibold text-lg mb-5 border-sky-950 border-b-2 py-2";
  const tableCss = "border-sky-950 border-b-2 py-2";

  return (
    <main className="flex- flex-col justify-between items-center gap-3 py-3">
      <header>
        <h1 className="text-sky-950 font-bold text-3xl mb-6">Admin</h1>
      </header>

      <section className="grid grid-cols-5 justify-center w-full font-light bg-sky-100">
        <div className={thCss}>Recipe</div>
        <div className={thCss}>Image</div>
        <div className={thCss}>User</div>
        <div className={thCss}>Created At</div>
        <div className={thCss}>Action</div>

        {recipes.map((recipe) => {
          const { id, title, main_image, username, created_at, is_active } =
            recipe;
          const formattedDate = format(
            new Date(created_at),
            "dd/MM/yyyy HH:mm"
          );
          return (
            <Fragment key={id}>
              <div className={tableCss}>
                <Link
                  target="_blank"
                  to={`/recipes/${id}/${title
                    .toLowerCase()
                    .replace(/\s/g, "-")}`}
                >
                  {title}
                </Link>
              </div>
              <div className={`${tableCss} flex justify-center`}>
                <picture>
                  <img
                    className="w-28 h-28 object-cover"
                    src={`${DB_URL}/uploads/${main_image}`}
                    alt={`Cover ${title}`}
                  />
                </picture>
              </div>
              <div className={tableCss}>{username}</div>
              <div className={tableCss}>{formattedDate}</div>
              <div
                className={`${tableCss} flex flex-row justify-center gap-2 items-start content-center`}
              >
                {is_active ? (
                  <>
                    <button
                      onClick={() =>
                        openModal(
                          handleDeactivateRecipe,
                          id,
                          "Are you sure you want to deactivate this recipe?"
                        )
                      }
                      className="bg-gray-500 hover:bg-gray-700 text-sky-50 rounded-lg p-2"
                    >
                      Deactivate
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleDeleteRecipe}
                      className="bg-red-500 hover:bg-red-700 text-sky-100 rounded-lg p-2"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() =>
                        openModal(
                          handleAcceptRecipe,
                          id,
                          "Are you sure you want to accept this recipe?"
                        )
                      }
                      className="bg-green-800 hover:bg-green-950 text-sky-100 rounded-lg p-2"
                    >
                      Accept
                    </button>
                  </>
                )}
              </div>
            </Fragment>
          );
        })}

        <div className="col-span-5 text-center mt-3">
          {/* TODO: Implement the logic to load more recipes */}
          <button className="bg-sky-950 hover:bg-sky-700 text-sky-100 rounded-lg p-2">
            Load More
          </button>
        </div>
      </section>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmAction}
        message={selectedMessage}
      />
    </main>
  );
}
