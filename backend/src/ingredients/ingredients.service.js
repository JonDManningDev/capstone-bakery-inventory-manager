const knex = require("../db/connection");

const getConversionFactor =
  require("../units/units.service").getConversionFactor;

const tableName = "ingredients";

function list() {
  return knex(tableName).select("*");
}

function listRecipeIngredients(recipeId) {
  return knex(`${tableName} as i`)
    .join("recipe_ingredients as ri", "i.ingredient_id", "ri.ingredient_id")
    .select(
      "ri.ingredient_id",
      "ri.amount_needed",
      "ri.unit as from_unit",
      "i.base_unit as to_unit",
      "i.quantity_in_stock"
    )
    .where({ "ri.recipe_id": recipeId });
}

function read(ingredientId) {
  return knex(tableName).where({ ingredient_id: ingredientId }).first();
}

async function subtractIngredients(recipeIngredients) {
    // Convert to same unit and subtract
  const ingredientUpdates = await Promise.all(
    recipeIngredients.map(async (ingredient) => {
      let conversionFactor = 1;
      if (ingredient.from_unit !== ingredient.to_unit)
        conversionFactor = getConversionFactor(
          ingredient.from_unit,
          ingredient.to_unit
        );
      const convertedAmount = ingredient.amount_needed * conversionFactor;
      const newQuantity = ingredient.quantity_in_stock - convertedAmount;

    // Return a simplified array with only the values needed for the update
      return [ingredient.ingredient_id, newQuantity];
    })
  );
  // Format and join the array elements in SQL syntax
  const rawValues = ingredientUpdates
    .map(
      ([ingredient_id, quantity_in_stock]) =>
        `(${ingredient_id}, ${quantity_in_stock})`
    )
    .join(", ");

    // Add the formatted values to a raw SQL query to make all updates in one go
  const rawQuery = `UPDATE ingredients AS i 
  SET quantity_in_stock = v.new_quantity 
  FROM (VALUES ${rawValues}) AS v(ingredient_id, new_quantity) 
  WHERE i.ingredient_id = v.ingredient_id`;

  await knex.raw(rawQuery);
}

module.exports = {
  list,
  listRecipeIngredients,
  read,
  subtractIngredients,
};
