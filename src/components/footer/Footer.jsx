import { useTranslation } from "react-i18next";
// import { Debugger } from "../Debugger.jsx";
// import { IS_DEVELOPMENT } from "../../utils/config.js";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="relative w-full mx-auto flex flex-col items-center bg-base text-button p-6 text-lg font-inter">
      {/* {IS_DEVELOPMENT && <Debugger />} */}
      <nav>
        <ul className="font-light text-lg flex flex-row gap-3 justify-center items-center">
          <li>{t("Web Page built by")} Freddy Romo - 2024</li>
          <li>
            <a href="https://www.freddyromo.dev/" target="_blank">
              <img
                src="/freddy-romo-dev-logo.svg"
                alt="www.freddyromo.dev"
                className="w-16 h-auto"
              />
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
