import { createContext, useContext, useState } from "react";

const AlertsContext = createContext();

export function AlertsProvider({ children }) {
  const [alerts, setAlerts] = useState([]);

  function addAlert(message, variant = "info", type) {
    // Generate a random id to keep each alert unique
    const id = crypto.randomUUID();
    const newAlert = { id, message, variant, type };
    setAlerts((current) => [...current, newAlert]);
  }

  function removeAlert(idToRemove) {
    setAlerts((current) => current.filter((alert) => alert.id !== idToRemove));
  }
  return (
    <AlertsContext.Provider
      value={{ alerts, setAlerts, addAlert, removeAlert }}
    >
      {children}
    </AlertsContext.Provider>
  );
}

export function useAlerts() {
  return useContext(AlertsContext);
}
