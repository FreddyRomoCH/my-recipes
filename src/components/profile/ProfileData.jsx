import { formatDate } from "../../utils/date.js";
import { useTranslation } from "react-i18next";

export function ProfileData({ userDetails, handleUpdate, btn_text }) {
  const { t } = useTranslation();

  return (
    <>
      <button
        className="rounded-md bg-button hover:bg-hover px-5 py-2 text-base text-md font-inter"
        onClick={handleUpdate}
      >
        {btn_text}
      </button>
      <h1 className="text-2xl font-normal font-inter text-secondary-text">{`${userDetails?.first_name} ${userDetails?.last_name}`}</h1>
      <p className="text-xl text-secondary-text font-inter font-normal">
        {t("Username")}:{" "}
        <span className="text-button font-lora">{userDetails?.username}</span>
      </p>
      <p className="text-xl text-secondary-text font-inter font-normal">
        Email:{" "}
        <span className="text-button font-lora">{userDetails?.email}</span>
      </p>
      <p className="text-xl text-secondary-text font-inter font-normal">
        {t("Account created")}:{" "}
        <span className="text-button font-lora">
          {formatDate(userDetails?.created_at)}
        </span>
      </p>
    </>
  );
}
