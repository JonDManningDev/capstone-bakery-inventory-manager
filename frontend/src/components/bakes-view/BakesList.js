// Renders the list of current bakes

import { BakeListItem } from "./BakeListItem";

export function BakesList({
  filteredBakes,
  renderStatusBadge,
  handleStatusUpdate,
}) {
  return (
    <div className="list-group">
      {filteredBakes.length === 0 ? (
        <div className="alert alert-info">
          No bakes found for the selected criteria.
        </div>
      ) : (
        filteredBakes.map((bake) => (
          <BakeListItem
            key={bake.bake_id}
            bake={bake}
            renderStatusBadge={renderStatusBadge}
            handleStatusUpdate={handleStatusUpdate}
          />
        ))
      )}
    </div>
  );
}
