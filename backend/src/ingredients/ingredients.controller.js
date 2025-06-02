const service = require("./ingredients.service");
const asyncHandler = require("../errors/asyncHandler");
const middleware = require("./ingredients.middleware");

// Route Functions:

async function list(req, res, next) {
  return res.json({ data: await service.list() });
}

async function listRecipeIngredients(req, res, next) {
  const { recipeId } = req.params;
  return res.json({ data: await service.listRecipeIngredients(recipeId) });
}

async function read(req, res, next) {
  const ingredient = res.locals.ingredient;
  return res.json({ data: ingredient });
}

async function subtractIngredients(req, res, next) {
  const { recipeId } = req.params;
  const recipeIngredients = await service.listRecipeIngredients(recipeId);
  await service.subtractIngredients(recipeIngredients);
}

module.exports = {
  list: asyncHandler(list),
  listRecipeIngredients: asyncHandler(listRecipeIngredients),
  read: [asyncHandler(middleware.ingredientExists), asyncHandler(read)],
  subtractIngredients: asyncHandler(subtractIngredients),
};