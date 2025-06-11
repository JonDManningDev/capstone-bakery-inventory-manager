/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("recipes", (table) => {
    table.increments("recipe_id").primary().unsigned().notNullable();
    table.string("title").notNullable();
    table.string("image_url"); // Making this nullable since it's optional
    table.text("description").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("recipes");
};
