const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const express = require("express");
const cors = require("cors");
const app = express();

const employeesRouter = require("../src/employees/employees.router");

const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");

if (process.env.LOG_LEVEL === "info") {
  app.use(require("morgan")("dev"));
}

app.use(cors());
app.use(express.json());

// Routers:

app.use("/employees", employeesRouter);

// Error Handlers:

app.use(notFound);
app.use(errorHandler);

module.exports = app;
