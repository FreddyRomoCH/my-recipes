import { useState } from "react";
import menuLogo from "../../assets/icons/menu.svg";
import menuCloseLogo from "../../assets/icons/menu-close.svg";
import { MenuLeft } from "./MenuLeft";
import { useAuth } from "../../hooks/useAuth.js";
import { RecipeLogo } from "./RecipeLogo.jsx";
import { Link } from "react-router-dom";

export function HeaderMobile({ profileAvatar }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleLeftMenu = () => {
    setIsMobileMenuOpen((prevState) => !prevState);
  };

  return (
    <header className="flex flex-row justify-around items-center py-4 bg-sky-950">
      <div
        className="relative flex justify-center flex-1"
        onClick={handleLeftMenu}
      >
        <picture>
          <img
            src={`${isMobileMenuOpen ? menuCloseLogo : menuLogo}`}
            alt="MENU"
          />
        </picture>
        <div
          className={`absolute z-50 left-4 top-full mt-2 rounded-sm flex flex-col bg-sky-100 list-none [&>li:not(:last-child)]:border-b [&>li:not(:last-child)]:border-sky-950 [&>li]:p-3 [&>li]:cursor-pointer transition-transform duration-300 ease-in-out transform origin-top ${
            isMobileMenuOpen ? "animate-slide-down" : "animate-slide-up"
          }`}
        >
          <MenuLeft />
        </div>
      </div>
      <div className="flex flex-1 justify-center">
        <Link to="/">
          <RecipeLogo widthLogo="w-16" color="#e0f2fe" />
        </Link>
      </div>
      <div className="flex justify-center flex-1">
        {isAuthenticated && profileAvatar}
      </div>
    </header>
  );
}
