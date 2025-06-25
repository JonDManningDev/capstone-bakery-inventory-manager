import { Link } from "react-router-dom";

import { useRecipes } from "../../context/RecipesContext";
import { RecipesList } from "./RecipesList";
import { useEffect } from "react";

export function RecipesView() {
  const { recipes, getRecipes } = useRecipes();
  useEffect(() => {
    // Always fetch recipes when the component mounts or when navigated to with refresh: true
    getRecipes();
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
