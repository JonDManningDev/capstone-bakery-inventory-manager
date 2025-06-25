import { createContext, useContext, useState } from "react";

import { useAlerts } from "./AlertsContext";

const BakesContext = createContext();

export function BakesProvider({ children }) {
  const { addAlert } = useAlerts();
  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  const [bakes, setBakes] = useState([]);

  async function createBake(recipeId, employeeId, title) {
    try {
      const response = await fetch(`${baseUrl}/bakes`, {
        method: "POST",
        body: JSON.stringify({
          data: {
            recipe_id: recipeId,
            employee_id: employeeId,
            status: "started", // Using lowercase to match backend validation
          },
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const json = await response.json();
        throw new Error(
          json.error ||
            "There was an error in the server response for POST /bakes"
        );
      }

      return addAlert(
        `Successfully added new bake! User: ${employeeId}, Recipe: ${title}`,
        "success",
        "createBake-success"
      );
    } catch (error) {
      addAlert(error.message, "danger", "createBake-failure");
      console.error(error);
    }
  }
  async function getBakes() {
    try {
      const response = await fetch(`${baseUrl}/bakes`);

      if (!response.ok) {
        const json = await response.json();
        throw new Error(
          json.error ||
            "There was an error in the server response for GET /bakes"
        );
      }

      const json = await response.json();
      const bakesRecords = json.data;

      setBakes(bakesRecords);
      return bakesRecords;
    } catch (error) {
      addAlert(error.message, "danger", "getBakes-failure");
      console.error(error);
      throw error;
    }
  }

  async function updateBakeStatus(bakeId, newStatus) {
    try {
      const response = await fetch(`${baseUrl}/bakes/${bakeId}`, {
        method: "PUT",
        body: JSON.stringify({
          data: {
            status: newStatus,
            updated_at: new Date().toISOString(),
          },
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const json = await response.json();
        throw new Error(
          json.error ||
            "There was an error in the server response for PUT /bakes/:bakeId"
        );
      }

      const json = await response.json();
      const updatedBake = json.data;

      return updatedBake;
    } catch (error) {
      addAlert(error.message, "danger", "updateBakeStatus-failure");
      console.error(error);
      throw error;
    }
  }

  return (
    <BakesContext.Provider
      value={{ bakes, createBake, getBakes, updateBakeStatus }}
    >
      {children}
    </BakesContext.Provider>
  );
}

export function useBakes() {
  return useContext(BakesContext);
}
