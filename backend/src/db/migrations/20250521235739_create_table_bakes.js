/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("bakes", (table) => {
    table.increments("bake_id").primary().unsigned().notNullable();
    table.integer("recipe_id").unsigned().notNullable();
    table.integer("employee_id").unsigned().notNullable();
    table
      .foreign("recipe_id")
      .references("recipe_id")
      .inTable("recipes")
      .onDelete("CASCADE");
    table
      .foreign("employee_id")
      .references("employee_id")
      .inTable("employees")
      .onDelete("CASCADE");
    table.text("status").defaultTo("started");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("bakes");
};
