import { useAuth } from "../../hooks/useAuth.js";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { HeaderMobile } from "./HeaderMobile.jsx";
import { HeaderDesktop } from "./HeaderDesktop.jsx";
import { useUser } from "../../hooks/useUser.js";

export function Header() {
  const isDesktop = useMediaQuery({ minWidth: 768 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const { restoreSession, userDetails } = useAuth();
  const { getUserImage } = useUser();

  const profile_picture = getUserImage();

  useEffect(() => {
    restoreSession();
  }, []);

  const profileAvatar = () => {
    return (
      <Link to="/profile">
        <picture>
          <img
            className="rounded-full w-12 h-12 object-cover"
            src={profile_picture}
            alt={`Profile ${userDetails?.username} `}
          />
        </picture>
      </Link>
    );
  };

  return (
    <>
      {isDesktop && <HeaderDesktop profileAvatar={profileAvatar()} />}
      {isMobile && <HeaderMobile profileAvatar={profileAvatar()} />}
    </>
  );
}
