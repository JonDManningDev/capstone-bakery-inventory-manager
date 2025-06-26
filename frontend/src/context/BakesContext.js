import { createContext, useContext, useState } from "react";

const BakesContext = createContext();

export function BakesProvider({ children }) {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  const [bakes, setBakes] = useState([]);

  async function createBake(recipeId, employeeId) {
      const response = await fetch(`${baseUrl}/bakes`, {
        method: "POST",
        body: JSON.stringify({
          data: {
            recipe_id: recipeId,
            employee_id: employeeId,
            status: "started",
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

      const json = await response.json();
      const newBakeRecord = json.data;
      return newBakeRecord;      
  }

  async function getBakes() {
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

      return bakesRecords;
  }

  async function updateBakeStatus(bakeId, newStatus) {
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
  }

  return (
    <BakesContext.Provider
      value={{ bakes, createBake, getBakes, setBakes, updateBakeStatus }}
    >
      {children}
    </BakesContext.Provider>
  );
}

export function useBakes() {
  return useContext(BakesContext);
}
