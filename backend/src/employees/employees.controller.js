const service = require("./employees.service");
const asyncHandler = require("../errors/asyncHandler");
const middleware = require("./employees.middleware");
const jwt = require("jsonwebtoken");

// Route Functions:

async function create(req, res, next) {
  // Establish employee/user info in the database first
  await service.create(res.locals.newEmployee);
  // Obtain full employee info (including newly-generated employee_id)
  const employee = await service.read(res.locals.newEmployee.email);
  // Save the full info
  res.locals.employee = employee;
  // Move on to login
  return next();
}

async function login(req, res, next) {
  const employee = res.locals.employee;

  // Include this information in the login token
  // This information is used by the frontend to display user info
  const payload = {
    employeeId: employee.employee_id,
    email: employee.email,
    firstName: employee.first_name,
    lastName: employee.last_name,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1h",
  });

  return res.json({ token });
}

async function readSelf(req, res, next) {
  const userFromToken = req.user;
  return res.json({ data: userFromToken });
}

module.exports = {
  create: [
    asyncHandler(middleware.validateRegistration),
    asyncHandler(create),
    asyncHandler(login),
  ],
  login: [asyncHandler(middleware.validateLogin), asyncHandler(login)],
  readSelf: asyncHandler(readSelf),
};
