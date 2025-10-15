import { API_CONFIG, handleResponse } from "./config";

const baseUrl = API_CONFIG.baseURL;

export const ingredientsAPI = {
  async createIngredient(formData, { signal } = {}) {
    const response = await fetch(`${baseUrl}/ingredients`, {
      method: "POST",
      body: JSON.stringify({ data: formData }),
      headers: {
        "Content-Type": "application/json",
      },
      signal,
    });

    return handleResponse(response);
  },

  async deleteIngredient(ingredientId, { signal } = {}) {
    const response = await fetch(`${baseUrl}/ingredients/${ingredientId}`, {
      method: "DELETE",
      signal,
    });

    return handleResponse(response);
  },

  async editIngredientById(ingredientId, formData, { signal } = {}) {
    const response = await fetch(`${baseUrl}/ingredients/${ingredientId}`, {
      method: "PUT",
      body: JSON.stringify({ data: formData }),
      headers: {
        "Content-Type": "application/json",
      },
      signal,
    });

    return handleResponse(response);
  },

  async getIngredientById(ingredientId, { signal } = {}) {
    const response = await fetch(`${baseUrl}/ingredients/${ingredientId}`, {
      signal,
    });

    return handleResponse(response);
  },

  async getIngredients({ signal } = {}) {
    const response = await fetch(`${baseUrl}/ingredients`, { signal });

    return handleResponse(response);
  },

  async subtractBakeIngredients(recipeId, { signal } = {}) {
    const response = await fetch(`${baseUrl}/ingredients/bake/${recipeId}`, {
      method: "PUT",
      signal,
    });

    return handleResponse(response);
  },
};
