// This context file provides recipes and recipe state, as well as all frontend logic for interacting with the 'recipes' resource

import { createContext, useContext, useState } from "react";

import { useAlerts } from "./AlertsContext";

const RecipesContext = createContext();

export function RecipesProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  // Explicitly set the default value of recipe.ingredients to an empty array to prevent crashing elsewhere
  const [recipe, setRecipe] = useState({ ingredients: [] });

  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const { addAlert } = useAlerts();

  async function addRecipeIngredient(
    recipeId,
    ingredientId,
    formData,
    title,
    name
  ) {
    try {
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

      return addAlert(
        `Successfully added ${name} to ${title}`,
        "success",
        "addRecipeIngredient-success"
      );
    } catch (error) {
      addAlert(error.message, "danger", "addRecipeIngredient-failure");
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

      if (!response.ok) {
        const json = await response.json();
        throw new Error(
          json.error ||
            "There was an error in the server response for POST /recipes"
        );
      }

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

  async function deleteRecipe(recipeId, title) {
    try {
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

      return addAlert(
        `Successfully deleted recipe ${title}.`,
        "info",
        "deleteRecipe-success"
      );
    } catch (error) {
      addAlert(error.message, "danger", "deleteRecipe-failure");
      console.error(error);
    }
  }

  async function deleteRecipeIngredient(ingredientId, recipeId, name, title) {
    try {
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

      return addAlert(
        `Successfully deleted ${name} from ${title}`,
        "info",
        "deleteRecipeIngredient-success"
      );
    } catch (error) {
      addAlert(error.message, "danger", "deleteRecipeIngredient-failure");
      console.error(error);
    }
  }
  
  async function getRecipeById(recipeId) {
    try {
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

      return setRecipe(recipeRecord);
    } catch (error) {
      addAlert(error.message, "danger", "getRecipeById-failure");
      console.error(error);
    }
  }

  async function getRecipes() {
    try {
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

      return setRecipes(recipesRecords);
    } catch (error) {
      addAlert(error.message, "danger", "getRecipes-failure");
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
        addRecipeIngredient,
        deleteRecipeIngredient,
      }}
    >
      {children}
    </RecipesContext.Provider>
  );
}

export function useRecipes() {
  return useContext(RecipesContext);
}
