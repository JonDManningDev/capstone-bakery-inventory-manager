// Displays a list of all ingredients in the database, with an option to create a new ingredient

import { useEffect } from "react";
import { Link } from "react-router-dom";

import { IngredientsList } from "./IngredientsList";
import { useIngredients } from "../../context/IngredientsContext";
import { useAlerts } from "../../context/AlertsContext";

export function ViewIngredients() {
  const { ingredients, getIngredients, setIngredients } = useIngredients();
  const { addAlert } = useAlerts();

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
            `Failed to load ingredients: ${error.message}!`,
            "danger",
            "getIngredients-failure"
          );
          console.error("Failed to load ingredients:", error.message);
        }
      }
    }
    loadIngredients();
    return () => abortController.abort();
  }, [addAlert, getIngredients, setIngredients]);

  return (
    // Component container
    <div className="container col-11 col-md-6 col-lg-5 pb-4 my-4 border rounded bg-primary-subtle shadow">
      {/* Upper container */}
      <div
        className="d-flex justify-content-between bg-secondary p-4 mb-4 rounded-top"
        style={{ marginLeft: "-0.75rem", marginRight: "-0.75rem" }}
      >
        <div>
          <h3 className="text-light">Our Ingredients</h3>
        </div>
        <div id="ingredientsListActions">
          <Link to="/ingredients/new" role="button" className="btn btn-success">
            Create Ingredient
          </Link>
        </div>
      </div>

      {/* Lower container */}
      <IngredientsList ingredients={ingredients} />
    </div>
  );
}
