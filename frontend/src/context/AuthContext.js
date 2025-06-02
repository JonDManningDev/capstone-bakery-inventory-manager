// This context file provides login/logout logic and the user state wherever needed in the app.
// It also contains the useEffect() that automatically logs a returning user back in.

import { createContext, useContext, useState, useEffect } from "react";

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

  useEffect(() => {
    console.log(user);
  }, [user]);

  // Automatically logs in on app load if a valid token is present in localStorage.
  useEffect(() => {
    autoLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-login with guest credentials for demo purposes
  useEffect(() => {
    const token = localStorage.getItem("token");
    const attemptGuestLogin = setTimeout(() => {
      if (!token) {
        const guestCredentials = {
          email: "guest@notreal.net",
          password: "guest123",
        };
        login(guestCredentials);
        addAlert("You have been logged in as Guest for demonstration purposes.", "info", "attemptGuestLogin-success");
      }
    }, 1000); // Delay to ensure autoLogin completes first

    return () => {
      clearTimeout(attemptGuestLogin);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function autoLogin() {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        const userFromToken = await getUser(token);
        setUser(userFromToken);
        setAlerts((current) =>
          current.filter((alert) => alert.type !== "no-login")
        );
        addAlert("Logged in with existing user token!", "success", "login-success");
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

      console.error(error);
    }
  }
  async function getLoginToken(formData) {
    try {
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
      console.error(error);
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

      addAlert("Successfully logged in!", "success", "login-success");
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

      console.error("Login error:", error);
    }
  }
  async function getUser(token) {
    try {
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

      return userFromToken;
    } catch (error) {
      addAlert(error.message, "danger", "getUser-failure");
      console.error(error);
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
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
