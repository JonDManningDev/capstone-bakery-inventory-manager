const router = require("express").Router();

const methodNotAllowed = require("../errors/methodNotAllowed");
const controller = require("./units.controller");

router.route("/conversions").get(controller.listConversions).all(methodNotAllowed);

router.route("/").get(controller.listUnits).all(methodNotAllowed);

module.exports = router;