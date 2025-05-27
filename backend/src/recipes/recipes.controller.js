const service = require("./recipes.service");
const asyncHandler = require("../errors/asyncHandler");

// Validation Middleware:

// Route Functions:

async function create(req, res, next) {

}

async function destroy(req, res, next) {

}

async function list(req, res, next) {
    return res.json({ data: await service.list() });
}

async function read(req, res, next) {

}

module.exports = {
    create: asyncHandler(create),
    delete: asyncHandler(destroy),
    list: asyncHandler(list),
    read: asyncHandler(read),
}