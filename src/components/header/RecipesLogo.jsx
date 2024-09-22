import { Link } from "react-router-dom";
import RecipesLogoSVG from "../../assets/icons/logo.svg";

export function RecipesLogo() {
  return (
    <picture>
      <Link to="/">
        <img
          className="w-24 shadow-lg shadow-sky-700 rounded-full"
          src={RecipesLogoSVG}
          alt="Recipe Logo"
        />
      </Link>
    </picture>
  );
}
