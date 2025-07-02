// Renders the list of ingredients in a given recipe

import { RecipeIngredientsListItem } from "./RecipeIngredientsListItem";

export function RecipeIngredientsList({ recipe, setRecipe }) {
  const { ingredients } = recipe;

  const ingredientsSorted = ingredients.sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
  );

  const ingredientsList = ingredientsSorted.map((ingredient) => {
    return (
      <RecipeIngredientsListItem
        key={ingredient.id}
        recipeId={recipe.id}
        name={ingredient.name}
        title={recipe.title}
        amount_needed={ingredient.amount_needed}
        unit={ingredient.unit}
        ingredientId={ingredient.id}
        setRecipe={setRecipe}
      />
    );
  });

  return <div>{ingredientsList}</div>;
}
