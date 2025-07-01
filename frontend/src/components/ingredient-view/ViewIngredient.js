// Displays information for a given ingredient, including links to the recipes in which it is found

import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useAlerts } from "../../context/AlertsContext";
import { useIngredients } from "../../context/IngredientsContext";
import { useRecipes } from "../../context/RecipesContext";
import { IngredientRecipesList } from "./IngredientRecipesList";

export function ViewIngredient() {
  const navigate = useNavigate();
  const { ingredientId } = useParams();
  const { deleteIngredient, ingredient, getIngredientById, setIngredient } =
    useIngredients();
  const { addAlert } = useAlerts();
  const { setRecipe } = useRecipes();
  const { name, base_unit, quantity_in_stock } = ingredient;

  useEffect(() => {
    const abortController = new AbortController();
    async function loadIngredient() {
      try {
        const ingredientRecords = await getIngredientById(ingredientId, {
          signal: abortController.signal,
        });
        setIngredient(ingredientRecords);
      } catch (error) {
        if (error.name !== "AbortError") {
          addAlert(
            `Failed to load ingredient: ${error.message}!`,
            "danger",
            "getIngredientById-failure"
          );
          console.error("Failed to load ingredient: ", error.message);
        }
      }
    }
    loadIngredient();
    return () => abortController.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ingredientId]);

  async function handleDelete(ingredientId, name) {
    try {
      const message = `Are you sure you want to delete the ingredient ${name}?`;
      if (window.confirm(message)) {
        await deleteIngredient(ingredientId);
        // Reset the recipe and ingredient states to avoid errors from stale/invalid data
        setRecipe({ ingredients: [] });
        setIngredient({
          name: "",
          base_unit: "",
          quantity_in_stock: 0,
        });
        addAlert(
          `Successfully deleted ingredient: ${name}.`,
          "info",
          "deleteIngredient-success"
        );
        return navigate("/ingredients");
      }
    } catch (error) {
      addAlert(
        `Failed to delete ingredient ${name}: ${error.message}!`,
        "danger",
        "deleteIngredient-failure"
      );
      console.error(`Failed to delete ingredient ${name}:`, error.message);
    }
  }

  if (!ingredient.name) {
    return <h2>{`Ingredient with ID ${ingredientId} loading or not found.`}</h2>;
  }

  return (
    // Component container
    <div className="container p-2 my-4 border rounded bg-light">
      {/* Title and Actions */}
      <div className="row d-flex align-items-center justify-content-between m-2 rounded bg-secondary-subtle">
        <div className="col d-flex justify-content-start align-items-center p-2">
          <h2 className="ps-3">{name}</h2>
        </div>
        <div className="col d-flex justify-content-end p-2">
          <Link
            to={`/ingredients/${ingredientId}/edit`}
            role="button"
            className="btn btn-info mx-1"
          >
            Edit Ingredient
          </Link>
          <button
            className="btn btn-danger mx-1"
            onClick={() => handleDelete(ingredientId, name)}
          >
            Delete Ingredient
          </button>
        </div>
      </div>
      {/* Inventory and Recipe Details */}
      <div className="row d-flex align-items-start justify-content-between py-2 m-2">
        <div
          id="inventoryDetails"
          className="col-12 col-md-4 bg-secondary-subtle rounded mb-2 mb-md-0"
        >
          <h3 className="p-2">Inventory Details</h3>
          <div className="d-flex justify-content-around">
            <strong>Base Unit</strong>
            <p>{base_unit}</p>
          </div>
          <div className="d-flex justify-content-around">
            <strong>Qty in Stock</strong>
            <p>{`${quantity_in_stock} ${base_unit}`}</p>
          </div>
        </div>
        <div
          id="recipesWithIngredient"
          className="col-12 col-md-7 border rounded bg-white mt-2 mt-md-0"
        >
          <h3 className="mt-3 mb-3 text-center">Recipes with {name}</h3>
          <IngredientRecipesList ingredient={ingredient} />
        </div>
      </div>
    </div>
  );
}
