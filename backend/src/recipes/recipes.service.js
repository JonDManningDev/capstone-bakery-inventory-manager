const knex = require("../db/connection");

const tableName = "recipes";

function addRecipeIngredient(newIngredient) {
  return knex("recipe_ingredients").insert(newIngredient);
}

async function create(newRecipe) {
  const newRecords = await knex(tableName).insert(newRecipe).returning("*");

  return newRecords[0];
}

function destroyRecipe(recipeId) {
  return knex(tableName).where({ id: recipeId }).del();
}

function destroyRecipeIngredient(recipeId, ingredientId) {
  return knex("recipe_ingredients")
    .where({ recipe_id: recipeId, ingredient_id: ingredientId })
    .del();
}

function list() {
  return knex(tableName).select("*");
}

async function read(recipeId) {
  // Get the recipe information
  const recipe = await knex(tableName)
    .select("*")
    .where({ id: recipeId })
    .first();

  if (!recipe) {
    return null;
  }

  // Get the recipe's ingredients separately
  const ingredients = await knex("recipe_ingredients as ri")
    .join("ingredients as i", "ri.ingredient_id", "i.id")
    .select("i.id", "i.name", "ri.amount_needed", "ri.unit")
    .where({ "ri.recipe_id": recipeId });

  // Return the combined recipe object. The value of ingredients will be an array of ingredient objects.
  return {
    id: recipe.id,
    title: recipe.title,
    description: recipe.description,
    image_url: recipe.image_url,
    ingredients,
  };
}

// This is only used to validate a new recipe by making sure no recipe with the same title exists
function readByTitle(title) {
  return knex(tableName).select("*").where({ title }).first();
}

async function update(recipeId, updates) {
  const updatedRecords = await knex(tableName)
    .where({ id: recipeId })
    .update(updates)
    .returning("*");

  return updatedRecords[0];
}

module.exports = {
  addRecipeIngredient,
  create,
  deleteRecipe: destroyRecipe,
  deleteRecipeIngredient: destroyRecipeIngredient,
  list,
  read,
  readByTitle,
  update,
};
