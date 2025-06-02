const router = require("express").Router();

const methodNotAllowed = require("../errors/methodNotAllowed");
const controller = require("./ingredients.controller");

router
  .route("/bake/:recipeId")
  .put(controller.subtractIngredients)
  .all(methodNotAllowed);

router.route("/:ingredientId").get(controller.read).all(methodNotAllowed);

router.route("/").get(controller.list).all(methodNotAllowed);

module.exports = router;
