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
      first_name: "John",
      last_name: "Baker",
      email: "john.baker@maevesbakery.com",
      password_hash:
        "$2a$10$JYTaYQTY5Uh6UVy4YfSh5u1gU1vg3QGbQ4AqKsIDxc.jVgzVfPYlG", // password: bakery123
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      first_name: "Maria",
      last_name: "Garcia",
      email: "maria.garcia@maevesbakery.com",
      password_hash:
        "$2a$10$JO/2NFRIl1BYDGDcVmn9pOWxHVL4VlLQCQzrtVHyQQXMCKF9wj4YS", // password: flour456
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      first_name: "David",
      last_name: "Chen",
      email: "david.chen@maevesbakery.com",
      password_hash:
        "$2a$10$MjDC1vXg9YuPTUA5KQhS.eXwxwRCwTdCbmJnhwF6r95BEZRlp7Wj2", // password: sugar789
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      first_name: "Sarah",
      last_name: "Johnson",
      email: "sarah.johnson@maevesbakery.com",
      password_hash:
        "$2a$10$Ep2YGAYs9uyFGZZswgJc7eN8PyD.bAh5fLVt2.CBIkPsbsLSbgvOu", // password: yeast234
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      first_name: "Maeve",
      last_name: "O'Sullivan",
      email: "maeve@maevesbakery.com",
      password_hash:
        "$2a$10$BFqr6aK7QUMpIXH8oRKWMuxkGX5HpVnQ.IU9dNBjc2mxLUeq1lXZa", // password: owner567
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
};
