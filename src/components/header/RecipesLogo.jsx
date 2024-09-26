import { Link } from "react-router-dom";
import RecipesLogoSVG from "../../assets/icons/logo.svg";

export function RecipesLogo({ linkTo, widthLogo }) {
  return (
    <picture>
      <Link to={linkTo}>
        <img
          className={`${widthLogo} shadow-lg shadow-sky-700 rounded-full`}
          src={RecipesLogoSVG}
          alt="Recipe Logo"
        />
      </Link>
    </picture>
  );
}
