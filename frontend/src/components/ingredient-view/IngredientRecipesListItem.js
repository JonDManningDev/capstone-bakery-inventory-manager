// Renders each individual recipe of an ingredient

import { Link } from "react-router-dom";

export function IngredientRecipesListItem({ recipeId, title }) {
  return (
    <div className="p-2">
      <Link
        to={`/recipes/${recipeId}`}
        className="list-group-item list-group-item-action py-4 border rounded bg-primary text-light shadow-sm"
      >
        <h5>{title}</h5>
      </Link>
    </div>
  );
}
