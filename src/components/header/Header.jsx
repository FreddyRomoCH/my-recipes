import { RecipesLogo } from "./RecipesLogo.jsx";
import { Navs } from "./Navs.jsx";
import { Search } from "../search/Search.jsx";
import { useAuth } from "../../hooks/useAuth.js";
import { Link } from "react-router-dom";
import { DB_URL } from "../../utils/constant.js";
import { ProtectedRoute } from "../../ProtectedRoute.jsx";

export function Header() {
  const { isAuthenticated, userDetails, handleLogout } = useAuth();

  const profile_picture =
    userDetails &&
    (userDetails.profile_picture === "" || userDetails.profile_picture === null)
      ? "/images/profile.jpg"
      : `${DB_URL}/uploads/${userDetails?.profile_picture}`;

  return (
    <>
      <header className="flex flex-col justify-center content-center items-center relative w-screen p-4 text-sky-950 text-sm bg-gradient-to-b from-sky-100 to-sky-200">
        <div className="container flex flex-row flex-wrap justify-around items-center content-center max-w-6xl">
          <nav className="flex-1">
            <ul className="relative flex flex-row justify-center gap-5 items-center">
              <Navs href="recipes" title="By Recipes" id="all-recipes" />
              <Navs href="/country" title="By Country" id="by-country" />
              <Navs href="/category/all" title="By Category" id="by-category" />

              {isAuthenticated && (
                <ProtectedRoute>
                  <Navs
                    href="/add-recipe"
                    title="Add Recipe"
                    key="add-recipe"
                  />
                </ProtectedRoute>
              )}
            </ul>
          </nav>

          <RecipesLogo />

          <nav className="flex-1">
            <ul className="relative flex flex-row justify-center gap-5 items-center">
              <Search />
              {!isAuthenticated ? (
                <>
                  <Navs href="/sign-in" title="Sign In" key="sign-in" />
                  <Navs href="/register" title="Register" key="register" />
                </>
              ) : (
                <li className="group font-medium italic py-3 text-lg">
                  <button onClick={handleLogout}>Log out</button>
                </li>
              )}

              {isAuthenticated && (
                <Link to="/profile">
                  <picture>
                    <img
                      className="rounded-full w-12 h-12 object-cover"
                      src={profile_picture}
                      alt={`Profile ${userDetails?.username} `}
                    />
                  </picture>
                </Link>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
