// View for creating a new ingredient.

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { IngredientForm } from "./IngredientForm";
import { useAlerts } from "../../context/AlertsContext";
import { useIngredients } from "../../context/IngredientsContext";

export function CreateIngredient() {
  const navigate = useNavigate();
  const { getIngredients, createIngredient } = useIngredients();
  const { addAlert } = useAlerts();

  const [formData, setFormData] = useState({
    name: "",
    base_unit: "",
    quantity_in_stock: 0,
  });

  async function handleSubmit(formData, event) {
    event.preventDefault();
    const abortController = new AbortController();    
    try {
      // Check for an existing record with the same name
      const ingredientRecords = await getIngredients({
        signal: abortController.signal,
      });
      const nameExists = ingredientRecords.some(
        (ingredient) => ingredient.name === formData.name
      );
      if (nameExists) {
        addAlert(
          `Ingredient with name ${formData.name} already exists!`,
          "danger",
          "createIngredient-duplicate"
        );
        return;
      }
      // Then proceed to create the new ingredient
      const record = await createIngredient({
        ...formData,
        signal: abortController.signal,
      });
      addAlert(
        `Successfully created new ingredient: ${record.name}`,
        "success",
        "createIngredient-success"
      );
      navigate(`/ingredients/${record.ingredient_id}`);
      return;
    } catch (error) {
      if (error.name === "AbortError") return;
      addAlert(
        `Failed to create ingredient ${formData.name}: ${error.message}!`,
        "danger",
        "createIngredient-failure"
      );
      console.error(
        `Failed to create ingredient ${formData.name}`,
        error.message
      );
    }
  }

  return (
    <IngredientForm
      handleSubmit={handleSubmit}
      formData={formData}
      setFormData={setFormData}
    />
  );
}
