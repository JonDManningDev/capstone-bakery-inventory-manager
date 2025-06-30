const service = require("./ingredients.service");
const asyncHandler = require("../errors/asyncHandler");

// Handles checks for creating new recipes (POST), as well as modifying/getting existing (GET, PUT, DELETE)
async function ingredientExists(req, res, next) {
  const { ingredientId } = req.params;

  // New ingredients (POST) will not have an ingredientId yet, so check for duplicate name
  if (!ingredientId) {
    const { name } = req.body.data;
    const ingredient = await service.readByName(name);
    if (!ingredient) {
      return next();
    } else {
      return next({
        status: 409,
        message: `Ingredient with name ${name} already exists.`,
      });
    }
  }

  // Existing ingredients (GET, PUT, DELETE) should have an ingredientId
  const ingredient = await service.read(ingredientId);
  if (!ingredient) {
    return next({
      status: 404,
      message: `Could not find ingredient with ID ${ingredientId}`,
    });
  } else {
    res.locals.ingredient = ingredient;
    return next();
  }
}

function validateIngredient(req, res, next) {
  const ingredientData = req.body.data;

  if (!ingredientData) {
    return next({
      status: 400,
      message: `Ingredient data is required for a ${req.method} request.`,
    });
  }

  const requiredFields = ["name", "base_unit", "quantity_in_stock"];
  const invalidFields = [];
  const missingFields = [];

  // Check for invalid fields
  for (const field of Object.keys(ingredientData)) {
    if (!requiredFields.includes(field)) invalidFields.push(field);
  }

  if (invalidFields.length > 0)
    return next({
      status: 400,
      message: `Submission contains invalid fields: ${invalidFields.join(
        ", "
      )}.`,
    });

  // Check for missing fields
  for (const field of requiredFields) {
    if (!Object.keys(ingredientData).includes(field)) missingFields.push(field);
  }

  if (missingFields.length > 0)
    return next({
      status: 400,
      message: `Submission contains missing fields: ${missingFields.join(
        ", "
      )}.`,
    });

  return next();
}

module.exports = {
  ingredientExists: asyncHandler(ingredientExists),
  validateIngredient: asyncHandler(validateIngredient),
};
