// import { Debugger } from "../Debugger.jsx";
// import { IS_DEVELOPMENT } from "../../utils/config.js";

export function Footer() {
  return (
    <footer className="relative w-full mx-auto flex flex-col items-center bg-sky-950 text-sky-100 p-6">
      {/* {IS_DEVELOPMENT && <Debugger />} */}
      <nav>
        <ul className="font-light text-lg flex flex-row gap-3 justify-center items-center">
          <li>Web Page built by Freddy Romo - 2024</li>
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
