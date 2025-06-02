const asyncHandler = require("../errors/asyncHandler");
const service = require("./bakes.service");
const middleware = require("./bakes.middleware");

async function create(req, res, next) {
    const newBake = req.body.data;
    return res.json({ data: await service.create(newBake)});
}

module.exports = {
    create: asyncHandler(create),
}