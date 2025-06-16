import { useNavigate, useLocation } from "react-router-dom";

import { handleInputChange } from "../../utils/handleInputChange";
import { UnitSelector } from "../common/UnitSelector";
import { useUnits } from "../../context/UnitsContext";

// Shared form for creating and editing ingredients.
// FormData (name, base_unit, quantity_in_stock) is auto-populated with data from existing ingredient in parent component (EditIngredient).
// handleSubmit() prop allows flexibility based on editing or creating.
export function IngredientForm({ handleSubmit, formData, setFormData }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Used for conditional rendering (editing vs creating)
  const editing = location.pathname.includes("edit");

  const { units } = useUnits();

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h4>
                {editing ? `Edit ${formData.name}` : "Create New Ingredient"}
              </h4>
            </div>
            <div className="card-body">
              <form onSubmit={(event) => handleSubmit(formData, event)}>
                <div className="mb-3">
                  <label htmlFor="ingredient-name" className="form-label">
                    Ingredient Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="ingredient-name"
                    name="name"
                    value={formData.name}
                    onChange={(event) =>
                      handleInputChange(event, formData, setFormData)
                    }
                    placeholder="Enter ingredient name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <UnitSelector
                    units={units}
                    formData={formData}
                    setFormData={setFormData}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="ingredient-quantity-in-stock"
                    className="form-label"
                  >
                    Quantity in Stock
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="ingredient-quantity-in-stock"
                    name="quantity_in_stock"
                    value={formData.quantity_in_stock}
                    onChange={(event) =>
                      handleInputChange(event, formData, setFormData)
                    }
                    placeholder="Enter starting stock quantity"
                    required
                  />
                </div>
                <div className="d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </button>
                  <button className={editing ? "btn btn-primary" : "btn btn-success"} type="submit">
                    {editing ? "Save Ingredient" : "Create Ingredient"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Implement backend functionality for creating and editing ingredients.
// Test functionality for creating and editing ingredients.
// Implement all functionality for deleting ingredients ('ingredients' table)
// Make bakes view
