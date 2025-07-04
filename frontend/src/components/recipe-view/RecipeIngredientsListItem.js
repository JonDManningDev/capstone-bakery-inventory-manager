// Renders each individual ingredient in a recipe

import { useAlerts } from "../../context/AlertsContext";
import { useRecipes } from "../../context/RecipesContext";

export function RecipeIngredientsListItem({
  name,
  title,
  amount_needed,
  unit,
  ingredientId,
  recipeId,
  setRecipe,
}) {
  const { addAlert } = useAlerts();
  const { deleteRecipeIngredient, getRecipeById } = useRecipes();

  async function handleDelete() {
    try {
      // Delete the ingredient
      await deleteRecipeIngredient(ingredientId, recipeId, name, title);
      addAlert(
        `Successfully removed ${name} from ${title}.`,
        "info",
        "deleteRecipeIngredient-success"
      );
      // Refresh the state
      const recipeRecord = await getRecipeById(recipeId);
      setRecipe(recipeRecord);
    } catch (error) {
      addAlert(
        `Failed to remove ${name} from ${title}: ${error.message}!`,
        "danger",
        "deleteRecipeIngredient-failure"
      );
      console.error(`Failed to remove ${name} from ${title}:`, error.message);
    }
  }

  return (
    <div className="row p-2">
      <div className="col">
        <p>{name}</p>
      </div>
      <div className="col d-flex justify-content-between">
        <p>{`${amount_needed} ${unit}`}</p>
        <button
          type="button"
          className="btn btn-danger"
          aria-label={`Delete ${name} from ${title}`}
          onClick={() => handleDelete()}
        >
          <i className="bi bi-trash"></i>
        </button>
      </div>
    </div>
  );
}
