const router = require('express').Router({ mergeParams: true });
const authenticateToken = require("../authentication/auth.middleware");

const controller = require('./employees.controller');
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/login").post(controller.login).all(methodNotAllowed);

// Route for obtaining employee information from an existing login token
router.route("/me").get(authenticateToken, controller.readSelf).all(methodNotAllowed);

router.route("/").post(controller.create).all(methodNotAllowed);

module.exports = router;