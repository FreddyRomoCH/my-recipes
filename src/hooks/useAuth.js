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

  const loginUser = async (loginDetails) => {
    const result = await apiLoginUser(loginDetails)

    if (result.error) {
      toast.error(result.error)
      return
    }

    if (result.success) {
      setUserDetails(result.data);
      login();
      toast.success(result.success)
    }
  };

  const registerUser = async (registerDetails) => {
    const result = await apiRegisterUser(registerDetails)

    if (result.error) {
      toast.error(result.error)
      return
    }

    if (result.message === 'success') {
      toast.success('User registered successfully');
      navigate('/sign-in', { state: { email: result.email, password: result.password } });
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
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const result = await response.json();

      if (response.ok && result.success) {
        setUserDetails(result.data);
        login();
      } else if (result.error === 'Invalid token' || result.error === 'No token provided') {
        const newAccessToken = await refreshToken();

        if (newAccessToken) {
          const retryResponse = await fetch(`${DB_URL}/users/verify-token`, {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            }
          });

          const retryResult = await retryResponse.json();

          if (retryResult.success) {
            setUserDetails(retryResult.data);
            login();
          } 
        }
      }
    } catch (error) {
      // navigate('/sign-in');
      // toast.error('Error trying to restore session');
    }
  };

  const refreshToken = async () => {
    try {
      const response = await fetch(`${DB_URL}/users/refresh-token`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const result = await response.json();

      if (response.ok && result.accessToken) {
        return result.accessToken;
      }

      // toast.error('Session expired. Please log in again.');
      logout();
    } catch (error) {
      logout();
      return null;
    }
  };

  return { isAuthenticated, login, logout, handleLogout, registerUser, updateUser, loginUser, userDetails, setUserDetails, restoreSession }
}
