import { useEffect } from "react";

import { RecipesListing } from "./RecipesListing";
import { useRecipes } from "../../context/RecipesContext";

export function RecipesList() {
  const { recipes, getRecipes } = useRecipes();

  // Automatically fetch recipes and load into state on component load
  useEffect(() => {
    getRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sort by alphabetical order
  const recipesSorted = recipes.sort((a, b) =>
    a.title.localeCompare(b.title, undefined, { sensitivity: "base" })
  );  

  // Transform the recipes into a set (list) of individual entries (listings)
  const recipesList = recipesSorted.map((recipe) => (
    <RecipesListing
      key={recipe.recipe_id}
      title={recipe.title}
      image_url={recipe.image_url}
      id={recipe.recipe_id}
    />
  ));

  // Render the list
  return <div className="list-group py-4">{recipesList}</div>;
}
