import { useRecipes } from "../../context/RecipesContext";

export function RecipeIngredientsListing({ name, title, amount_needed, unit, ingredientId, recipeId }) {
    const { deleteRecipeIngredient, getRecipeById } = useRecipes();

    function handleDelete() {
        // Delete the ingredient
        deleteRecipeIngredient(ingredientId, recipeId, name, title);
        // Refresh the state
        getRecipeById(recipeId);
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
