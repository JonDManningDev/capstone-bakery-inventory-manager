const service = require("./bakes.service");
const asyncHandler = require("../errors/asyncHandler");

/**
 * Checks if a bake exists by ID and attaches it to res.locals
 */
async function bakeExists(req, res, next) {
  const { bakeId } = req.params;
  const bake = await service.read(bakeId);

  if (!bake) {
    return next({
      status: 404,
      message: `Could not find bake with ID ${bakeId}`,
    });
  } else {
    res.locals.bake = bake;
    return next();
  }
}

/**
 * Validates that the bake update data contains valid fields
 */
function validateBakeUpdate(req, res, next) {
  const updateData = req.body.data;

  if (!updateData) {
    return next({
      status: 400,
      message: "Request body must include 'data' property",
    });
  }
  const allowedFields = ["status", "updated_at"];
  const invalidFields = Object.keys(updateData).filter(
    (field) => !allowedFields.includes(field)
  );

  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }

  if (
    updateData.status &&
    !["started", "in-process", "complete", "canceled"].includes(
      updateData.status
    )
  ) {
    return next({
      status: 400,
      message: `Status must be one of: 'started', 'in-process', 'complete', 'canceled'`,
    });
  }

  return next();
}

module.exports = {
  bakeExists: asyncHandler(bakeExists),
  validateBakeUpdate,
};
