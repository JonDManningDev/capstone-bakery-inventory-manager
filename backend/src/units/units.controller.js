const service = require("./units.service");
const asyncHandler = require("../errors/asyncHandler");

// Validation Middleware:

// Route Functions:

async function listConversions(req, res, next) {
    return res.json({ data: await service.listConversions() });
}

async function listUnits(req, res, next) {
    return res.json({ data: await service.listUnits() });    
}

module.exports = {
    listConversions: asyncHandler(listConversions),
    listUnits: asyncHandler(listUnits),
}