/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("recipe_ingredients", (table) => {
    table.integer("recipe_id").unsigned().notNullable();
    table.integer("ingredient_id").unsigned().notNullable();
    table
      .foreign("recipe_id")
      .references("recipe_id")
      .inTable("recipes")
      .onDelete("CASCADE");
    table
      .foreign("ingredient_id")
      .references("ingredient_id")
      .inTable("ingredients")
      .onDelete("CASCADE");
    table.primary(["recipe_id", "ingredient_id"]);
    table.float("amount_needed").notNullable();
    table.string("unit").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("recipe_ingredients");
};
