import { API_CONFIG, handleResponse } from "./config";

const baseUrl = API_CONFIG.baseURL;

export const recipesAPI = {
  async addRecipeIngredient(recipeId, ingredientId, formData, { signal } = {}) {
    const response = await fetch(
      `${baseUrl}/recipes/${recipeId}/${ingredientId}`,
      {
        method: "POST",
        body: JSON.stringify({
          data: {
            amount_needed: formData.amount,
            unit: formData.unit,
          },
        }),
        headers: { "Content-Type": "application/json" },
        signal,
      }
    );

    return handleResponse(response);
  },

  async createNewRecipe(formData, { signal } = {}) {
    const response = await fetch(`${baseUrl}/recipes`, {
      method: "POST",
      body: JSON.stringify({ data: formData }),
      headers: { "Content-Type": "application/json" },
      signal,
    });

    return handleResponse(response);
  },

  async deleteRecipe(recipeId, { signal } = {}) {
    const response = await fetch(`${baseUrl}/recipes/${recipeId}`, {
      method: "DELETE",
      signal,
    });
    
    return handleResponse(response);
  },

  async deleteRecipeIngredient(ingredientId, recipeId, { signal } = {}) {
    const response = await fetch(
      `${baseUrl}/recipes/${recipeId}/${ingredientId}`,
      {
        method: "DELETE",
        signal,
      }
    );
    
    return handleResponse(response);
  },

  async editRecipeById(recipeId, formData, { signal } = {}) {
    const response = await fetch(`${baseUrl}/recipes/${recipeId}`, {
      method: "PUT",
      body: JSON.stringify({ data: formData }),
      headers: { "Content-Type": "application/json" },
      signal,
    });
    
    return handleResponse(response);
  },

  async getRecipeById(recipeId, { signal } = {}) {
    const response = await fetch(`${baseUrl}/recipes/${recipeId}`, {
      signal,
    });
    
    return handleResponse(response);
  },

  async getRecipes({ signal } = {}) {
    const response = await fetch(`${baseUrl}/recipes`, { signal });
    
    return handleResponse(response);
  },
};
