import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { RecipeForm } from "./RecipeForm";
import { useAlerts } from "../../context/AlertsContext";
import { useRecipes } from "../../context/RecipesContext";

export function EditRecipe() {
  const navigate = useNavigate();
  const { recipeId } = useParams();
  const { editRecipeById, getRecipeById, recipe } = useRecipes();
  const { addAlert } = useAlerts();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image_url: "",
  });

  useEffect(() => {
    async function loadRecipe(recipeId) {
      try {
        await getRecipeById(recipeId);
      } catch (error) {
        console.error(error);
      }
    }
    loadRecipe(recipeId);
  }, []);

  useEffect(() => {
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
          `Successfully edited recipe: ${updatedRecord.title}.`,
          "info",
          "editRecipeById-success"
        );
        return navigate(`/recipes/${updatedRecord.recipe_id}`);
      }
    } catch (error) {
      addAlert(error.message, "danger", "editRecipeById-failure");
      console.error(error);
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
