// This function takes a provided login token and uses it to retrieve and set user data.
// The parent function will need to declare/provide the token from localStorage for this function to work.
export async function loginWithToken(token, setUser, addAlert) {
  try {
    const baseUrl = process.env.REACT_APP_API_BASE_URL;
    console.log("Using base URL for token auth:", baseUrl);
    const response = await fetch(`${baseUrl}/employees/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // With fetch() you have to manually throw errors to prevent the function from proceeding with faulty or missing data
    if (!response.ok) throw new Error("Token invalid or expired");
    const json = await response.json();
    const userFromToken = json.data;

    // Take the returned user info and set the user state accordingly
    setUser(userFromToken);

  } catch (error) {
    // If there is an error, make sure the token gets cleaned up.
    localStorage.removeItem("token");

    // Restore user to the not-logged-in state.
    setUser({
      employeeId: null,
      firstName: "Guest",
      lastName: null,
      email: null,
    });

    // If there's an issue, alert the user
    addAlert(error.message, "danger");
    console.error(error);
  }
}
