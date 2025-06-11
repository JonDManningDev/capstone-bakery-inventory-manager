const service = require("./recipes.service");
const asyncHandler = require("../errors/asyncHandler");

// Handles checks for creating new recipes (POST), as well as modifying (PUT, DELETE)
async function recipeExists(req, res, next) {
  const { recipeId } = req.params;

  // New recipes will not have a recipeId yet
  if (!recipeId) {
    const { title } = req.body.data;
    const recipe = await service.readByTitle(title);
    if (!recipe) {
      return next();
    } else {
      return next({
        status: 409,
        message: `Recipe with title ${title} already exists.`,
      });
    }
  }

  // Existing recipes should have a recipeId
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

function validateRecipe(req, res, next) {
  const recipe = req.body.data;

  if (!recipe) {
    return next({
      status: 400,
      message: "Recipe data is required",
    });
  }

  const { title, description } = recipe;

  if (!title) {
    return next({
      status: 400,
      message: "Recipe title is required",
    });
  }

  if (!description) {
    return next({
      status: 400,
      message: "Recipe description is required",
    });
  }

  return next();
}

module.exports = {
  recipeExists: asyncHandler(recipeExists),
  recipeIngredientExists: asyncHandler(recipeIngredientExists),
  validateRecipe: asyncHandler(validateRecipe),
};
