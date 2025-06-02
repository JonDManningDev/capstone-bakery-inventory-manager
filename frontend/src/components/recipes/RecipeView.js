import { useEffect, useState } from "react";
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

export function RecipeView() {
  const { addAlert } = useAlerts();
  const { user } = useAuth();
  const { createBake } = useBakes();
  const { ingredients, getIngredients, subtractBakeIngredients } =
    useIngredients();
  const { recipe, getRecipeById, addRecipeIngredient, deleteRecipe } =
    useRecipes();
  const { units, conversions } = useUnits();
  const { title, description, image_url } = recipe;
  const { recipeId } = useParams();
  const navigate = useNavigate();

  // Keeps track of ingredient shortages that would prevent baking the recipe
  const [shortages, setShortages] = useState([]);
  
  useEffect(() => {
    getRecipeById(recipeId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipeId]);

  
  useEffect(() => {
    getIngredients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Check for ingredient shortages that would prevent baking the recipe
  useEffect(() => {
    if (recipe?.ingredients && ingredients?.length > 0) {
      getIngredientShortages(recipe, ingredients, conversions, setShortages);
    }
  }, [recipe, ingredients, conversions]);

  // Update the bake button state based on shortages
  useEffect(() => {
    const bakeButton = document.getElementById("recipeViewBake");

    if (shortages && shortages.length > 0) {
      if (!bakeButton.classList.contains("disabled")) {
        bakeButton.classList.add("disabled");
      }
    } else {
      if (bakeButton.classList.contains("disabled")) {
        bakeButton.classList.remove("disabled");
      }
    }
  }, [shortages]);

  async function handleDelete(recipe_id, title) {
    const message = `Are you sure you want to delete the recipe ${title}?`;
    if (window.confirm(message)) {
      await deleteRecipe(recipe_id, title);
      return navigate("/recipes");
    }
  }

  async function handleBake(recipeId, employeeId, title) {
    if (!employeeId) {
      return addAlert(
        "You must log in before beginning a bake!",
        "danger",
        "handleBake-failure"
      );
    }
    await createBake(recipeId, employeeId, title);
    await subtractBakeIngredients(recipeId);
    await getIngredients();
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
          >
            Bake Recipe
          </button>
          <Link
            to="/recipes/:recipeId/edit"
            role="button"
            className="btn btn-info mx-1"
          >
            Edit Recipe
          </Link>
          <button
            className="btn btn-danger mx-1"
            onClick={() => handleDelete(recipe.recipe_id, recipe.title)}
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
        </div>{" "}
        <div
          id="editIngredients"
          className="col-12 col-md-7 border rounded bg-white mt-2 mt-md-0"
        >
          {/* Ingredient Shortages Alert */}
          {shortages && shortages.length > 0 && (
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
                        {" "}
                        (Current stock: {shortage.available} {shortage.unit})
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
              ingredients={ingredients}
              addRecipeIngredient={addRecipeIngredient}
              getRecipeById={getRecipeById}
              units={units}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
