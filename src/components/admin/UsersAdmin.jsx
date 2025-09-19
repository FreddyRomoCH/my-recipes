import { format } from "date-fns";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../utils/config";

export function UsersAdmin({ thCss, tableCss, users }) {
  return (
    <section className="grid grid-cols-4 justify-center w-full font-light bg-sky-100">
      <div className={`${thCss}`}>Profile Picture</div>
      <div className={`${thCss}`}>Username</div>
      <div className={`${thCss}`}>User Info</div>
      <div className={`${thCss}`}>Created At</div>
      {/* <div className={`${thCss}`}>Action</div> */}

      {users.length > 0 &&
        users.map((user) => {
          const {
            id,
            first_name,
            last_name,
            username,
            email,
            created_at,
            profile_picture,
            country,
          } = user;

          const formattedDate = format(
            new Date(created_at),
            "dd/MM/yyyy HH:mm"
          );

          return (
            <Fragment key={id}>
              <div className={`${tableCss} flex justify-center`}>
                <picture>
                  <img
                    className="w-28 h-28 object-cover"
                    src={`${API_URL}/uploads/${profile_picture}`}
                    alt={`Cover ${username}`}
                  />
                </picture>
              </div>

              <div className={`${tableCss}`}>{username}</div>

              <div className={`${tableCss}`}>
                <ul className="flex flex-col justify-center items-center">
                  <li>
                    {first_name} {last_name}
                  </li>
                  <li>{country}</li>
                  <li>{email}</li>
                </ul>
              </div>

              <div className={`${tableCss}`}>{formattedDate}</div>
            </Fragment>
          );
        })}
    </section>
  );
}
