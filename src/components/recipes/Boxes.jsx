import { Link } from "react-router-dom";
import { DB_URL } from "../../utils/constant";

export function Boxes({
  title,
  desc,
  image,
  id,
  flag,
  categories,
  username,
  is_active,
}) {
  return (
    <div
      key={id}
      className={`box w-full relative flex flex-col justify-center shadow-sm shadow-sky-950 rounded-lg group overflow-hidden ${
        !is_active && "opacity-50"
      }`}
    >
      <div className="relative h-40 overflow-hidden">
        <div className="absolute z-10 top-[-100%] left-0 bg-sky-800/75 w-full flex flex-row flex-nowrap items-center justify-between px-1 group-hover:top-0 transition-[top] duration-500 ease-out">
          <p className="text-3xl">{flag}</p>
          <ul className="flex flex-row justify-end gap-2">
            {categories.map((category) => {
              return (
                <li key={category} className="text-sm">
                  <Link
                    to={`/category/${category
                      .toLowerCase()
                      .replace(/\s/g, "-")}`}
                  >
                    <span className=" font-thin text-sky-100 italic">
                      {category}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <picture>
          <img
            src={`${DB_URL}/uploads/${image}`}
            alt={`Cover ${title}`}
            className="absolute object-cover top-0 left-0 w-full h-full group-hover:scale-110 transition-transform duration-500 ease-in-out"
          />
        </picture>
      </div>

      <div className="flex flex-col justify-between items-center p-4 gap-2 h-64 bg-white">
        <h4 className="text-2xl text-sky-950 italic">{title}</h4>
        <p className="text-sky-950 font-thin line-clamp text-sm italic">
          {desc}
        </p>

        {!is_active ? (
          <p className="bg-gray-600 rounded text-sky-100 p-2 font-thin">
            Waiting admin's activation
          </p>
        ) : (
          <Link
            to={`/recipes/${id}/${title.toLowerCase().replace(/\s/g, "-")}`}
            className="bg-sky-800 text-sky-100 rounded-md p-2 hover:bg-sky-950"
          >
            Read More
          </Link>
        )}

        {username && (
          <p className="text-sky-950 font-thin">Posted By: {username}</p>
        )}
      </div>
    </div>
  );
}
