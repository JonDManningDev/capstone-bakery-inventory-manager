const service = require("./bakes.service");
const asyncHandler = require("../errors/asyncHandler");

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

function validateBakeUpdate(req, res, next) {
  const updateData = req.body.data;

  if (!updateData) {
    return next({
      status: 400,
      message: "Request body must include data",
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

  return next();
}

module.exports = {
  bakeExists: asyncHandler(bakeExists),
  validateBakeUpdate,
};
