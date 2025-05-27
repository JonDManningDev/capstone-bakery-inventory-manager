// This context file provides recipes and recipe state, as well as all frontend logic for interacting with the 'recipes' resource

import { createContext, useContext, useState } from "react";

import { useAlerts } from "./AlertsContext";

const RecipesContext = createContext();

export function RecipesProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [recipe, setRecipe] = useState({});

  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const { addAlert } = useAlerts();

  async function getRecipes() {
    try {
      const response = await fetch(`${baseUrl}/recipes`);

      if (!response.ok)
        throw new Error(
          "There was an error in the server response for GET /recipes."
        );
      const json = await response.json();
      const recipesRecords = json.data;

      return setRecipes(recipesRecords);
    } catch (error) {
      addAlert(error.message, "danger", "getRecipes-failure");
      console.error(error);
    }
  }

  async function getRecipeById(recipeId) {
    try {
      const response = await fetch(`${baseUrl}/recipes/${recipeId}`);

      if (!response.ok)
        throw new Error(
          "There was an error in the server response for GET /recipes/:recipeId"
        );
      const json = await response.json();
      const recipeRecord = json.data;

      return setRecipe(recipeRecord);
    } catch (error) {
      addAlert(error.message, "danger", "getRecipeById-failure");
      console.error(error);
    }
  }

  async function createRecipe(formData) {
    try {
      const response = await fetch(`${baseUrl}/recipes`, {
        method: "POST",
        body: JSON.stringify({ data: formData }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok)
        throw new Error(
          "There was an error in the server response for POST /recipes"
        );
      const json = await response.json();
      const recipeRecord = json.data;

      return addAlert(
        `Successfully created new recipe: ${recipeRecord.title}!`,
        "success",
        "createRecipe-success"
      );
    } catch (error) {
      addAlert(error.message, "danger", "createRecipe-failure");
      console.error(error);
    }
  }

  async function deleteRecipe(recipeId) {
    try {
      const response = await fetch(`${baseUrl}/recipes/${recipeId}`, {
        method: "DELETE",
      });

      if (!response.ok)
        throw new Error(
          "There was an error in the server response for DELETE /recipes/:recipeId"
        );

      return addAlert(
        `Successfully deleted recipe with id ${recipeId}.`,
        "info",
        "deleteRecipe-success"
      );
    } catch (error) {
      addAlert(error.message, "danger", "deleteRecipe-failure");
      console.error(error);
    }
  }

  return (
    <RecipesContext.Provider
      value={{
        recipes,
        recipe,
        getRecipes,
        getRecipeById,
        createRecipe,
        deleteRecipe,
      }}
    >
      {children}
    </RecipesContext.Provider>
  );
}

export function useRecipes() {
  return useContext(RecipesContext);
}
