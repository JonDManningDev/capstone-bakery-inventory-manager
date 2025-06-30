// Home contains links to the different sections of the app, along with some statistics for each

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAlerts } from "../context/AlertsContext";
import { useBakes } from "../context/BakesContext";
import { useRecipes } from "../context/RecipesContext";
import { useIngredients } from "../context/IngredientsContext";
import { getCurrentBakes } from "../utils/getCurrentBakes";

export function Home() {
  const { addAlert } = useAlerts();
  const { getBakes } = useBakes();
  const { getRecipes } = useRecipes();
  const { getIngredients } = useIngredients();

  const [bakesStats, setBakesStats] = useState({
    dailyStarted: 0,
    dailyComplete: 0,
    dailyCanceled: 0,
  });
  const [recipesTotal, setRecipesTotal] = useState(0);
  const [ingredientsTotal, setIngredientsTotal] = useState(0);

  // Fetch bakes and calculate stats
  useEffect(() => {
    const bakesController = new AbortController();
    async function loadBakes() {
      try {
        const bakes = await getBakes({ signal: bakesController.signal });
        const currentBakes = getCurrentBakes(bakes);
        const statsHolder = { dailyStarted: 0, dailyComplete: 0, dailyCanceled: 0 };
        currentBakes.forEach((bake) => {
            if (bake.status === "started") statsHolder.dailyStarted++;
            else if (bake.status === "complete") statsHolder.dailyComplete++;
            else if (bake.status === "canceled") statsHolder.dailyCanceled++;
        });
        setBakesStats(statsHolder);
      } catch (error) {
        if (error.name === "AbortError") return;
        addAlert(
          `Failed to load bakes: ${error.message}!`,
          "danger",
          "getBakes-failure"
        );
        console.error("Failed to load bakes:", error.message);
      }
    }
    loadBakes();
    return () => bakesController.abort();
  }, [getBakes]);

  // Fetch recipes
  useEffect(() => {
    const recipesController = new AbortController();
    async function loadRecipes() {
      try {
        const recipes = await getRecipes({ signal: recipesController.signal });
        setRecipesTotal(recipes.length);
      } catch (error) {
        if (error.name === "AbortError") return;
        addAlert(
          `Failed to load recipes: ${error.message}!`,
          "danger",
          "getRecipes-failure"
        );
        console.error("Failed to load recipes:", error.message);
      }
    }
    loadRecipes();
    return () => recipesController.abort();
  }, [getRecipes]);

  // Fetch ingredients
  useEffect(() => {
    const ingredientsController = new AbortController();
    async function loadIngredients() {
      try {
        const ingredients = await getIngredients({
          signal: ingredientsController.signal,
        });
        setIngredientsTotal(ingredients.length);
      } catch (error) {
        if (error.name === "AbortError") return;
        addAlert(
          `Failed to load ingredients: ${error.message}!`,
          "danger",
          "getIngredients-failure"
        );
        console.error("Failed to load ingredients:", error.message);
      }
    }
    loadIngredients();
    return () => ingredientsController.abort();
  }, [getIngredients]);

  const dailyCount =
    bakesStats.dailyStarted +
    bakesStats.dailyComplete +
    bakesStats.dailyCanceled;

  return (
    <div className="container text-center py-4">
      <div className="row d-flex align-items-center">
        <h1 className="col-12 display-4 fw-normal">Maeve's Fine Baked Goods</h1>
        <h2 className="col-12 display-6 fw-light fst-italic">
          Bakery Management System
        </h2>
      </div>
      <div
        className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 my-4"
        style={{ height: "250px" }}
      >
        <div className="col h-100">
          <div className="card h-100 bg-light">
            <div className="card-body d-flex flex-column justify-content-between">
              <h3 className="card-title border-bottom">
                {`Bakes `}
                <i className="bi-list-check"></i>
              </h3>
              <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-evenly">
                <div
                  id="bakesActions"
                  className="d-flex justify-content-evenly w-100"
                >
                  <Link to="/bakes" role="button" className="btn btn-primary">
                    <i className="bi-eye"></i>
                    {` View Bakes`}
                  </Link>
                </div>
                <div
                  id="bakesStats"
                  className="d-flex flex-column justify-content-evenly w-100"
                >
                  <div id="bakesTotal">
                    <h5>{`There have been ${dailyCount} bakes today.`}</h5>
                  </div>
                  <div
                    id="bakesCategories"
                    className="d-flex justify-content-evenly w-100"
                  >
                    <p className="p-2 border rounded bg-info text-white">{`Started: ${bakesStats.dailyStarted}`}</p>
                    <p className="p-2 border rounded bg-success text-white">{`Complete: ${bakesStats.dailyComplete}`}</p>
                    <p className="p-2 border rounded bg-danger text-white">{`Canceled: ${bakesStats.dailyCanceled}`}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col h-100">
          <div className="card h-100 bg-light">
            <div className="card-body d-flex flex-column justify-content-between">
              <h3 className="card-title border-bottom">
                {`Recipes `}
                <i className="bi-clipboard2-heart"></i>
              </h3>
              <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-evenly">
                <div
                  id="recipesActions"
                  className="d-flex justify-content-evenly w-100"
                >
                  <Link to="/recipes" role="button" className="btn btn-primary">
                    <i className="bi-eye"></i>
                    {` View Recipes`}
                  </Link>
                  <Link
                    to="/recipes/new"
                    role="button"
                    className="btn btn-success"
                  >
                    <i className="bi-plus"></i>
                    {` Create Recipe`}
                  </Link>
                </div>
                <div id="recipesTotal">
                  <h5>{`There are ${recipesTotal} recipes in the database.`}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col h-100">
          <div className="card h-100 bg-light">
            <div className="card-body d-flex flex-column justify-content-between">
              <h3 className="card-title border-bottom">
                {`Ingredients `}
                <i className="bi bi-measuring-cup"></i>
              </h3>
              <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-evenly">
                <div
                  id="ingredientsActions"
                  className="d-flex justify-content-evenly w-100"
                >
                  <Link
                    to="/ingredients"
                    role="button"
                    className="btn btn-primary"
                  >
                    <i className="bi-eye"></i>
                    {` View Ingredients`}
                  </Link>
                  <Link
                    to="/ingredients/new"
                    role="button"
                    className="btn btn-success"
                  >
                    <i className="bi-plus"></i>
                    {` Create Ingredient`}
                  </Link>
                </div>
                <div id="ingredientsTotal">
                  <h5>{`There are ${ingredientsTotal} ingredients in the database.`}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
