const router = require("express").Router();

const methodNotAllowed = require("../errors/methodNotAllowed");
const controller = require("./ingredients.controller");

router
  .route("/bake/:recipeId")
  .put(controller.subtractIngredients)
  .all(methodNotAllowed);

router.route("/:ingredientId").get(controller.read).put(controller.update).all(methodNotAllowed);

router.route("/").get(controller.list).post(controller.create).all(methodNotAllowed);

module.exports = router;
