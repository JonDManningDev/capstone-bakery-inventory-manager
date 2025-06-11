const router = require("express").Router();

const controller = require("./recipes.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/:recipeId/:ingredientId").post(controller.addRecipeIngredient).delete(controller.deleteRecipeIngredient).all(methodNotAllowed);

router.route("/:recipeId").get(controller.read).delete(controller.deleteRecipe).put(controller.update).all(methodNotAllowed);

router.route("/").get(controller.list).post(controller.create).all(methodNotAllowed);

module.exports = router;