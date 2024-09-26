import { Search } from "../search/Search";
import { useAuth } from "../../hooks/useAuth.js";
import { Navs } from "./Navs.jsx";

export function MenuRight({ profileAvatar }) {
  const { isAuthenticated, handleLogout } = useAuth();

  return (
    <>
      <Search />

      {!isAuthenticated && (
        <>
          <Navs href="/sign-in" title="Sign In" key="sign-in" />
          <Navs href="/register" title="Register" key="register" />
        </>
      )}

      {isAuthenticated && (
        <>
          <li className="group font-medium italic py-3 text-lg">
            <button onClick={handleLogout}>Log out</button>
          </li>
          {profileAvatar}
        </>
      )}
    </>
  );
}
