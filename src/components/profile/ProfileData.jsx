import { formatDate } from "../../utils/date.js";
import { useTranslation } from "react-i18next";

export function ProfileData({ userDetails, handleUpdate, btn_text }) {
  const { t } = useTranslation();

  return (
    <>
      <button
        className="rounded-md bg-sky-950 px-5 py-2 text-sky-200 text-md"
        onClick={handleUpdate}
      >
        {btn_text}
      </button>
      <h1 className="text-2xl font-semibold">{`${userDetails?.first_name} ${userDetails?.last_name}`}</h1>
      <p>
        {t("Username")}: {userDetails?.username}
      </p>
      <p>Email: {userDetails?.email}</p>
      <p>
        {t("Account created")}: {formatDate(userDetails?.created_at)}
      </p>
    </>
  );
}
