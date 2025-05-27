import { Link } from "react-router-dom";

import { RecipesList } from "./RecipesList";

export function RecipesView() {
  return (
    // Component container
    <div className="container py-4 my-4 border rounded">
      {/* Upper container */}
      <div className="d-flex justify-content-between">
        <div>
          <h3>Our Recipes</h3>
        </div>
        <div id="recipesListActions">
            <Link to="/recipes/new" role="button" className="btn btn-success">Create Recipe</Link>
        </div>
      </div>
      {/* Lower container */}
      <RecipesList />
    </div>
  );
}
