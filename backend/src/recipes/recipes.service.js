const knex = require("../db/connection");

const tableName = "recipes";

function addRecipeIngredient(recipeId, ingredientId, newIngredient) {
    return knex('recipe_ingredients')
        .where({ recipe_id: recipeId }, { ingredient_id: ingredientId })
        .insert(newIngredient);
}

function list() {
  return knex(tableName).select("*");
}

function destroyRecipeIngredient(recipeId, ingredientId) {
  return knex("recipe_ingredients")
    .where({ recipe_id: recipeId, ingredient_id: ingredientId })
    .del();
}

async function read(recipeId) {
  // Get the recipe information
  const recipe = await knex(tableName)
    .select("*")
    .where({ recipe_id: recipeId })
    .first();

  // Trigger the rejection in the validation middleware if no recipe exists
  if (!recipe) {
    return null;
  }

  // Get the recipe's ingredients separately
  const ingredients = await knex("recipe_ingredients as ri")
    .join("ingredients as i", "ri.ingredient_id", "i.ingredient_id")
    .select("i.ingredient_id", "i.name", "ri.amount_needed", "ri.unit")
    .where({ "ri.recipe_id": recipeId });

  // Return the combined recipe object. The value of ingredients will be an array of ingredient objects.
  return {
    recipe_id: recipe.recipe_id,
    title: recipe.title,
    description: recipe.description,
    image_url: recipe.image_url,
    ingredients,
  };
}

module.exports = {
    addRecipeIngredient,
  deleteRecipeIngredient: destroyRecipeIngredient,
  list,
  read,
};
