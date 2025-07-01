// This context file provides alert management logic for the app.

import { createContext, useContext, useState, useCallback } from "react";

const AlertsContext = createContext();

export function AlertsProvider({ children }) {
  const [alerts, setAlerts] = useState([]);

  const addAlert = useCallback((message, variant = "info", type) => {
    // Generate a random id to keep each alert unique
    const id = crypto.randomUUID();
    const newAlert = { id, message, variant, type };
    setAlerts((current) => [...current, newAlert]);
  }, []);

  const removeAlert = useCallback((idToRemove) => {
    setAlerts((current) => current.filter((alert) => alert.id !== idToRemove));
  }, []);
  return (
    <AlertsContext.Provider
      value={{ addAlert, alerts, removeAlert, setAlerts }}
    >
      {children}
    </AlertsContext.Provider>
  );
}

export function useAlerts() {
  return useContext(AlertsContext);
}
