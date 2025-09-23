import { useMediaQuery } from "react-responsive";
import { ProtectedRoute } from "../../ProtectedRoute";
import { useAuth } from "../../hooks/useAuth.js";
import { Navs } from "./Navs.jsx";
import { useTranslation } from "react-i18next";

export function MenuLeft() {
  const { isAuthenticated, handleLogout, userDetails } = useAuth();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const { t } = useTranslation();

  return (
    <>
      <Navs href="/recipes" title={t("ByRecipes")} id="all-recipes" />
      <Navs href="/country" title={t("ByCountry")} id="by-country" />
      <Navs href="/category/all" title={t("ByCategory")} id="by-category" />

      {isAuthenticated && (
        <ProtectedRoute>
          <Navs href="/add-recipe" title={t("AddRecipes")} key="add-recipe" />
        </ProtectedRoute>
      )}

      {isMobile && !isAuthenticated && (
        <>
          <Navs href="/sign-in" title={t("SignIn")} key="sign-in" />
          <Navs href="/register" title={t("Register")} key="register" />
        </>
      )}

      {isMobile && isAuthenticated && (
        <li className="group font-light font-lora py-3 text-lg">
          <button onClick={handleLogout}>{t("LogOut")}</button>
        </li>
      )}

      {isAuthenticated && isMobile && userDetails.is_admin && (
        <Navs href="/admin" title="Admin" key="admin" />
      )}
    </>
  );
}
