const router = require("express").Router();

const methodNotAllowed = require("../errors/methodNotAllowed");
const controller = require("./bakes.controller");

router.route("/").post(controller.create).all(methodNotAllowed);

module.exports = router;