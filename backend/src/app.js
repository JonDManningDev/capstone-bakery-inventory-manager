const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const express = require("express");
const cors = require("cors");
const app = express();

const bakesRouter = require("./bakes/bakes.router");
const employeesRouter = require("./employees/employees.router");
const ingredientsRouter = require("./ingredients/ingredients.router");
const recipesRouter = require("./recipes/recipes.router");
const unitsRouter = require("./units/units.router");

const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");

if (process.env.LOG_LEVEL === "info") {
  app.use(require("morgan")("dev"));
}

app.use(cors());
app.use(express.json());

// Routers:

app.use("/bakes", bakesRouter);
app.use("/employees", employeesRouter);
app.use("/ingredients", ingredientsRouter);
app.use("/recipes", recipesRouter);
app.use("/units", unitsRouter);

// Error Handlers:

app.use(notFound);
app.use(errorHandler);

module.exports = app;
