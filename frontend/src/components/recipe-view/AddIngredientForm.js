// Form for adding an ingredient to a recipe

import { useState, useRef, useEffect } from "react";

import { useAlerts } from "../../context/AlertsContext";
import { IngredientSelector } from "./IngredientSelector";
import { UnitSelector } from "../common/UnitSelector";
import { handleInputChange } from "../../utils/handleInputChange";

export function AddIngredientForm({
  recipeId,
  title,
  recipeIngredients,
  ingredients,
  getRecipeById,
  addRecipeIngredient,
  units,
  setRecipe,
}) {
  const { addAlert } = useAlerts();
  const [formData, setFormData] = useState({
    ingredient: "",
    amount: 0,
    unit: "",
  });
  const abortControllerRef = useRef(null);

  async function handleSubmit(event) {
    event.preventDefault();

    // Abort any previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    try {
      const match = ingredients.find(
        (ingredient) => ingredient.name === formData.ingredient
      );
      const ingredientId = match.id;

      // Check if the ingredient is already added to the recipe
      const existingIngredient = recipeIngredients.find(
        (ingredient) => ingredient.id === ingredientId
      );
      if (existingIngredient) {
        addAlert(
          `Ingredient ${formData.ingredient} is already a part of ${title}.`,
          "warning",
          "addRecipeIngredient-duplicate"
        );
        return;
      }

      // Add the ingredient record to the recipe_ingredients table
      await addRecipeIngredient(recipeId, ingredientId, formData, {
        signal: abortController.signal,
      });
      addAlert(
        `Successfully added ${formData.ingredient} to ${title}`,
        "success",
        "addRecipeIngredient-success"
      );
      // Fetch the updated recipe to refresh component state
      const recipeRecord = await getRecipeById(recipeId, {
        signal: abortController.signal,
      });
      setRecipe(recipeRecord);
    } catch (error) {
      if (error.name !== "AbortError") {
        addAlert(
          `Failed to add ingredient: ${error.message}!`,
          "danger",
          "addRecipeIngredient-failure"
        );
        console.error("Failed to add ingredient:", error.message);
      }
    } finally {
      abortControllerRef.current = null;
    }
  }

  // Cleanup ongoing add ingredient request on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

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
          </div>
          <div className="col-md-3">
            <label htmlFor="amount" className="form-label">
              Amount
            </label>
            <input
              type="number"
              className="form-control"
              id="amount"
              name="amount"
              min=".25"
              step=".25"
              placeholder="Enter amount"
              value={formData.amount}
              onChange={(event) =>
                handleInputChange(event, formData, setFormData)
              }
            />
          </div>
          <div className="col-md-3">
            <UnitSelector
              formData={formData}
              setFormData={setFormData}
              units={units}
            />
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
