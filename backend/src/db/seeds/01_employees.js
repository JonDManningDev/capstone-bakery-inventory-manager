/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Check if PostgreSQL or SQLite
  const isPostgres = knex.client.config.client === "postgresql";

  // Deletes ALL existing entries and reset sequence
  if (isPostgres) {
    // PostgreSQL specific truncate with sequence reset
    await knex.raw("TRUNCATE TABLE employees RESTART IDENTITY CASCADE");
  } else {
    // SQLite specific delete and sequence reset
    await knex("employees").del();
    await knex.raw("DELETE FROM sqlite_sequence WHERE name = 'employees'");
  }

  // Insert seed entries
  await knex("employees").insert([
    {
      first_name: "Guest",
      last_name: "Employee",
      email: "guest@notreal.net",
      password_hash:
        "$2b$10$MZ3PZv4jcgwH0dpK5JorC.twF./4rUQK7Mw9tPQkgu0Kum2aefi.e", // password: guest123
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      first_name: "John",
      last_name: "Baker",
      email: "john.baker@maevesbakery.com",
      password_hash:
        "$2b$10$qO//gOVb1rRtaOsA1kvoFuD1fO4FR7xF579qe4gQIXIVKxy1ROzvO", // password: bakery123
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      first_name: "Maria",
      last_name: "Garcia",
      email: "maria.garcia@maevesbakery.com",
      password_hash:
        "$2b$10$wlM1RZwU6ky5Egd.KCISWeYT.QzyYb4Nz7ZsZPdLvK2uYufuhx3ni", // password: flour456
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      first_name: "David",
      last_name: "Chen",
      email: "david.chen@maevesbakery.com",
      password_hash:
        "$2b$10$AskV7xlXFYmRaBLE0E.JQ.erzIkWXbEsMNC0x.QvnmxaF2GUnIt4C", // password: sugar789
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      first_name: "Sarah",
      last_name: "Johnson",
      email: "sarah.johnson@maevesbakery.com",
      password_hash:
        "$2b$10$7NvKe6opweJ..YWAO1v2z.fRUVARMXK81vknV80nnHIBCZHcg1XH2", // password: yeast234
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      first_name: "Maeve",
      last_name: "O'Sullivan",
      email: "maeve@maevesbakery.com",
      password_hash:
        "$2b$10$vIC86wlPlZsdDWJctm/Aouth4Eb/C78kmJFKBbayCT3ZBsOPxItmG", // password: owner567
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
};
