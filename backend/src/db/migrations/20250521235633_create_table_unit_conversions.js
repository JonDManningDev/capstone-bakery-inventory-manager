/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('unit_conversions', (table) => {
    table.increments('id').primary().unsigned().notNullable();
    table.string('from_unit').notNullable();
    table.string('to_unit').notNullable();
    table.float('factor').notNullable();
    table.unique(['from_unit', 'to_unit']);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('unit_conversions');
};
