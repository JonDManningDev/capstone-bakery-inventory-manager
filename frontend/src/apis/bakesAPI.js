import { API_CONFIG, handleResponse } from "./config";

const baseUrl = API_CONFIG.baseURL;

export const bakesAPI = {
  async createBake(recipeId, employeeId, { signal } = {}) {
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

    return handleResponse(response);
  },

  async getBakes({ signal } = {}) {
    const response = await fetch(`${baseUrl}/bakes`, { signal });

    return handleResponse(response);
  },

  async updateBakeStatus(bakeId, newStatus, { signal } = {}) {
    const response = await fetch(`${baseUrl}/bakes/${bakeId}`, {
      method: "PUT",
      body: JSON.stringify({
        data: {
          status: newStatus,
          updated_at: new Date().toISOString(),
        },
      }),
      headers: { "Content-Type": "application/json" },
      signal,
    });

    return handleResponse(response);
  },
};
