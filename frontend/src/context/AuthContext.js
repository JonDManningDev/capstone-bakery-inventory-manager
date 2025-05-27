// This context file provides login/logout logic and the user state wherever needed in the app.
// It also contains the useEffect() that automatically logs a returning user back in.

import { createContext, useContext, useState, useEffect } from "react";

import { loginWithToken } from "../utils/loginWithToken";
import { useAlerts } from "./AlertsContext";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // User state
  const [user, setUser] = useState({
    employeeId: null,
    firstName: "Guest",
    lastName: null,
    email: null,
  });

  // Pull in the ability to add in and filter out alerts for a clear user signal of login/logout.
  const { addAlert, setAlerts } = useAlerts();

  // Show a welcome alert if the user has not logged in
  useEffect(() => {
    if (!user.employeeId) {
      addAlert(
        `Welcome, ${user.firstName}! Please log in or register to properly track bakes.`,
        "warning",
        "no-login"
      );
    }
    // The following line silences the warning that addAlert hasn't been added as a dependency (including addAlert causes the effect to loop infinitely)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.employeeId, user.firstName]);

  // Automatically logs in on app load if a valid token is present in localStorage.
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      loginWithToken(token, setUser, addAlert, setAlerts);
      setAlerts((current) =>
        current.filter((alert) => alert.type !== "no-login")
      );
      addAlert("Successfully logged in!", "success", "login-success");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Manual logins
  async function login(token) {
    localStorage.setItem("token", token);
    await loginWithToken(token, setUser, addAlert, setAlerts);
    setAlerts((current) =>
      current.filter((alert) => alert.type !== "no-login")
    );
    addAlert("Successfully logged in!", "success", "login-success");
  }

  // Logouts
  function logout() {
    localStorage.removeItem("token");
    setUser({
      employeeId: null,
      firstName: "Guest",
      lastName: null,
      email: null,
    });
    setAlerts((current) =>
      current.filter((alert) => alert.type !== "login-success")
    );
    addAlert("You have successfully logged out.", "info", "logout-success");
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
