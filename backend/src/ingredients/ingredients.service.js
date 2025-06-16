const knex = require("../db/connection");

const getConversionFactor =
  require("../units/units.service").getConversionFactor;

const tableName = "ingredients";

async function create(ingredientData) {
  const newRecords = await knex(tableName).insert(ingredientData).returning('*');
  return newRecords[0];
}

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

async function read(ingredientId) {
  // Get the ingredient information
  const ingredient = await knex(tableName)
    .select("*")
    .where({ ingredient_id: ingredientId })
    .first();

  if (!ingredient) {
    return null;
  }

  // Get the ingredient's related recipes separately
  const recipes = await knex("recipe_ingredients as ri")
    .join("recipes as r", "ri.recipe_id", "r.recipe_id")
    .select("r.recipe_id", "r.title")
    .where({ "ri.ingredient_id": ingredientId });

  //Return the combined ingredient object. The value of recipes will be an array of recipe objects.
  return {
    ingredient_id: ingredient.ingredient_id,
    name: ingredient.name,
    base_unit: ingredient.base_unit,
    quantity_in_stock: ingredient.quantity_in_stock,
    recipes,
  };
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

async function update(ingredientId, updates) {
  const updatedRecords = await knex(tableName).where({ ingredient_id: ingredientId }).update(updates).returning("*");
  return updatedRecords[0];
}


module.exports = {
  create,
  list,
  listRecipeIngredients,
  read,
  subtractIngredients,
  update,
};
