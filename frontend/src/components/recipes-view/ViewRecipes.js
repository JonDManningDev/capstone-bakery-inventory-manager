import { Link } from "react-router-dom";

import { useAlerts } from "../../context/AlertsContext";
import { useRecipes } from "../../context/RecipesContext";
import { RecipesList } from "./RecipesList";
import { useEffect } from "react";

export function ViewRecipes() {
  const { addAlert } = useAlerts();
  const { recipes, getRecipes, setRecipes } = useRecipes();
  
  useEffect(() => {
    // Always fetch recipes when the component mounts or when navigated to with refresh: true
    async function loadRecipes() {
      try {
        const recipesRecords = await getRecipes();
        setRecipes(recipesRecords);
      } catch (error) {
        addAlert(`Failed to load recipes: ${error.message}!`, "danger", "getRecipes-failure");
        console.error("Failed to load recipes: ", error.message);
      }
    }
    loadRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    // Component container
    <div className="container col-11 col-md-8 col-lg-5 py-4 my-4 border rounded">
      {/* Upper container */}
      <div className="d-flex justify-content-between">
        <div>
          <h3>Our Recipes</h3>
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
