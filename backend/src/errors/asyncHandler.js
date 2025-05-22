function asyncHandler(delegate) {
    return (req, res, next) => {
        Promise.resolve(delegate(req, res, next)).catch(next);
    };
}

module.exports = asyncHandler;