const service = require("./ingredients.service");
const asyncHandler = require("../errors/asyncHandler");

/**
 * Checks if an ingredient exists by ID and attaches it to res.locals
 */
async function ingredientExists(req, res, next) {
  const { ingredientId } = req.params;
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

module.exports = {
  ingredientExists: asyncHandler(ingredientExists),
};
