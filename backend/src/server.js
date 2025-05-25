const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const { PORT = 5001 } = process.env;

const app = require("./app");

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}!`);
});
