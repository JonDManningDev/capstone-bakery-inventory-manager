// Displays information about a recipe, along with options to edit its ingredients, create a bake, or delete the recipe

import { useEffect, useState, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { useAlerts } from "../../context/AlertsContext";
import { useAuth } from "../../context/AuthContext";
import { useBakes } from "../../context/BakesContext";
import { useRecipes } from "../../context/RecipesContext";
import { useIngredients } from "../../context/IngredientsContext";
import { useUnits } from "../../context/UnitsContext";
import { RecipeIngredientsList } from "./RecipeIngredientsList";
import { AddIngredientForm } from "./AddIngredientForm";
import { getIngredientShortages } from "../../utils/getIngredientShortages";

export function ViewRecipe() {
  const { addAlert } = useAlerts();
  const { user } = useAuth();
  const { createBake } = useBakes();
  const {
    ingredients,
    getIngredients,
    setIngredient,
    setIngredients,
    subtractBakeIngredients,
  } = useIngredients();
  const {
    recipe,
    getRecipeById,
    addRecipeIngredient,
    deleteRecipe,
    setRecipe,
  } = useRecipes();
  const { units, conversions } = useUnits();
  const { title, description, image_url } = recipe;
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const handleBakeAbortRef = useRef(null);

  // Keeps track of ingredient shortages that would prevent baking the recipe
  const [shortages, setShortages] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    async function loadRecipe() {
      try {
        const recipeRecord = await getRecipeById(recipeId, {
          signal: abortController.signal,
        });
        setRecipe(recipeRecord);
      } catch (error) {
        if (error.name !== "AbortError") {
          addAlert(
            `Failed to load recipe: ${error.message}!`,
            "danger",
            "getRecipeById-failure"
          );
          console.error("Failed to load recipe:", error.message);
        }
      }
    }
    loadRecipe();
    return () => abortController.abort();
  }, [recipeId, getRecipeById, setRecipe, addAlert]);

  useEffect(() => {
    const abortController = new AbortController();
    async function loadIngredients() {
      try {
        const ingredientsRecords = await getIngredients({
          signal: abortController.signal,
        });
        setIngredients(ingredientsRecords);
      } catch (error) {
        if (error.name !== "AbortError") {
          addAlert(
            `Failed to load ingredients: ${error.message}`,
            "danger",
            "getIngredients-failure"
          );
          console.error("Failed to load ingredients: ", error.message);
        }
      }
    }
    loadIngredients();
    return () => abortController.abort();
  }, [addAlert, getIngredients, setIngredients]);

  // Check for ingredient shortages that would prevent baking the recipe
  useEffect(() => {
    if (recipe?.ingredients && ingredients.length !== 0) {
      getIngredientShortages(recipe, ingredients, conversions, setShortages);
    }
  }, [recipe, ingredients, conversions]);

  // Update the bake button state based on shortages state
  const disableBake = shortages.length > 0;

  const handleDelete = (() => {
    let lastAbortController = null;
    return async function (recipe_id, title) {
      if (lastAbortController) {
        lastAbortController.abort();
      }
      const abortController = new AbortController();
      lastAbortController = abortController;
      try {
        const message = `Are you sure you want to delete the recipe ${title}?`;

        if (window.confirm(message)) {
          await deleteRecipe(recipe_id, { signal: abortController.signal });
          // Reset all states that could become stale after the deletion
          setRecipe({ ingredients: [] });
          setShortages([]);
          setIngredient({ name: "", base_unit: "", quantity_in_stock: 0 });
          addAlert(
            `Successfully deleted recipe: ${title}.`,
            "info",
            "deleteRecipe-success"
          );
          return navigate("/recipes");
        }
      } catch (error) {
        if (error.name === "AbortError") return;
        addAlert(
          `Failed to delete recipe ${title}: ${error.message}`,
          "danger",
          "deleteRecipe-failure"
        );
        console.error(`Failed to delete recipe ${title}:`, error.message);
      }
    };
  })();

  async function handleBake(recipeId, employeeId, title) {
    if (!employeeId) {
      addAlert(
        "You must log in before beginning a bake!",
        "danger",
        "handleBake-failure"
      );
      return;
    }

    // Abort any previous bake request
    if (handleBakeAbortRef.current) {
      handleBakeAbortRef.current.abort();
    }
    const abortController = new AbortController();
    handleBakeAbortRef.current = abortController;

    try {
      const bakeRecord = await createBake(recipeId, employeeId, {
        signal: abortController.signal,
      });
      await subtractBakeIngredients(recipeId, {
        signal: abortController.signal,
      });
      const updatedInventory = await getIngredients({
        signal: abortController.signal,
      });

      setIngredients(updatedInventory);
      addAlert(
        `Successfully added new bake! User: ${bakeRecord.employee.first_name} ${bakeRecord.employee.last_name}, Recipe: ${title}`,
        "success",
        "createBake-success"
      );
      return;
    } catch (error) {
      if (error.name !== "AbortError") {
        addAlert(
          `There was an error in creating the bake: ${error.message}!`,
          "danger",
          "createBake-failure"
        );
        console.error(
          "There was an error in creating the bake:",
          error.message
        );
      }
    } finally {
      handleBakeAbortRef.current = null;
    }
  }

  // Cleanup ongoing bake request on unmount
  useEffect(() => {
    return () => {
      if (handleBakeAbortRef.current) {
        handleBakeAbortRef.current.abort();
      }
    };
  }, []);

  if (!recipe.title) {
    return <h2>{`Recipe with ID ${recipeId} loading or not found.`}</h2>;
  }

  return (
    // Component container
    <div className="container p-2 my-4 border rounded bg-light">
      {/* Title and Actions */}
      <div className="row d-flex align-items-center justify-content-between m-2 rounded bg-secondary-subtle">
        <div className="col d-flex justify-content-start align-items-center p-2">
          <img
            src={image_url}
            alt={title}
            style={{ width: "80px", height: "80px", objectFit: "cover" }}
            className="rounded"
          ></img>
          <h2 className="ps-3">{title}</h2>
        </div>
        <div className="col d-flex justify-content-end p-2">
          <button
            id="recipeViewBake"
            className="btn btn-primary mx-1"
            onClick={() => handleBake(recipeId, user.employeeId, title)}
            disabled={disableBake}
          >
            Bake Recipe
          </button>
          <Link
            to={`/recipes/${recipeId}/edit`}
            role="button"
            className="btn btn-info mx-1"
          >
            Edit Recipe
          </Link>
          <button
            className="btn btn-danger mx-1"
            onClick={() => handleDelete(recipeId, title)}
          >
            Delete Recipe
          </button>
        </div>
      </div>
      {/* Description and Ingredients */}
      <div className="row d-flex align-items-start justify-content-between py-2 m-2">
        <div
          id="recipeDescription"
          className="col-12 col-md-4 bg-secondary-subtle rounded mb-2 mb-md-0"
        >
          <p className="lead">{description}</p>
        </div>
        <div
          id="editIngredients"
          className="col-12 col-md-7 border rounded bg-white mt-2 mt-md-0"
        >
          {/* Ingredient Shortages Alert */}
          {shortages.length > 0 && (
            <div className="alert alert-warning mt-3 mx-3">
              <h5 className="alert-heading">Ingredient Shortages</h5>
              <p>
                The following ingredients need to be replenished before baking:
              </p>
              <ul className="list-group list-group-flush mb-3">
                {shortages.map((shortage, index) => (
                  <li
                    key={index}
                    className="list-group-item list-group-item-warning"
                  >
                    <strong>{shortage.name}:</strong> {shortage.issue}
                    {shortage.available !== undefined && (
                      <span>
                        (Current stock: {shortage.available} {shortage.baseUnit}
                        )
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <h3 className="mt-3 mb-3 text-center">Ingredients Editor</h3>
          <div className="row p-2">
            <div className="col">
              <h4 className="border-bottom">Ingredient</h4>
            </div>
            <div className="col">
              <h4 className="border-bottom">Amount</h4>
            </div>
          </div>
          <RecipeIngredientsList recipe={recipe} />
          {/* Add Ingredient Form */}
          <div className="mt-4 p-3 border-top">
            <AddIngredientForm
              recipeId={recipe.recipe_id}
              title={recipe.title}
              recipeIngredients={recipe.ingredients}
              ingredients={ingredients}
              addRecipeIngredient={addRecipeIngredient}
              getRecipeById={getRecipeById}
              units={units}
              setRecipe={setRecipe}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
