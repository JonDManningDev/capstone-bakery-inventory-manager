// View for creating a new ingredient.

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { IngredientForm } from "./IngredientForm";
import { useAlerts } from "../../context/AlertsContext";
import { useIngredients } from "../../context/IngredientsContext";

export function CreateIngredient() {
  const navigate = useNavigate();
  const { createIngredient } = useIngredients();
  const { addAlert } = useAlerts();

  const [formData, setFormData] = useState({
    name: "",
    base_unit: "",
    quantity_in_stock: 0,
  });

  async function handleSubmit(formData, event) {
    event.preventDefault();

    try {
      const record = await createIngredient(formData);
      addAlert(
        `Successfully created new ingredient: ${record.name}`,
        "success",
        "createIngredient-success"
      );
      navigate(`/ingredients/${record.ingredient_id}`);
      return;
    } catch (error) {
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
