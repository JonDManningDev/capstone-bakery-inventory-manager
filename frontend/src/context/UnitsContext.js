import { createContext, useContext, useState, useEffect } from "react";

import { useAlerts } from "./AlertsContext";

const UnitsContext = createContext();

export function UnitsProvider({ children }) {
  const [units, setUnits] = useState([]);
  const [conversions, setConversions] = useState([]);

  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const { addAlert } = useAlerts();

  async function getConversions() {
    try {
      const response = await fetch(`${baseUrl}/units/conversions`);

      if (!response.ok) {
        const json = await response.json();
        throw new Error(
          response.error ||
            "There was an error in the server response for GET /units/conversions"
        );
      }

      const json = await response.json();
      const unitConversions = json.data;

      return setConversions(unitConversions);
    } catch (error) {
        addAlert(error.message, "danger", "getConversions-failure");
        console.error(error);
    }
  }

  async function getUnits() {
    try {
      const response = await fetch(`${baseUrl}/units`);

      if (!response.ok) {
        const json = await response.json();
        throw new Error(
          json.error ||
            "There was an error in the server response for GET /units"
        );
      }
      const json = await response.json();
      const unitsRecords = json.data;

      return setUnits(unitsRecords);
    } catch (error) {
      addAlert(error.message, "danger", "getUnits-failure");
      console.error(error);
    }
  }

  // Load the units and conversion table on startup
  useEffect(() => {
    getUnits();
    getConversions();
  }, []);

  return (
    <UnitsContext.Provider value={{ units, getUnits, conversions, getConversions }}>
      {children}
    </UnitsContext.Provider>
  );
}

export function useUnits() {
  return useContext(UnitsContext);
}
