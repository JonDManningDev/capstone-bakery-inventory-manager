// Renders each individual ingredient

import { Link } from "react-router-dom";

export function IngredientListItem({ name, id }) {
  return (
    <Link
      to={`/ingredients/${id}`}
      className="list-group-item list-group-item-action py-4 border rounded d-flex justify-content-start align-items-center"
    >
      <h5 className="mb-0">{name}</h5>
    </Link>
  );
}
