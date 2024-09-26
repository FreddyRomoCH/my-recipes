import { useAuth } from "../../hooks/useAuth.js";
import { Link } from "react-router-dom";
import { DB_URL } from "../../utils/constant.js";
import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { HeaderMobile } from "./HeaderMobile.jsx";
import { HeaderDesktop } from "./HeaderDesktop.jsx";

export function Header() {
  const isDesktop = useMediaQuery({ minWidth: 768 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const { userDetails, restoreSession } = useAuth();

  useEffect(() => {
    restoreSession();
  }, []);

  const profile_picture =
    userDetails &&
    (userDetails.profile_picture === "" || userDetails.profile_picture === null)
      ? "/images/profile.jpg"
      : `${DB_URL}/uploads/${userDetails?.profile_picture}`;

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
