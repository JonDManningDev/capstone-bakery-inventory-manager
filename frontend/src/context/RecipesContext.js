// This context file provides recipes and recipe state, as well as all frontend logic for interacting with the 'recipes' resource

import { createContext, useContext, useState } from "react";

const RecipesContext = createContext();

export function RecipesProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  // Explicitly set the default value of recipe.ingredients to an empty array to prevent crashing elsewhere
  const [recipe, setRecipe] = useState({ ingredients: [] });

  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  async function addRecipeIngredient(recipeId, ingredientId, formData) {
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
      }
    );

    if (!response.ok) {
      const json = await response.json();
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

    if (!response.ok) {
      const json = await response.json();
      throw new Error(
        json.error ||
          "There was an error in the server response for POST /recipes"
      );
    }

    const json = await response.json();
    const recipeRecord = json.data;
    return recipeRecord;
  }

  async function deleteRecipe(recipeId) {
    const response = await fetch(`${baseUrl}/recipes/${recipeId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const json = response.json();
      throw new Error(
        json.error ||
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

    if (!response.ok) {
      const json = await response.json();
      throw new Error(
        json.error ||
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

    if (!response.ok) {
      const json = await response.json();
      throw new Error(
        json.error ||
          "There was an error in the server response for PUT /recipes/:recipeId"
      );
    }

    const json = await response.json();
    const updatedRecipe = json.data;
    return updatedRecipe;
  }

  async function getRecipeById(recipeId) {
    const response = await fetch(`${baseUrl}/recipes/${recipeId}`);

    if (!response.ok) {
      const json = await response.json();
      throw new Error(
        json.error ||
          "There was an error in the server response for GET /recipes/:recipeId"
      );
    }

    const json = await response.json();
    const recipeRecord = json.data;

    return recipeRecord;
  }

  async function getRecipes() {
    const response = await fetch(`${baseUrl}/recipes`);

    if (!response.ok) {
      const json = response.json();
      throw new Error(
        json.error ||
          "There was an error in the server response for GET /recipes."
      );
    }

    const json = await response.json();
    const recipesRecords = json.data;

    return recipesRecords;
  }

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
