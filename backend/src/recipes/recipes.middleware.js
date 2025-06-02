const service = require("./recipes.service");
const asyncHandler = require("../errors/asyncHandler");

/**
 * Checks if a recipe exists by ID and attaches it to res.locals
 */
async function recipeExists(req, res, next) {
  const { recipeId } = req.params;
  const recipe = await service.read(recipeId);
  if (!recipe) {
    return next({
      status: 404,
      message: `Recipe with ID ${recipeId} not found.`,
    });
  } else {
    res.locals.recipe = recipe;
    return next();
  }
}

/**
 * Checks if an ingredient exists in a recipe
 */
function recipeIngredientExists(req, res, next) {
  const { ingredients } = res.locals.recipe;
  const { name, ingredient_id } = res.locals.ingredient;
  const method = req.method;
  const title = res.locals.recipe.title;
  const match = ingredients.find(
    (ingredient) => ingredient.ingredient_id === ingredient_id
  );

  if (method === "DELETE") {
    if (!match) {
      return next({
        status: 404,
        message: `Recipe ${title} does not contain ${name}.`,
      });
    } else {
      res.locals.ingredient = match;
      return next();
    }
  }

  if (method === "POST") {
    if (match) {
      return next({
        status: 409,
        message: `Recipe ${title} already contains ${name}`,
      });
    } else {
      return next();
    }
  }
}

module.exports = {
  recipeExists: asyncHandler(recipeExists),
  recipeIngredientExists: asyncHandler(recipeIngredientExists),
};
