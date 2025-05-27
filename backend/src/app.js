const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const express = require("express");
const cors = require("cors");
const app = express();

const employeesRouter = require("./employees/employees.router");
const recipesRouter = require("./recipes/recipes.router");

const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");

if (process.env.LOG_LEVEL === "info") {
  app.use(require("morgan")("dev"));
}

app.use(cors());
app.use(express.json());

// Routers:

app.use("/employees", employeesRouter);
app.use("/recipes", recipesRouter);

// Error Handlers:

app.use(notFound);
app.use(errorHandler);

module.exports = app;
