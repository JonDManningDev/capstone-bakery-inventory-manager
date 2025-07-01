// View for editing an existing recipe.

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { RecipeForm } from "./RecipeForm";
import { useAlerts } from "../../context/AlertsContext";
import { useRecipes } from "../../context/RecipesContext";

export function EditRecipe() {
  const navigate = useNavigate();
  const { recipeId } = useParams();
  const { editRecipeById, getRecipeById, recipe, setRecipe } = useRecipes();
  const { addAlert } = useAlerts();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image_url: "",
  });

  useEffect(() => {
    async function loadRecipe(recipeId) {
      try {
        const recipeRecord = await getRecipeById(recipeId);
        setRecipe(recipeRecord);
      } catch (error) {
        addAlert(
          `Failed to load recipe: ${error.message}`,
          "danger",
          "getRecipeById-failure"
        );
        console.error("Failed to load recipe:", error.message);
      }
    }
    loadRecipe(recipeId);
  }, [addAlert, getRecipeById, recipeId, setRecipe]);

  // Pre-load existing data
  useEffect(() => {
    if (!recipe.title) return;
    setFormData({
      title: recipe.title,
      description: recipe.description,
      image_url: recipe.image_url,
    });
  }, [recipe]);

  async function handleSubmit(formData, event) {
    try {
      event.preventDefault();
      const message = `Save changes to ${recipe.title}?`;
      if (window.confirm(message)) {
        const updatedRecord = await editRecipeById(recipeId, formData);
        addAlert(
          `Successfully edited recipe ${updatedRecord.title}.`,
          "info",
          "editRecipeById-success"
        );
        return navigate(`/recipes/${updatedRecord.recipe_id}`);
      }
    } catch (error) {
      addAlert(
        `Failed to edit recipe ${recipe.title}: ${error.message}!`,
        "danger",
        "editRecipeById-failure"
      );
      console.error(`Failed to edit recipe ${recipe.title}:`, error.message);
    }
  }

  if (!recipe.title) {
    return <h2>{`Recipe with ID ${recipeId} loading or not found.`}</h2>;
  }

  return (
    <RecipeForm
      handleSubmit={handleSubmit}
      formData={formData}
      setFormData={setFormData}
    />
  );
}
