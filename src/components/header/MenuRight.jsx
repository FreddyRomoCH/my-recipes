import { Search } from "../search/Search";
import { useAuth } from "../../hooks/useAuth.js";
import { Navs } from "./Navs.jsx";
// import { translateText } from "../../services/api/translate.js";
// import { useState } from "react";

export function MenuRight({ profileAvatar }) {
  const { isAuthenticated, handleLogout } = useAuth();
  // const [translatedText, setTranslatedText] = useState("Log out");

  // const handleTranslate = async () => {
  //   const translated = await translateText("Log out", "es"); // Translate to Spanish
  //   setTranslatedText(translated || "Log out");
  // };

  return (
    <>
      <Search />

      {/* <li
        onClick={handleTranslate}
        className="group font-medium italic py-3 text-lg"
      >
        Translate
      </li> */}

      {!isAuthenticated && (
        <>
          <Navs href="/sign-in" title="Sign In" key="sign-in" />
          <Navs href="/register" title="Register" key="register" />
        </>
      )}

      {isAuthenticated && (
        <>
          <li className="group font-medium italic py-3 text-lg">
            {/* <button onClick={handleLogout}>{translatedText}</button> */}
            <button onClick={handleLogout}>Log out</button>
          </li>
          {profileAvatar}
        </>
      )}
    </>
  );
}
