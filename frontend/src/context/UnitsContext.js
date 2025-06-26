import { createContext, useContext, useState, useEffect } from "react";

import { useAlerts } from "./AlertsContext";

const UnitsContext = createContext();

export function UnitsProvider({ children }) {
  const [units, setUnits] = useState([]);
  const [conversions, setConversions] = useState([]);

  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const { addAlert } = useAlerts();

  async function getConversions() {
    const response = await fetch(`${baseUrl}/units/conversions`);

    if (!response.ok) {
      const json = await response.json();
      throw new Error(
        json.error ||
          "There was an error in the server response for GET /units/conversions"
      );
    }

    const json = await response.json();
    const unitConversions = json.data;

    return unitConversions;
  }

  async function getUnits() {
    const response = await fetch(`${baseUrl}/units`);

    if (!response.ok) {
      const json = await response.json();
      throw new Error(
        json.error || "There was an error in the server response for GET /units"
      );
    }

    const json = await response.json();
    const unitsRecords = json.data;

    return unitsRecords;
  }

  // Load the conversions table on startup
  useEffect(() => {
    async function loadConversions() {
      try {
        const conversions = await getConversions();
        setConversions(conversions);
      } catch (error) {
        addAlert(
          `Failed to load conversions table: ${error.message}!`,
          "danger",
          "getConversions-failure"
        );
        console.error("Failed to load conversions table:", error.message);
      }
    }
    loadConversions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load the units on startup
  useEffect(() => {
    async function loadUnits() {
      try {
        const units = await getUnits();
        setUnits(units);
      } catch (error) {
        addAlert(
          `Failed to load units: ${error.message}!`,
          "danger",
          "getUnits-failure"
        );
        console.error("Failed to load units:", error.message);
      }
    }
    loadUnits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UnitsContext.Provider
      value={{ conversions, getConversions, getUnits, units }}
    >
      {children}
    </UnitsContext.Provider>
  );
}

export function useUnits() {
  return useContext(UnitsContext);
}
