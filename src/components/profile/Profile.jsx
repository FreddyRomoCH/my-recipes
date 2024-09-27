import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";
import { useState, useRef, useEffect } from "react";
import { DB_URL, APP_STATUS } from "../../utils/constant.js";
import { ProfileInfo } from "./ProfileInfo.jsx";
import { ProfileYourRecipes } from "./ProfileYourRecipes.jsx";
import { ProfileYourFavorites } from "./ProfileYourFavorites.jsx";
import { useUser } from "../../hooks/useUser.js";

export function Profile() {
  const { isAuthenticated, userDetails } = useAuth();
  const [previewImage, setPreviewImage] = useState(null);
  const profileRef = useRef();
  const [appStatus, setAppStatus] = useState(APP_STATUS.IDLE);
  const { getUserImage } = useUser();

  const profile_picture = getUserImage();

  useEffect(() => {
    if (
      appStatus === APP_STATUS.EDITING &&
      profileRef.current &&
      previewImage
    ) {
      profileRef.current.src = `${previewImage}`;
      profileRef.current.value = `${previewImage}`;
    }
  }, [previewImage, appStatus]);

  const handleUpdate = () => {
    setAppStatus(APP_STATUS.EDITING);
  };

  const btn_text =
    appStatus === APP_STATUS.EDITING ? "Save Changes" : "Update Profile";

  return (
    <main className="flex flex-col justify-between items-center gap-3 my-3">
      {isAuthenticated ? (
        <>
          <ProfileInfo
            profileRef={profileRef}
            profile_picture={profile_picture}
            userDetails={userDetails}
            appStatus={appStatus}
            setAppStatus={setAppStatus}
            setPreviewImage={setPreviewImage}
            APP_STATUS={APP_STATUS}
            handleUpdate={handleUpdate}
            btn_text={btn_text}
          />

          <ProfileYourRecipes userDetails={userDetails} />

          <ProfileYourFavorites />
        </>
      ) : (
        <Navigate to="/sign-in" />
      )}
    </main>
  );
}
