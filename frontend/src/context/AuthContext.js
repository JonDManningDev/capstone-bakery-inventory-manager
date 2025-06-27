// This context file provides login/logout logic and the user state wherever needed in the app.
// It also contains the useEffect() that automatically logs a returning user back in.

import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

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

  // Attempt auto-login
  // The app will first attempt to fetch user data if there is an existing, non-expired token in localStorage.
  // If that fails, it will then attempt to log in as the Guest user and obtain its info.
  // This makes demoing the app easier, so that registering a new user is not required.
  // In the case that a demo user intentionally logs out, autoLogin is then prevented by "preventAutoLogin" in sessionStorage.
  useEffect(() => {
    const token = localStorage.getItem("token");
    const preventAutoLogin = sessionStorage.getItem("preventAutoLogin");
    let expiration = null;
    if (token) {
      const { exp } = jwtDecode(token);
      expiration = exp;
    }

    const guestCredentials = {
      email: "guest@notreal.net",
      password: "guest123",
    };

    async function autoLogin() {
      // If a non-expired login token exists, attempt to get user data
      if (token && Date.now() <= expiration * 1000) {
        try {
          const userFromToken = await getUser(token);
          setUser(userFromToken);
          setAlerts((current) =>
            current.filter((alert) => alert.type !== "no-login")
          );
          addAlert(
            "Logged in with existing user token!",
            "success",
            "autoLogin-success"
          );
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

          addAlert(
            `Auto-login attempt failed: ${error.message}!`,
            "danger",
            "autoLogin-failure"
          );
          console.error("Auto-login attempt failed: ", error.message);
          return false;
        }
        // If no token is found in storage or if the token has expired, attempt to log in with guestCredentials
      } else if (!token || Date.now() >= expiration * 1000) {
        try {
          // Skip Guest login if the demo user intentionally logged out.
          if (preventAutoLogin === "true") {
            sessionStorage.removeItem("preventAutoLogin");
            return;
          }

          if (!token) {
            addAlert(
              "No previous session found. Beginning Guest login.",
              "info",
              "autoLogin-guest"
            );
          } else {
            addAlert(
              "Your previous session expired. Logging in as Guest.",
              "info",
              "autoLogin-expired"
            );
          }
          // Clear stale data
          localStorage.removeItem("token");
          setUser({
            employeeId: null,
            firstName: "Not Logged In",
            lastName: null,
            email: null,
          });
          // Fetch and apply fresh data
          const newToken = await getLoginToken(guestCredentials);
          const userFromToken = await getUser(newToken);
          setUser(userFromToken);
          addAlert(
            "Logged in as Guest for demonstration purposes.",
            "info",
            "autoLogin-success"
          );
          setAlerts((current) =>
            current.filter((alert) => alert.type !== "no-login")
          );

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

          addAlert(
            `Auto-login attempt failed: ${error.message}!`,
            "danger",
            "autoLogin-failure"
          );
          console.error("Auto-login attempt failed: ", error.message);
          return false;
        }
      }
    }
    autoLogin();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getLoginToken(credentials) {
    const response = await fetch(`${baseUrl}/employees/login`, {
      method: "POST",
      body: JSON.stringify({ data: credentials }),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const json = await response.json();
      throw new Error(
        json.error ||
          "There was an error in the server response for POST /employees/login"
      );
    }

    const json = await response.json();
    const token = json.token;
    localStorage.setItem("token", token);

    return token;
  }

  async function getUser(token) {
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
          "There was an error in the server response for GET /employees/me"
      );
    }

    const json = await response.json();
    const userFromToken = json.data;

    return userFromToken;
  }

  function logout() {
    console.log("logout has been called")
    localStorage.removeItem("token");
    console.log("Token should have been removed:", localStorage.getItem("token"));
    sessionStorage.setItem("preventAutoLogin", "true");
    setUser({
      employeeId: null,
      firstName: "Not Logged In",
      lastName: null,
      email: null,
    });
    console.log("User should be in not-logged-in state:", user);
    setAlerts((current) =>
      current.filter((alert) => alert.type !== "login-success")
    );
    addAlert("You have successfully logged out.", "info", "logout-success");
  }

  async function registerUser(formData) {
    const response = await fetch(`${baseUrl}/employees`, {
      method: "POST",
      body: JSON.stringify({
        data: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        },
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const json = response.json();
      throw new Error(
        json.error ||
          "There was an error in the server response for POST /employees"
      );
    }

    const json = await response.json();
    const token = json.token;
    localStorage.setItem("token", token);

    return token;
  }

  return (
    <AuthContext.Provider
      value={{ getUser, getLoginToken, logout, registerUser, setUser, user }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
