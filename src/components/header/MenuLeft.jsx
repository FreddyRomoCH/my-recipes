import { useMediaQuery } from "react-responsive";
import { ProtectedRoute } from "../../ProtectedRoute";
import { useAuth } from "../../hooks/useAuth.js";
import { Navs } from "./Navs.jsx";

export function MenuLeft() {
  const { isAuthenticated, handleLogout, userDetails } = useAuth();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <>
      <Navs href="/recipes" title="By Recipes" id="all-recipes" />
      <Navs href="/country" title="By Country" id="by-country" />
      <Navs href="/category/all" title="By Category" id="by-category" />

      {isAuthenticated && (
        <ProtectedRoute>
          <Navs href="/add-recipe" title="Add Recipe" key="add-recipe" />
        </ProtectedRoute>
      )}

      {isMobile && !isAuthenticated && (
        <>
          <Navs href="/sign-in" title="Sign In" key="sign-in" />
          <Navs href="/register" title="Register" key="register" />
        </>
      )}

      {isMobile && isAuthenticated && (
        <li className="group font-medium italic py-3 text-lg">
          <button onClick={handleLogout}>Log Out</button>
        </li>
      )}

      {isAuthenticated && isMobile && userDetails.is_admin === 1 && (
        <Navs href="/admin" title="Admin" key="admin" />
      )}
    </>
  );
}
