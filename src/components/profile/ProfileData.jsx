import { formatDate } from "../../utils/date.js";
import { useTranslation } from "react-i18next";

export function ProfileData({ userDetails, handleUpdate, btn_text }) {
  const { t } = useTranslation();

  return (
    <>
      <button
        className="rounded-md bg-button hover:bg-hover px-5 py-2 text-base text-md font-inter cursor-pointer"
        onClick={handleUpdate}
      >
        {btn_text}
      </button>
      <h1 className="text-2xl font-normal font-inter text-secondary-text mb-3">{`${userDetails?.first_name} ${userDetails?.last_name}`}</h1>

      <div className="flex flex-col md:flex-row justify-between items-center gap-2 w-4/5">
        <div className="flex flex-col justify-center items-center gap-1">
          <p className="text-normal text-secondary-text font-inter font-normal">
            {t("Username")}:{" "}
          </p>
          <span className="text-button font-lora">{userDetails?.username}</span>
        </div>

        <div className="flex flex-col justify-center items-center gap-1">
          <p className="text-normal text-secondary-text font-inter font-normal">
            Email:{" "}
          </p>
          <span className="text-button font-lora">{userDetails?.email}</span>
        </div>

        <div className="flex flex-col justify-center items-center gap-1">
          <p className="text-normal text-secondary-text font-inter font-normal">
            {t("Account created")}:{" "}
          </p>
          <span className="text-button font-lora">
            {formatDate(userDetails?.created_at)}
          </span>
        </div>
      </div>
    </>
  );
}
