// Renders each individual recipe entry in the list

import { Link } from "react-router-dom";

export function RecipesListItem({ title, image_url, id }) {
  return (
    <Link
      to={`/recipes/${id}`}
      className="list-group-item list-group-item-action py-4 border rounded d-flex justify-content-between align-items-center"
    >
      <img
        src={image_url}
        alt={title}
        style={{ width: "120px", height: "120px", objectFit: "cover" }}
      />
      <h5 className="mb-0">{title}</h5>
    </Link>
  );
}
