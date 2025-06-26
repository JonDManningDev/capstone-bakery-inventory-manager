import { RecipesListItem } from "./RecipesListItem";

export function RecipesList({ recipes }) {
  // Sort by alphabetical order
  const recipesSorted = recipes.sort((a, b) =>
    a.title.localeCompare(b.title, undefined, { sensitivity: "base" })
  );

  const recipesList = recipesSorted.map((recipe) => (
    <RecipesListItem
      key={recipe.recipe_id}
      title={recipe.title}
      image_url={recipe.image_url}
      id={recipe.recipe_id}
    />
  ));

  return (
    <div className="list-group py-4">
      {recipes.length > 0 ? recipesList : <p>No recipes found.</p>}
    </div>
  );
}
