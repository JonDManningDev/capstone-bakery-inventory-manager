const service = require("./ingredients.service");
const asyncHandler = require("../errors/asyncHandler");
const middleware = require("./ingredients.middleware");

// Route Functions:

async function list(req, res, next) {
  return res.json({ data: await service.list() });
}

async function read(req, res, next) {
  const ingredient = res.locals.ingredient;
  return res.json({ data: ingredient });
}

module.exports = {
  list,
  read: [asyncHandler(middleware.ingredientExists), asyncHandler(read)],
};
