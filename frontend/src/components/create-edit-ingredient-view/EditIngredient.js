// View for editing an existing ingredient.

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { IngredientForm } from "./IngredientForm";
import { useAlerts } from "../../context/AlertsContext";
import { ingredientsAPI } from "../../apis";

export function EditIngredient() {
  const navigate = useNavigate();
  const { ingredientId } = useParams();
  const { addAlert } = useAlerts();

  const [ingredient, setIngredient] = useState({ recipes: [] });

  const [formData, setFormData] = useState({
    name: "",
    base_unit: "",
    quantity_in_stock: 0,
  });

  useEffect(() => {
    const abortController = new AbortController();
    async function loadIngredient() {
      try {
        const ingredientRecords = await ingredientsAPI.getIngredientById(ingredientId, {
          signal: abortController.signal,
        });
        setIngredient(ingredientRecords);
      } catch (error) {
        if (error.name !== "AbortError") {
          addAlert(
            "Failed to load ingredient.",
            "danger",
            "getIngredientById-failure"
          );
          console.error(error);
        }
      }
    }
    loadIngredient();
    return () => abortController.abort();
  }, [addAlert, ingredientId]);

  // Pre-load existing data
  useEffect(() => {
    if (!ingredient.name) return;
    setFormData({
      name: ingredient.name,
      base_unit: ingredient.base_unit,
      quantity_in_stock: ingredient.quantity_in_stock,
    });
  }, [ingredient]);

  const handleSubmit = (() => {
    let lastAbortController = null;
    return async function (formData, event) {
      event.preventDefault();
      if (lastAbortController) {
        lastAbortController.abort();
      }
      const abortController = new AbortController();
      lastAbortController = abortController;
      try {
        // Check for a different existing record with the same name
        const ingredientRecords = await ingredientsAPI.getIngredients({
          signal: abortController.signal,
        });
        const nameExists = ingredientRecords.some(
          (ingredient) =>
            ingredient.name === formData.name && ingredient.id !== ingredientId
        );
        if (nameExists) {
          addAlert(
            `Ingredient with name ${formData.name} already exists!`,
            "danger",
            "editIngredient-duplicate"
          );
          return;
        }
        // Then proceed to create the new ingredient
        const message = `Save changes to ${ingredient.name}?`;
        if (window.confirm(message)) {
          const updatedRecord = await ingredientsAPI.editIngredientById(
            ingredientId,
            formData,
            {
              signal: abortController.signal,
            }
          );
          addAlert(
            `Successfully edited ingredient: ${updatedRecord.name}`,
            "info",
            "editIngredientById-success"
          );
          return navigate(`/ingredients/${updatedRecord.id}`);
        }
      } catch (error) {
        if (error.name === "AbortError") return;
        addAlert(
          `Failed to edit ingredient ${ingredient.name}: ${error.message}!`,
          "danger",
          "editIngredientById-failure"
        );
        console.error(
          `Failed to edit ingredient ${ingredient.name}:`,
          error.message
        );
      }
    };
  })();

  if (!ingredient.name) {
    return (
      <h2>{`Ingredient with ID ${ingredientId} loading or not found.`}</h2>
    );
  }

  return (
    <IngredientForm
      handleSubmit={handleSubmit}
      formData={formData}
      setFormData={setFormData}
    />
  );
}
