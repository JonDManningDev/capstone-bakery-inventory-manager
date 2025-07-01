// Renders the list of ingredients from the database

import { IngredientListItem } from "./IngredientListItem";

export function IngredientsList({ ingredients }) {
  // Sort ingredients alphabetically by name
  const ingredientsSorted = ingredients.sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
  );

  const ingredientsList = ingredientsSorted.map((ingredient) => (
    <IngredientListItem
      key={ingredient.ingredient_id}
      name={ingredient.name}
      id={ingredient.ingredient_id}
    />
  ));

  return (
    <div className="list-group py-4">
      {ingredients.length > 0 ? ingredientsList : <p>Ingredients loading or not found.</p>}
    </div>
  );
}
