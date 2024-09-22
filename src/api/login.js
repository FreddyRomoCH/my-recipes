import { DB_URL } from "../utils/constant";

export const apiLoginUser = async (loginDetails) => {
  try {
    const response = await fetch(`${DB_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginDetails),
      credentials: "include",
    });

    // Check JSON response
    const result = await response.json().catch(() => {
      return { error: "Invalid JSON response" };
    });

    if (response.status === 400) {
      // toast.error(result.error);
      return { error: result.error };
    }

    if (response.status === 404) {
      // toast.error(result.error);
      return { error: result.error};
    }

    if (response.status === 500) {
      return { error: result.error };
    }

    if (response.status === 200) {
      return { success: `User ${result.username} logged in successfully`, data: result };
    }
  } catch (error) {
    return { error: "Login Error. Try again later" };
  }
};
