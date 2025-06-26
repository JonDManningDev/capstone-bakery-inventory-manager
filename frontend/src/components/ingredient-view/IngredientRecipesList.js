import { IngredientRecipesListItem } from "./IngredientRecipesListItem";

export function IngredientRecipesList({ ingredient }) {
  const { recipes } = ingredient;

  const recipesSorted = recipes.sort((a, b) =>
    a.title.localeCompare(b.title, undefined, { sensitivity: "base" })
  );

  const recipesList = recipesSorted.map((recipe) => {
    return (
      <IngredientRecipesListItem
        key={recipe.recipe_id}
        recipeId={recipe.recipe_id}
        title={recipe.title}
      />
    );
  });

  return <div className="list-group py-2">{recipes.length > 0 ? recipesList : <p>No recipes found.</p>}</div>
}
