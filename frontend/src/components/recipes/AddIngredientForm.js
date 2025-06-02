import { useState } from "react";

import { IngredientSelector } from "./IngredientSelector";
import { UnitSelector } from "../common/UnitSelector";
import { handleInputChange } from "../../utils/handleInputChange";

export function AddIngredientForm({
  recipeId,
  title,
  ingredients,
  getRecipeById,
  addRecipeIngredient,
  units
}) {
  const [formData, setFormData] = useState({
    ingredient: "",
    amount: 0,
    unit: "",
  });

  async function handleSubmit(event) {
    event.preventDefault();

    const match = ingredients.find(
      (ingredient) => ingredient.name === formData.ingredient
    );
    const ingredientId = match.ingredient_id;
    const name = match.name;

    // Add the ingredient record to the recipe_ingredients table
    await addRecipeIngredient(recipeId, ingredientId, formData, title, name);
    // Fetch the updated recipe to refresh component state
    await getRecipeById(recipeId);
  }

  return (
    <>
      <h5 className="mb-3">Add an Ingredient</h5>
      <form onSubmit={handleSubmit}>
        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <IngredientSelector
              formData={formData}
              setFormData={setFormData}
              ingredients={ingredients}
            />
          </div>{" "}
          <div className="col-md-3">
            <label htmlFor="amount" className="form-label">
              Amount
            </label>
            <input
              type="number"
              className="form-control"
              id="amount"
              name="amount"
              min="1"
              step="1"
              placeholder="Enter amount"
              value={formData.amount}
              onChange={(event) =>
                handleInputChange(event, formData, setFormData)
              }
            />
          </div>
          <div className="col-md-3">
            <UnitSelector formData={formData} setFormData={setFormData} units={units} />
          </div>
        </div>

        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-success">
            <i className="bi bi-plus-circle me-2"></i>
            Add Ingredient
          </button>
        </div>
      </form>
    </>
  );
}
