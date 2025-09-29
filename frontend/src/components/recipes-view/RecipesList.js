// Renders the list of recipes

import { RecipesListItem } from "./RecipesListItem";

export function RecipesList({ recipes }) {
  // Sort by alphabetical order
  const recipesSorted = recipes.sort((a, b) =>
    a.title.localeCompare(b.title, undefined, { sensitivity: "base" })
  );

  const recipesList = recipesSorted.map((recipe) => (
    <RecipesListItem
      key={recipe.id}
      title={recipe.title}
      image_url={recipe.image_url}
      id={recipe.id}
    />
  ));

  return (
    <div className="list-group">
      {recipes.length > 0 ? recipesList : <p>Recipes loading or not found.</p>}
    </div>
  );
}
