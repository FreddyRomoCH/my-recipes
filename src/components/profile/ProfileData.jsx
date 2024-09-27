import { formatDate } from "../../utils/date.js";

export function ProfileData({ userDetails, handleUpdate, btn_text }) {
  return (
    <>
      <button
        className="rounded-md bg-sky-950 px-5 py-2 text-sky-200 text-md"
        onClick={handleUpdate}
      >
        {btn_text}
      </button>
      <h1 className="text-2xl font-semibold">{`${userDetails?.first_name} ${userDetails?.last_name}`}</h1>
      <p>Username: {userDetails?.username}</p>
      <p>Email: {userDetails?.email}</p>
      <p>Account created: {formatDate(userDetails?.created_at)}</p>
    </>
  );
}
