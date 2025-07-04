const service = require("./recipes.service");
const asyncHandler = require("../errors/asyncHandler");

// Handles checks for creating new recipes (POST), as well as modifying/getting existing (GET, PUT, DELETE)
async function recipeExists(req, res, next) {
  const { recipeId } = req.params;

  // New recipes (POST) will not have a recipeId yet, so check for duplicate title
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

  // Existing recipes (GET, PUT, DELETE) should have a recipeId
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

// This is used to check if a recipe contains a specific ingredient when adding or deleting ingredients
function recipeIngredientExists(req, res, next) {
  const { ingredients } = res.locals.recipe;
  const { name, id } = res.locals.ingredient;
  const method = req.method;
  const title = res.locals.recipe.title;
  const match = ingredients.find(
    (ingredient) => ingredient.id === id
  );

  // When deleting, use this logic path
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

  // When adding, use this logic path
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

  const { title, description, image_url } = recipe;

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

  if (!image_url) {
    return next({
      status: 400,
      message: "Recipe image URL is required",
    });
  } 

  return next();
}

module.exports = {
  recipeExists: asyncHandler(recipeExists),
  recipeIngredientExists: asyncHandler(recipeIngredientExists),
  validateRecipe: asyncHandler(validateRecipe),
};
