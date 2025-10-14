// ViewRecipes displays a list of recipes in the bakery database with links to each entry

import { Link } from "react-router-dom";

import { useAlerts } from "../../context/AlertsContext";
import { recipesAPI } from "../../apis";
import { RecipesList } from "./RecipesList";
import { useEffect, useState } from "react";

export function ViewRecipes() {
  const { addAlert } = useAlerts();

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    async function loadRecipes() {
      try {
        const recipesRecords = await recipesAPI.getRecipes({
          signal: abortController.signal,
        });
        setRecipes(recipesRecords);
      } catch (error) {
        if (error.name !== "AbortError") {
          addAlert(
            `Failed to load recipes: ${error.message}!`,
            "danger",
            "getRecipes-failure"
          );
          console.error("Failed to load recipes: ", error.message);
        }
      }
    }
    loadRecipes();
    return () => abortController.abort();
  }, [addAlert, setRecipes]);

  return (
    // Component container
    <div className="container col-11 col-md-8 col-lg-5 pb-4 my-4 border rounded bg-primary-subtle shadow">
      {/* Upper container */}
      <div
        className="d-flex justify-content-between bg-secondary p-4 mb-4 rounded-top"
        style={{ marginLeft: "-0.75rem", marginRight: "-0.75rem" }}
      >
        <div>
          <h3 className="text-light">Our Recipes</h3>
        </div>
        <div id="recipesListActions">
          <Link to="/recipes/new" role="button" className="btn btn-success">
            Create Recipe
          </Link>
        </div>
      </div>
      {/* Lower container */}
      <RecipesList recipes={recipes} />
    </div>
  );
}
