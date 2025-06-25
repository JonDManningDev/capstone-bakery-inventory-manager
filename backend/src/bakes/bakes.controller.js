const asyncHandler = require("../errors/asyncHandler");
const service = require("./bakes.service");
const middleware = require("./bakes.middleware");

async function create(req, res, next) {
  const newBake = req.body.data;
  return res.json({ data: await service.create(newBake) });
}

async function list(req, res, next) {
  return res.json({ data: await service.list() });
}

async function read(req, res, next) {
  const { bake } = res.locals;
  return res.json({ data: bake });
}

async function update(req, res, next) {
  const { bakeId } = req.params;
  const updatedBake = req.body.data;
  const data = await service.update(bakeId, updatedBake);
  return res.json({ data });
}

module.exports = {
  create: asyncHandler(create),
  list: asyncHandler(list),
  read: [asyncHandler(middleware.bakeExists), asyncHandler(read)],
  update: [
    asyncHandler(middleware.bakeExists),
    middleware.validateBakeUpdate,
    asyncHandler(update),
  ],
};
