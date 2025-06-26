import { Link } from "react-router-dom";

export function IngredientRecipesListItem({ recipeId, title }) {
  return (
    <div className="p-2">
      <Link
        to={`/recipes/${recipeId}`}
        className="list-group-item list-group-item-action py-4 border rounded"
      >
        <h5>{title}</h5>
      </Link>
    </div>
  );
}
