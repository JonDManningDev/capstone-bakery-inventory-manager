// Renders the list of ingredients in a given recipe

import { RecipeIngredientsListItem } from "./RecipeIngredientsListItem";

export function RecipeIngredientsList({ recipe }) {
  const { ingredients } = recipe;

  const ingredientsSorted = ingredients.sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
  );

  const ingredientsList = ingredientsSorted.map((ingredient) => {
    return (
      <RecipeIngredientsListItem
        key={ingredient.ingredient_id}
        recipeId={recipe.recipe_id}
        name={ingredient.name}
        title={recipe.title}
        amount_needed={ingredient.amount_needed}
        unit={ingredient.unit}
        ingredientId={ingredient.ingredient_id}
      />
    );
  });

  return <div>{ingredientsList}</div>;
}
