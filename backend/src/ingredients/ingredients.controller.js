const service = require("./ingredients.service");
const asyncHandler = require("../errors/asyncHandler");
const middleware = require("./ingredients.middleware");

// Route Functions:

async function create(req, res, next) {
  const ingredientData = req.body.data;
  return res.json({ data: await service.create(ingredientData) });
}

async function destroy(req, res, next) {
  const { ingredientId } = req.params;
  await service.delete(ingredientId);
  return res.sendStatus(204);
}

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

// This is used for updating the stock of ingredients when a recipe is baked
async function subtractIngredients(req, res, next) {
  const { recipeId } = req.params;
  const recipeIngredients = await service.listRecipeIngredients(recipeId);
  await service.subtractIngredients(recipeIngredients);
  return res.sendStatus(204);
}

async function update(req, res, next) {
  const { ingredientId } = req.params;
  const updates = req.body.data;
  return res.json({ data: await service.update(ingredientId, updates) });
}

module.exports = {
  create: [
    asyncHandler(middleware.ingredientExists),
    asyncHandler(middleware.validateIngredient),
    asyncHandler(create),
  ],
  delete: [asyncHandler(middleware.ingredientExists), asyncHandler(destroy)],
  list: asyncHandler(list),
  listRecipeIngredients: asyncHandler(listRecipeIngredients),
  read: [asyncHandler(middleware.ingredientExists), asyncHandler(read)],
  subtractIngredients: asyncHandler(subtractIngredients),
  update: [
    asyncHandler(middleware.ingredientExists),
    asyncHandler(middleware.validateIngredient),
    asyncHandler(update),
  ],
};
