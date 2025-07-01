// This context file provides recipes and recipe state, as well as all frontend logic for interacting with the resources: 'recipes' table and 'recipe_ingredients' table.

import { createContext, useContext, useState, useCallback } from "react";

const RecipesContext = createContext();
const baseUrl = process.env.REACT_APP_API_BASE_URL;

export function RecipesProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  // Explicitly set the default value of recipe.ingredients to an empty array to prevent crashing elsewhere
  const [recipe, setRecipe] = useState({ ingredients: [] });

  async function addRecipeIngredient(
    recipeId,
    ingredientId,
    formData,
    { signal } = {}
  ) {
    const response = await fetch(
      `${baseUrl}/recipes/${recipeId}/${ingredientId}`,
      {
        method: "POST",
        body: JSON.stringify({
          data: {
            recipe_id: recipeId,
            ingredient_id: ingredientId,
            amount_needed: formData.amount,
            unit: formData.unit,
          },
        }),
        headers: { "Content-Type": "application/json" },
        signal,
      }
    );
    const json = await response.json();
    if (!response.ok) {
      throw new Error(
        json.error ||
          "There was an error in the server response for POST /recipes/:recipeId/:ingredientId"
      );
    }
    return;
  }

  async function createNewRecipe(formData) {
    const response = await fetch(`${baseUrl}/recipes`, {
      method: "POST",
      body: JSON.stringify({ data: formData }),
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json();
    if (!response.ok) {
      throw new Error(
        json.error ||
          "There was an error in the server response for POST /recipes"
      );
    }
    const recipeRecord = json.data;
    return recipeRecord;
  }

  async function deleteRecipe(recipeId) {
    const response = await fetch(`${baseUrl}/recipes/${recipeId}`, {
      method: "DELETE",
    });
    const json = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(
        (json && json.error) ||
          "There was an error in the server response for DELETE /recipes/:recipeId"
      );
    }
    return;
  }

  async function deleteRecipeIngredient(ingredientId, recipeId) {
    const response = await fetch(
      `${baseUrl}/recipes/${recipeId}/${ingredientId}`,
      {
        method: "DELETE",
      }
    );
    const json = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(
        (json && json.error) ||
          "There was an error in the server response for DELETE /recipes/:recipeId/:ingredientId"
      );
    }
    return;
  }

  async function editRecipeById(recipeId, formData) {
    const response = await fetch(`${baseUrl}/recipes/${recipeId}`, {
      method: "PUT",
      body: JSON.stringify({ data: formData }),
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json();
    if (!response.ok) {
      throw new Error(
        json.error ||
          "There was an error in the server response for PUT /recipes/:recipeId"
      );
    }
    const updatedRecipe = json.data;
    return updatedRecipe;
  }

  const getRecipeById = useCallback(async (recipeId, { signal } = {}) => {
    const response = await fetch(`${baseUrl}/recipes/${recipeId}`, {
      signal,
    });
    const json = await response.json();
    if (!response.ok) {
      throw new Error(
        json.error ||
          "There was an error in the server response for GET /recipes/:recipeId"
      );
    }
    const recipeRecord = json.data;
    return recipeRecord;
  }, []);

  const getRecipes = useCallback(async ({ signal } = {}) => {
    const response = await fetch(`${baseUrl}/recipes`, { signal });
    const json = await response.json();
    if (!response.ok) {
      throw new Error(
        json.error ||
          "There was an error in the server response for GET /recipes."
      );
    }
    const recipesRecords = json.data;
    return recipesRecords;
  }, []);

  return (
    <RecipesContext.Provider
      value={{
        addRecipeIngredient,
        createNewRecipe,
        deleteRecipe,
        deleteRecipeIngredient,
        editRecipeById,
        getRecipeById,
        getRecipes,
        recipe,
        recipes,
        setRecipe,
        setRecipes,
      }}
    >
      {children}
    </RecipesContext.Provider>
  );
}

export function useRecipes() {
  return useContext(RecipesContext);
}
