import { Fragment } from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { API_URL } from "../../utils/config";

export function RecipesAdmin({
  thCss,
  tableCss,
  onClickAccept,
  onClickDeactivate,
  onClickDelete,
  openModal,
  recipes,
}) {
  return (
    <section className="grid grid-cols-5 justify-center w-full font-light bg-sky-100">
      <div className={`${thCss}`}>Recipe</div>
      <div className={`${thCss}`}>Image</div>
      <div className={`${thCss}`}>User</div>
      <div className={`${thCss}`}>Created At</div>
      <div className={`${thCss}`}>Action</div>

      {Array.isArray(recipes) &&
        recipes.length > 0 &&
        recipes.map((recipe) => {
          const { id, title, main_image, username, created_at, is_active } =
            recipe;

          const formattedDate = format(
            new Date(created_at),
            "dd/MM/yyyy HH:mm"
          );
          return (
            <Fragment key={id}>
              <div className={`${tableCss}`}>
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
                    src={`${API_URL}/uploads/${main_image}`}
                    alt={`Cover ${title}`}
                  />
                </picture>
              </div>
              <div className={`${tableCss}`}>{username}</div>
              <div className={`${tableCss}`}>{formattedDate}</div>
              <div
                className={`${tableCss} flex flex-row justify-center gap-2 items-start content-center`}
              >
                {is_active ? (
                  <>
                    <button
                      onClick={() =>
                        openModal(
                          onClickDeactivate,
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
                      onClick={onClickDelete}
                      className="bg-red-500 hover:bg-red-700 text-sky-100 rounded-lg p-2"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() =>
                        openModal(
                          onClickAccept,
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
  );
}
