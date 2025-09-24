import { ProfileData } from "./ProfileData";
import { UpdateProfileForm } from "./UpdateProfileForm";

export function ProfileInfo({
  profileRef,
  profile_picture,
  userDetails,
  appStatus,
  setAppStatus,
  setPreviewImage,
  APP_STATUS,
  handleUpdate,
  btn_text,
}) {
  return (
    <header className="flex flex-col justify-center items-center gap-3 bg-chip p-4 w-full max-w-5xl rounded-lg">
      <picture>
        <img
          className="rounded-full w-56 h-56 object-cover border-4 border-hover shadow-lg shadow-button"
          ref={profileRef}
          src={profile_picture}
          alt={`Profile photo from ${userDetails?.username || "User"}`}
        />
      </picture>

      {appStatus === APP_STATUS.IDLE || appStatus === APP_STATUS.SUCCESS ? (
        <ProfileData
          userDetails={userDetails}
          handleUpdate={handleUpdate}
          btn_text={btn_text} // solo se usa en modo IDLE
        />
      ) : (
        (appStatus === APP_STATUS.EDITING ||
          appStatus === APP_STATUS.ERROR) && (
          <UpdateProfileForm
            APP_STATUS={APP_STATUS}
            setAppStatus={setAppStatus}
            setPreviewImage={setPreviewImage}
            appStatus={appStatus}
          />
        )
      )}
    </header>
  );
}
