// Shared form for creating and editing recipes.
// FormData (title, description, image_url) is auto-populated with data from existing recipe in parent component (EditRecipe).
// handleSubmit() prop allows flexibility based on editing or creating.

import { useNavigate, useLocation } from "react-router-dom";

import { handleInputChange } from "../../utils/handleInputChange";

export function RecipeForm({ handleSubmit, formData, setFormData }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Used for conditional rendering (editing vs creating)
  const editing = location.pathname.includes("edit");

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h4>{editing ? `Edit ${formData.title}` : "Create New Recipe"}</h4>
            </div>
            <div className="card-body">
              <form onSubmit={(event) => handleSubmit(formData, event)}>
                <div className="mb-3">
                  <label htmlFor="recipe-title" className="form-label">
                    Recipe Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="recipe-title"
                    name="title"
                    value={formData.title}
                    onChange={(event) =>
                      handleInputChange(event, formData, setFormData)
                    }
                    placeholder="Enter recipe title"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="recipe-description" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="recipe-description"
                    name="description"
                    value={formData.description}
                    onChange={(event) =>
                      handleInputChange(event, formData, setFormData)
                    }
                    rows="5"
                    placeholder="Enter recipe description"
                    required
                  ></textarea>
                  <small className="form-text text-muted">
                    Provide a description and/or recipe instructions.
                  </small>
                </div>
                <div className="mb-4">
                  <label htmlFor="recipe-image-url" className="form-label">
                    Image URL
                  </label>
                  <input
                    type="url"
                    className="form-control"
                    id="recipe-image-url"
                    name="image_url"
                    value={formData.image_url}
                    onChange={(event) =>
                      handleInputChange(event, formData, setFormData)
                    }
                    placeholder="Enter URL for recipe image"
                  />
                  <small className="form-text text-muted">Optional</small>
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
                    {editing ? "Save Recipe" : "Create Recipe"}
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
