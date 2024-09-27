import { DB_URL } from "../utils/constant";

export const apiLoginUser = async (loginDetails) => {
  
  return await fetch(`${DB_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginDetails),
        credentials: "include",
    })
    .then(response => {
      if (!response.ok) {
        return { error: "Login Error. Try again later" }
      }

      return response.json()
    })
    .then(result => {
      if (result.error) {
        return { error: result.error }
      }

      return { success: `User ${result.username} logged in successfully`, data: result };
    })
};
