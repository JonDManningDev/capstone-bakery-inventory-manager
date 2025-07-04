// View for creating a new recipe.

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { RecipeForm } from "./RecipeForm";
import { useAlerts } from "../../context/AlertsContext";
import { useRecipes } from "../../context/RecipesContext";

export function CreateRecipe() {
  const navigate = useNavigate();
  const { createNewRecipe, getRecipes } = useRecipes();
  const { addAlert } = useAlerts();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image_url: "",
  });

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
        // Check for an existing record with the same title
        const recipeRecords = await getRecipes({ signal: abortController.signal });
        const titleExists = recipeRecords.some(
          (recipe) => recipe.title === formData.title
        );
        if (titleExists) {
          addAlert(
            `Recipe with title ${formData.title} already exists!`,
            "danger",
            "createRecipe-duplicate"
          );
          return;
        }
        // Then proceed to create the new recipe
        const record = await createNewRecipe(formData, {
          signal: abortController.signal,
        });
        addAlert(
          `Successfully created new recipe: ${record.title}!`,
          "success",
          "createRecipe-success"
        );
        return navigate(`/recipes/${record.id}`);
      } catch (error) {
        if (error.name === "AbortError") return;
        addAlert(
          `Failed to create recipe ${formData.title}: ${error.message}`,
          "danger",
          "createRecipe-failure"
        );
        console.error(
          `Failed to create recipe ${formData.title}:`,
          error.message
        );
      }
    };
  })();

  return (
    <RecipeForm
      handleSubmit={handleSubmit}
      formData={formData}
      setFormData={setFormData}
    />
  );
}
