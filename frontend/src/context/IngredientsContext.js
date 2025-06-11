import { createContext, useContext, useState } from "react";

import { useAlerts } from "./AlertsContext";

const IngredientsContext = createContext();

export function IngredientsProvider({ children }) {
  const [ingredients, setIngredients] = useState([]);
  const [ingredient, setIngredient] = useState({ recipes: [] });

  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const { addAlert } = useAlerts();

  async function getIngredientById(ingredientId) {
    try {
      const response = await fetch(`${baseUrl}/ingredients/${ingredientId}`);

      if (!response.ok) {
        const json = await response.json();
        throw new Error(
          json.error ||
            "There was an error in the server response for GET /ingredients/:ingredientId"
        );
      }

      const json = await response.json();
      const ingredientRecords = json.data;

      setIngredient(ingredientRecords);
    } catch (error) {
      addAlert(error.message, "danger", "getIngredient-failure");
      console.error(error);
    }
  }

  async function getIngredients() {
    try {
      const response = await fetch(`${baseUrl}/ingredients`);
      if (!response.ok) {
        const json = await response.json();
        throw new Error(
          json.error ||
            "There was an error in the server response for GET /ingredients"
        );
      }

      const json = await response.json();
      const ingredientsRecords = json.data;

      setIngredients(ingredientsRecords);
    } catch (error) {
      addAlert(error.message, "danger", "getIngredients-failure");
      console.error(error);
    }
  }

  async function subtractBakeIngredients(recipeId) {
    try {
      const response = await fetch(`${baseUrl}/ingredients/bake/${recipeId}`, {
        method: "PUT",
      });

      if (!response.ok) {
        const json = await response.json();
        throw new Error(
          json.error ||
            "There was an error in the server response for PUT :/ingredients"
        );
      }

      return
    } catch (error) {
        addAlert(error.message, "danger", "subtractBakeIngredients-failure");
        console.error(error);
    }
  }

  return (
    <IngredientsContext.Provider
      value={{ ingredients, getIngredients, ingredient, getIngredientById, subtractBakeIngredients }}
    >
      {children}
    </IngredientsContext.Provider>
  );
}

export function useIngredients() {
  return useContext(IngredientsContext);
}
