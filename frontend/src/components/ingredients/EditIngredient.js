import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { IngredientForm } from "./IngredientForm";
import { useAlerts } from "../../context/AlertsContext";
import { useIngredients } from "../../context/IngredientsContext";

export function EditIngredient() {
  const navigate = useNavigate();
  const { ingredientId } = useParams();
  const { editIngredientById, getIngredientById, ingredient, setIngredient } =
    useIngredients();
  const { addAlert } = useAlerts();

  const [formData, setFormData] = useState({
    name: "",
    base_unit: "",
    quantity_in_stock: 0,
  });

  useEffect(() => {
    async function loadIngredient() {
      try {
        const ingredientRecords = await getIngredientById(ingredientId);
        setIngredient(ingredientRecords);
      } catch (error) {
        addAlert(
          "Failed to load ingredient.",
          "danger",
          "getIngredientById-failure"
        );
        console.error(error);
      }
    }
    loadIngredient();
  }, [ingredientId]);

  // Pre-load existing data
  useEffect(() => {
    if (!ingredient.name) return;
    setFormData({
      name: ingredient.name,
      base_unit: ingredient.base_unit,
      quantity_in_stock: ingredient.quantity_in_stock,
    });
  }, [ingredient]);

  async function handleSubmit(formData, event) {
    try {
      event.preventDefault();
      const message = `Save changes to ${ingredient.name}?`;
      if (window.confirm(message)) {
        const updatedRecord = await editIngredientById(ingredientId, formData);
        addAlert(
          `Successfully edited ingredient: ${updatedRecord.name}`,
          "info",
          "editIngredientById-success"
        );
        return navigate(`/ingredients/${updatedRecord.ingredient_id}`);
      }
    } catch (error) {
      addAlert(
        `Failed to edit ingredient ${ingredient.name}: ${error.message}!`,
        "danger",
        "editIngredientById-failure"
      );
      console.error(`Failed to edit ingredient ${ingredient.name}:`, error.message);
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
