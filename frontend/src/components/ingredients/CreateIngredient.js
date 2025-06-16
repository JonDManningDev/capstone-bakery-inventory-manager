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
    try {
      event.preventDefault();
      const record = await createIngredient(formData);
      addAlert(
        `Successfully created new ingredient: ${record.name}`,
        "success",
        "createIngredient-success"
      );
      return navigate(`/ingredients/${record.ingredient_id}`);
    } catch (error) {
      addAlert(
        `Failed to create ingredient: ${formData.name}`,
        "danger",
        "createIngredient-failure"
      );
      console.error(error);
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
