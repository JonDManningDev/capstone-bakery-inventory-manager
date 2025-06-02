const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const { PORT = 5001 } = process.env;

const app = require("./app");

const { loadConversionCache } = require("./units/units.service");

// Load the unit_conversions table into memory whenver the server starts
loadConversionCache()
  .then(() => console.log("Conversion cache loaded."))
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Listening on Port ${PORT}!`);
    })
  )
  .catch((error) => {
    console.error("Failed to load conversion cache:", error);
    process.exit(1);
  });
