// This context file loads and provides the units and conversions data from the 'units' table and 'conversions' table.

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

import { useAlerts } from "./AlertsContext";

const UnitsContext = createContext();
const baseUrl = process.env.REACT_APP_API_BASE_URL;

export function UnitsProvider({ children }) {
  const [units, setUnits] = useState([]);
  const [conversions, setConversions] = useState([]);

  const { addAlert } = useAlerts();

  const getConversions = useCallback(async ({ signal } = {}) => {
    const response = await fetch(`${baseUrl}/units/conversions`, { signal });

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
  }, []);

  const getUnits = useCallback(async ({ signal } = {}) => {
    const response = await fetch(`${baseUrl}/units`, { signal });

    if (!response.ok) {
      const json = await response.json();
      throw new Error(
        json.error || "There was an error in the server response for GET /units"
      );
    }

    const json = await response.json();
    const unitsRecords = json.data;

    return unitsRecords;
  }, []);

  // Load the conversions table on startup
  useEffect(() => {
    const abortController = new AbortController();
    async function loadConversions() {
      try {
        const conversions = await getConversions({
          signal: abortController.signal,
        });
        setConversions(conversions);
      } catch (error) {
        if (error.name === "AbortError") return;
        addAlert(
          `Failed to load conversions table: ${error.message}!`,
          "danger",
          "getConversions-failure"
        );
        console.error("Failed to load conversions table:", error.message);
      }
    }
    loadConversions();
    return () => abortController.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getConversions, addAlert]);

  // Load the units on startup
  useEffect(() => {
    const abortController = new AbortController();
    async function loadUnits() {
      try {
        const units = await getUnits({ signal: abortController.signal });
        setUnits(units);
      } catch (error) {
        if (error.name === "AbortError") return;
        addAlert(
          `Failed to load units: ${error.message}!`,
          "danger",
          "getUnits-failure"
        );
        console.error("Failed to load units:", error.message);
      }
    }
    loadUnits();
    return () => abortController.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getUnits, addAlert]);

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
