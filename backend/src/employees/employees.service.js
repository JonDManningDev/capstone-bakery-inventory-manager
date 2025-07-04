const knex = require("../db/connection");
const bcrypt = require("bcrypt");

const tableName = "employees";
// Used by bcrypt to determine how many passes for hashing passwords
const SALT_ROUNDS = 12;

async function create(newEmployee) {
  const { firstName, lastName, email, password } = newEmployee;

  // bcrypt encrypts passwords for security before they are stored in the database.
  const password_hash = await bcrypt.hash(password, SALT_ROUNDS);

  const [newRecord] = await knex(tableName)
    .insert({
      first_name: firstName,
      last_name: lastName,
      email,
      password_hash,
    })
    .returning(["first_name", "last_name", "email"]);

  return newRecord;
}

// Account information is retrieve via 'email' because 'email' is set to UNIQUE in the database.
function read(email) {
  return knex(tableName).select("*").where({ email }).first();
}

module.exports = {
  create,
  read,
};
