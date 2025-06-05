const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const { PORT = 5001 } = process.env;

const app = require("./app");

const { loadConversionCache } = require("./units/units.service");

const server = app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}!`);
  
  // Load the unit_conversions table into memory after server has started
  // This eliminates repeated database queries for unit conversions
  loadConversionCache()
    .then(() => console.log("Conversion cache loaded successfully."))
    .catch((error) => {
      console.error("Failed to load conversion cache:", error);
      
      // Retry loading the conversions after 10 seconds if it initially fails
      setTimeout(() => {
        console.log("Attempting to reload conversion cache...");
        loadConversionCache()
          .then(() => console.log("Conversion cache loaded successfully on retry."))
          .catch((error) => console.error("Failed to load conversion cache on retry:", error));
      }, 10000);
    });
});
