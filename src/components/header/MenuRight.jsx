import { Search } from "../search/Search";
import { useAuth } from "../../hooks/useAuth.js";
import { Navs } from "./Navs.jsx";
import { useTranslation } from "react-i18next";

export function MenuRight({ profileAvatar }) {
  const { isAuthenticated, handleLogout, userDetails } = useAuth();
  const { t } = useTranslation();

  return (
    <>
      <Search />

      {!isAuthenticated && (
        <>
          <Navs href="/sign-in" title={t("SignIn")} key="sign-in" />
          <Navs href="/register" title={t("Register")} key="register" />
        </>
      )}

      {isAuthenticated && (
        <>
          {userDetails.is_admin && (
            <Navs href="/admin" title="Admin" key="admin" />
          )}

          <li className="group font-medium italic py-3 text-lg">
            <button onClick={handleLogout}>{t("LogOut")}</button>
          </li>
          {profileAvatar}
        </>
      )}
    </>
  );
}
