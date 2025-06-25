import { Link } from "react-router-dom";

export function BakeListItem({ bake, renderStatusBadge, handleStatusUpdate }) {
  return (
    <div key={bake.bake_id} className="list-group-item p-3 mb-3 border rounded">
      <div className="row align-items-center">
        {/* Recipe Image */}
        <div className="col-md-2 text-center mb-3 mb-md-0">
          <img
            src={
              bake.recipe
                ? bake.recipe.image_url
                : "https://via.placeholder.com/150?text=No+Image"
            }
            alt={bake.recipe ? bake.recipe.title : "Recipe"}
            className="img-fluid rounded"
            style={{ width: "120px", height: "120px", objectFit: "cover" }}
          />
        </div>
        {/* Bake Details */}
        <div className="col-md-4">
          <h4 className="mb-1">
            {bake.recipe ? bake.recipe.title : "Unknown Recipe"}
          </h4>
          <p className="text-muted mb-1">
            <strong>{`Employee: `}</strong>
            {bake.employee
              ? `${bake.employee.last_name}, ${bake.employee.first_name}`
              : "Unknown Employee"}
          </p>
          <p className="mb-1">{renderStatusBadge(bake.status)}</p>
          <p className="mb-1 small">
            <strong>{`Started: `}</strong>
            {bake.created_at
              ? new Date(bake.created_at).toLocaleString()
              : "Unknown"}
          </p>
          <p className="mb-0 small">
            <strong>{`Last Updated: `}</strong>
            {bake.updated_at
              ? new Date(bake.updated_at).toLocaleString()
              : "Never"}
          </p>
        </div>
        {/* Action Buttons */}
        <div className="col-md-6 text-md-end mt-3 mt-md-0">
          <Link
            to={bake.recipe ? `/recipes/${bake.recipe.recipe_id}` : "#"}
            className="btn btn-info me-2 mb-2 mb-md-0"
          >
            <i className="bi bi-eye me-1"></i>
            View Recipe
          </Link>
          {bake.status === "started" && (
            <>
              <button
                className="btn btn-success me-2 mb-2 mb-md-0"
                onClick={() => handleStatusUpdate(bake.bake_id, "complete")}
              >
                <i className="bi bi-check-circle me-1"></i>
                Complete
              </button>

              <button
                className="btn btn-danger mb-2 mb-md-0"
                onClick={() => handleStatusUpdate(bake.bake_id, "canceled")}
              >
                <i className="bi bi-x-circle me-1"></i>
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
