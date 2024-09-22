import { createContext, useState } from "react";
// import Cookies from "js-cookie";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  // const [loginError, setLoginError] = useState(null);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUserDetails(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        setUserDetails,
        userDetails,
        // loginError,
        // setLoginError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
