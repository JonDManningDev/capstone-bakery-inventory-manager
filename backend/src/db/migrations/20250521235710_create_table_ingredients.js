/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("ingredients", (table) => {
    table.increments("id").primary().unsigned().notNullable();
    table.string("name").notNullable();
    table.string("base_unit");
    table.float("quantity_in_stock").defaultTo(0);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("ingredients");
};
