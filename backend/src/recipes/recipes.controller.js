const service = require("./recipes.service");
const asyncHandler = require("../errors/asyncHandler");
const middleware = require("./recipes.middleware");
const ingredientsMiddleware = require("../ingredients/ingredients.middleware");

// Route Functions:

async function addRecipeIngredient(req, res, next) {
  const { recipeId, ingredientId } = req.params;
  const { amount_needed, unit } = req.body.data;
  
  const newIngredient = {
    recipe_id: recipeId,
    ingredient_id: ingredientId,
    amount_needed,
    unit,
  };
  
  return res.json({ data: await service.addRecipeIngredient(newIngredient) });
}

async function create(req, res, next) {
  const newRecipe = req.body.data;
  return res.status(201).json({ data: await service.create(newRecipe) });
}

async function destroyRecipe(req, res, next) {
  const { recipeId } = req.params;
  await service.deleteRecipe(recipeId);
  return res.json({ data: res.locals.recipe });
}

async function destroyRecipeIngredient(req, res, next) {
  const { recipeId, ingredientId } = req.params;
  await service.deleteRecipeIngredient(recipeId, ingredientId);
  return res.sendStatus(204);
}

async function list(req, res, next) {
  return res.json({ data: await service.list() });
}

async function read(req, res, next) {
  return res.json({ data: res.locals.recipe });
}

async function update(req, res, next) {
  const { recipeId } = req.params;
  const updates = req.body.data;
  return res.json({ data: await service.update(recipeId, updates) });
}

module.exports = {
  addRecipeIngredient: [
    asyncHandler(middleware.recipeExists),
    asyncHandler(ingredientsMiddleware.ingredientExists),
    asyncHandler(middleware.recipeIngredientExists),
    asyncHandler(addRecipeIngredient),
  ],
  create: [
    asyncHandler(middleware.validateRecipe),
    asyncHandler(middleware.recipeExists),
    asyncHandler(create),
  ],
  deleteRecipe: [
    asyncHandler(middleware.recipeExists),
    asyncHandler(destroyRecipe),
  ],
  deleteRecipeIngredient: [
    asyncHandler(middleware.recipeExists),
    asyncHandler(ingredientsMiddleware.ingredientExists),
    asyncHandler(middleware.recipeIngredientExists),
    asyncHandler(destroyRecipeIngredient),
  ],
  list: asyncHandler(list),
  read: [asyncHandler(middleware.recipeExists), asyncHandler(read)],
  update: [asyncHandler(middleware.recipeExists), asyncHandler(update)],
};
