export const API_CONFIG = {
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
};

// Error handling for API calls

export async function handleResponse(response) {
  // The catch block handles successful 204 No Content responses
  const json = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(
      json.error || `HTTP ${response.status}: ${response.statusText}`
    );
    }

  return json.data;
}
