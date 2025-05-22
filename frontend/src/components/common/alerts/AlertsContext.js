import { createContext, useContext, useState } from "react";

const AlertsContext = createContext();

export function AlertsProvider({ children }) {
    const [alerts, setAlerts] = useState([]);

    function addAlert(message, variant = "info") {
        const id = Date.now();
        const newAlert = { id, message, variant };
        setAlerts((current) => [...current, newAlert]);
    };

    function removeAlert(idToRemove) {
        setAlerts((current) => current.filter((alert) => alert.id !== idToRemove));
    };

    return (
        <AlertsContext.Provider value={{ alerts, addAlert, removeAlert }}>
            {children}
        </AlertsContext.Provider>
    );
};

export function useAlerts() {
    return useContext(AlertsContext);
}