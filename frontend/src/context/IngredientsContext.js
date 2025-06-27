import { createContext, useContext, useState } from "react";

const IngredientsContext = createContext();

export function IngredientsProvider({ children }) {
  const [ingredients, setIngredients] = useState([]);
  const [ingredient, setIngredient] = useState({ recipes: [] });

  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  async function createIngredient(formData) {
    const response = await fetch(`${baseUrl}/ingredients`, {
      method: "POST",
      body: JSON.stringify({ data: formData }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();
    if (!response.ok) {
      throw new Error(
        json.error ||
          "There was an error in the server response for POST /ingredients"
      );
    }

    const newIngredient = json.data;
    return newIngredient;
  }

  async function deleteIngredient(ingredientId) {
    const response = await fetch(`${baseUrl}/ingredients/${ingredientId}`, {
      method: "DELETE",
    });

    const json = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(
        (json && json.error) ||
          "There was an error in the server response for DELETE /ingredients/:ingredientId"
      );
    }
    return;
  }

  async function editIngredientById(ingredientId, formData) {
    const response = await fetch(`${baseUrl}/ingredients/${ingredientId}`, {
      method: "PUT",
      body: JSON.stringify({ data: formData }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();
    if (!response.ok) {
      throw new Error(
        json.error ||
          "There was an error in the server response for PUT /ingredients/:ingredientId"
      );
    }

    const updatedIngredient = json.data;
    return updatedIngredient;
  }

  async function getIngredientById(ingredientId, { signal } = {}) {
    const response = await fetch(`${baseUrl}/ingredients/${ingredientId}`, {
      signal,
    });
    const json = await response.json();
    if (!response.ok) {
      throw new Error(
        json.error ||
          "There was an error in the server response for GET /ingredients/:ingredientId"
      );
    }
    const ingredientRecords = json.data;
    return ingredientRecords;
  }

  async function getIngredients({ signal } = {}) {
    const response = await fetch(`${baseUrl}/ingredients`, { signal });
    const json = await response.json();
    if (!response.ok) {
      throw new Error(
        json.error ||
          "There was an error in the server response for GET /ingredients"
      );
    }
    const ingredientsRecords = json.data;
    return ingredientsRecords;
  }

  async function subtractBakeIngredients(recipeId) {
    const response = await fetch(`${baseUrl}/ingredients/bake/${recipeId}`, {
      method: "PUT",
    });
    const json = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(
        (json && json.error) ||
          "There was an error in the server response for PUT :/ingredients"
      );
    }
    return;
  }

  return (
    <IngredientsContext.Provider
      value={{
        createIngredient,
        deleteIngredient,
        editIngredientById,
        getIngredientById,
        getIngredients,
        ingredient,
        ingredients,
        setIngredient,
        setIngredients,
        subtractBakeIngredients,
      }}
    >
      {children}
    </IngredientsContext.Provider>
  );
}

export function useIngredients() {
  return useContext(IngredientsContext);
}
