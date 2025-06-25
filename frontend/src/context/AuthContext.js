// This context file provides login/logout logic and the user state wherever needed in the app.
// It also contains the useEffect() that automatically logs a returning user back in.

import { createContext, useContext, useState, useEffect, useRef } from "react";

import { useAlerts } from "./AlertsContext";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    employeeId: null,
    firstName: "Not Logged In",
    lastName: null,
    email: null,
  });
  const { addAlert, setAlerts } = useAlerts();
  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  // Track our automatic login attempts.
  // The app will first attempt to fetch user data if there is an existing token in localStorage.
  // If that fails, it will then attempt to log in as the Guest user and obtain its info.
  // This makes demoing the app easier, so that registering a new user is not required.
  const autoLoginAttemptedRef = useRef(false);
  const guestLoginAttemptedRef = useRef(false);

  // Attempt auto-login
  useEffect(() => {
    if (!autoLoginAttemptedRef.current) {
      autoLoginAttemptedRef.current = true;
      autoLogin().then(() => {
        // After auto-login completes, check if we need to do Guest login
        setTimeout(() => {
          const token = localStorage.getItem("token");
          if (!token && !guestLoginAttemptedRef.current) {
            guestLoginAttemptedRef.current = true;
            const guestCredentials = {
              email: "guest@notreal.net",
              password: "guest123",
            };
            login(guestCredentials);
            addAlert(
              "You have been logged in as Guest for demonstration purposes.",
              "info",
              "guest-login-success"
            );
          }
        }, 1000);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function autoLogin() {
    try {
      console.log("Attempting auto-login...");
      const token = localStorage.getItem("token");

      if (token) {
        console.log(
          "Token found in localStorage, attempting to get user data..."
        );
        const userFromToken = await getUser(token);
        setUser(userFromToken);
        setAlerts((current) =>
          current.filter((alert) => alert.type !== "no-login")
        );
        addAlert(
          "Logged in with existing user token!",
          "success",
          "login-success"
        );
        return true;
      } else {
        console.log("No token found in localStorage during auto-login");
        return false;
      }
    } catch (error) {
      // If there is an error, make sure the token gets cleaned up.
      localStorage.removeItem("token");

      // Restore user to the not-logged-in state.
      setUser({
        employeeId: null,
        firstName: "Not Logged In",
        lastName: null,
        email: null,
      });
      return false;
    }
  }

  async function getLoginToken(formData) {
    try {
      console.log(`Attempting to get login token for ${formData.email}...`);
      const response = await fetch(`${baseUrl}/employees/login`, {
        method: "POST",
        body: JSON.stringify({ data: formData }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const json = await response.json();
        throw new Error(
          json.error ||
            `Error ${response.status}: ${response.statusText} - There was an error in the server response for POST /employees/login`
        );
      }

      const json = await response.json();
      console.log("Successfully obtained login token from server!");

      localStorage.setItem("token", json.token);

      return json.token;
    } catch (error) {
      addAlert(error.message, "danger", "getLoginToken-failure");
      console.error("Error getting login token:", error);
      throw error;
    }
  }

  // Manual logins
  // This function first obtains a token, then obtains user information with the token
  async function login(formData) {
    try {
      const token = await getLoginToken(formData);
      const userFromToken = await getUser(token);

      setUser(userFromToken);

      // Clear any no-login alerts
      setAlerts((current) =>
        current.filter((alert) => alert.type !== "no-login")
      );
      if (userFromToken) {
        addAlert(
          `Successfully logged in as ${userFromToken.firstName}!`,
          "success",
          "login-success"
        );
      }

      return true;
    } catch (error) {
      // If there is an error, make sure the token gets cleaned up.
      localStorage.removeItem("token");

      // Restore user to the not-logged-in state.
      setUser({
        employeeId: null,
        firstName: "Not Logged In",
        lastName: null,
        email: null,
      });
      return false;
    }
  }

  async function getUser(token) {
    try {
      console.log("Attempting to get user data with token...");
      const response = await fetch(`${baseUrl}/employees/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const json = await response.json();
        throw new Error(
          json.error ||
            `Error ${response.status}: ${response.statusText} - There was an error in the server response for GET /employees/me`
        );
      }

      const json = await response.json();
      const userFromToken = json.data;
      console.log("Successfully retrieved user data:", userFromToken);

      return userFromToken;
    } catch (error) {
      addAlert(error.message, "danger", "getUser-failure");
      console.error("Error getting user data:", error);
      throw error;
    }
  }

  function logout() {
    localStorage.removeItem("token");
    setUser({
      employeeId: null,
      firstName: "Not Logged In",
      lastName: null,
      email: null,
    });
    setAlerts((current) =>
      current.filter((alert) => alert.type !== "login-success")
    );
    addAlert("You have successfully logged out.", "info", "logout-success");
  }

  return (
    <AuthContext.Provider value={{ user, setUser, getUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
