import { useContext, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import { DB_URL } from "../utils/constant";
import { toast } from "sonner";
import { apiLoginUser } from "../api/login.js";
import { apiRegisterUser } from "../api/register.js";
import { useNavigate } from "react-router-dom";
import { apiUpdateUser } from "../api/update.js";

export const useAuth = () => {
  const { isAuthenticated, login, logout, setUserDetails, userDetails } = useContext(AuthContext);
  const navigate = useNavigate();

  // loginUser(setUserDetails)

  const loginUser = async (loginDetails) => {
    const result = await apiLoginUser(loginDetails)

    if (result.error) {
      toast.error(result.error)
      return
    }

    if (result.success) {
      toast.success(result.success)
      setUserDetails(result.data);
      login();
    }
  };

  const registerUser = async (registerDetails) => {
    const result = await apiRegisterUser(registerDetails)

    if (result.error) {
      toast.error(result.error)
      console.log('Register error:', result.error)
      return
    }

    if (result.message === "success") {
      toast.success("User registered successfully");
      navigate("/sign-in", { state: { email: result.email, password: result.password } });
    }
  };

  const updateUser = async (updateDetails) => {
    const result = await apiUpdateUser(updateDetails)
 
    if (result.error) {
      return { error: result.error }
    }

    return { success: result.message, data: result.data }
  }

  const handleLogout = async () => {
    const response = await fetch(`${DB_URL}/users/logout`, {
      method: "POST",
      credentials: "include",
    });
    const result = await response.json();

    if (response.status === 500) {
      toast.error(result.message)
      return;
    }

    toast.success(result.message)
    logout();
  };

  const restoreSession = async () => {
    try {
      const response = await fetch(`${DB_URL}/users/verify-token`, {
        method: "POST",
        credentials: "include", // Include cookies in the request
        headers: {
          "Content-Type": "application/json"
        }
      });
      const result = await response.json();
  
      if (result.success) {
        setUserDetails(result.data);
        login();
      } 
    } catch (error) {
      toast.error("Error trying to restore session");
    }
  };

  useEffect(() => {
    restoreSession();
  }, [])

  return { isAuthenticated, login, logout, handleLogout, registerUser, updateUser, loginUser, userDetails, setUserDetails };
};
