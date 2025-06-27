import { createContext, useContext, useState } from "react";

const BakesContext = createContext();

export function BakesProvider({ children }) {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  const [bakes, setBakes] = useState([]);

  async function createBake(recipeId, employeeId, { signal } = {}) {
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
      signal,
    });

    const json = await response.json();
    if (!response.ok) {
      throw new Error(
        json.error ||
          "There was an error in the server response for POST /bakes"
      );
    }
    const newBake = json.data;
    return newBake;
  }

  async function getBakes({ signal } = {}) {
    const response = await fetch(`${baseUrl}/bakes`, { signal });
    const json = await response.json();
    if (!response.ok) {
      throw new Error(
        json.error || "There was an error in the server response for GET /bakes"
      );
    }
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

    const json = await response.json();
    if (!response.ok) {
      throw new Error(
        json.error ||
          "There was an error in the server response for PUT /bakes/:bakeId"
      );
    }
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
