import { useId } from "react";

export function ProfilePictureInput({ title, registerInput, errors }) {
  const profilePicture = useId();

  return (
    <>
      <div className="flex flex-col gap-2 items-center justify-center col-span-2">
        <label className="flex-1" htmlFor={profilePicture}>
          {title}
        </label>
        <input
          className={`flex-1 border-2  focus:ring-0 focus:outline-none rounded-md p-2 w-52
          ${
            errors
              ? "border-red-500 hover:border-red-500 focus:border-red-500"
              : "border-sky-900 hover:border-sky-500 focus:border-sky-500"
          }`}
          type="file"
          id={profilePicture}
          name="profile_picture"
          {...registerInput}
          accept="image/jpeg, image/jpg, image/png, image/webp"
        />
        {errors && (
          <span className="text-sm font-thin text-red-500">
            {errors.message}
          </span>
        )}
      </div>
    </>
  );
}
