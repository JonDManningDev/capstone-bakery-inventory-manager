const service = require("./employees.service");
const bcrypt = require("bcrypt");

/**
 * Validates login information from request body
 */
async function validateLogin(req, res, next) {
  const { email, password } = req.body.data;

  if (!email || !password) {
    return next({
      status: 400,
      message: "Both email and password are required.",
    });
  }

  const normalizedEmail = email.toLowerCase();
  const employee = await service.read(normalizedEmail);

  if (!employee) {
    return next({
      status: 401,
      message: "Invalid email or password",
    });
  }

  const passwordMatch = await bcrypt.compare(password, employee.password_hash);
  if (!passwordMatch) {
    return next({
      status: 401,
      message: "Invalid email or password",
    });
  }

  res.locals.employee = employee;

  return next();
}

/**
 * Validates registration information from request body
 */
async function validateRegistration(req, res, next) {
  const { firstName, lastName, email, password } = req.body.data;

  if (!firstName || !lastName || !email || !password) {
    return next({
      status: 422,
      message:
        "Registration requires all fields: first name, last name, email, and password.",
    });
  }

  const allowedFields = ["firstName", "lastName", "email", "password"];
  const extraFields = Object.keys(req.body.data).filter(
    (key) => !allowedFields.includes(key)
  );
  if (extraFields.length > 0) {
    return next({
      status: 400,
      message: `The following fields are not allowed: ${extraFields.join(
        ", "
      )}`,
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return next({
      status: 400,
      message: "Please provide a valid email address.",
    });
  }
  const emailExists = await service.read(email.toLowerCase());
  if (emailExists) {
    return next({
      status: 409,
      message: `An account with email address ${email.toLowerCase()} already exists.`,
    });
  }

  if (password.length < 8 || password.length > 20) {
    return next({
      status: 400,
      message: "Password must be between 8 and 20 characters in length.",
    });
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;
  if (!passwordRegex.test(password)) {
    return next({
      status: 400,
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
    });
  }

  res.locals.newEmployee = {
    firstName,
    lastName,
    email: email.toLowerCase(),
    password,
  };
  return next();
}

module.exports = {
  validateLogin,
  validateRegistration,
};
