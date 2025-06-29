import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { RecipeForm } from "./RecipeForm";
import { useAlerts } from "../../context/AlertsContext";
import { useRecipes } from "../../context/RecipesContext";

export function CreateRecipe() {
  const navigate = useNavigate();
  const { createNewRecipe } = useRecipes();
  const { addAlert } = useAlerts();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image_url: "",
  });

  async function handleSubmit(formData, event) {
    try {
      event.preventDefault();
      const record = await createNewRecipe(formData);
      addAlert(
        `Successfully created new recipe: ${record.title}!`,
        "success",
        "createRecipe-success"
      );
      return navigate(`/recipes/${record.recipe_id}`);
    } catch (error) {
      addAlert(
        `Failed to create recipe ${formData.title}: ${error.message}`,
        "danger",
        "createRecipe-failure"
      );
      console.error(`Failed to create recipe ${formData.title}:`, error.message);
    }
  }

  return (
    <RecipeForm
      handleSubmit={handleSubmit}
      formData={formData}
      setFormData={setFormData}
    />
  );
}
