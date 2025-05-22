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
    await knex.raw("TRUNCATE TABLE ingredients RESTART IDENTITY CASCADE");
  } else {
    // SQLite specific delete and sequence reset
    await knex("ingredients").del();
    await knex.raw("DELETE FROM sqlite_sequence WHERE name = 'ingredients'");
  }

  // Insert seed entries
  await knex("ingredients").insert([
    { name: "All-Purpose Flour", base_unit: "g", quantity_in_stock: 20000 },
    { name: "Cake Flour", base_unit: "g", quantity_in_stock: 10000 },
    { name: "Bread Flour", base_unit: "g", quantity_in_stock: 15000 },
    { name: "Whole Wheat Flour", base_unit: "g", quantity_in_stock: 8000 },
    { name: "Granulated Sugar", base_unit: "g", quantity_in_stock: 12000 },
    { name: "Brown Sugar", base_unit: "g", quantity_in_stock: 8000 },
    { name: "Powdered Sugar", base_unit: "g", quantity_in_stock: 5000 },
    { name: "Baking Powder", base_unit: "g", quantity_in_stock: 2000 },
    { name: "Baking Soda", base_unit: "g", quantity_in_stock: 1500 },
    { name: "Salt", base_unit: "g", quantity_in_stock: 3000 },
    { name: "Butter", base_unit: "g", quantity_in_stock: 10000 },
    { name: "Eggs", base_unit: "unit", quantity_in_stock: 200 },
    { name: "Milk", base_unit: "ml", quantity_in_stock: 8000 },
    { name: "Heavy Cream", base_unit: "ml", quantity_in_stock: 5000 },
    { name: "Buttermilk", base_unit: "ml", quantity_in_stock: 3000 },
    { name: "Vanilla Extract", base_unit: "ml", quantity_in_stock: 1000 },
    { name: "Cocoa Powder", base_unit: "g", quantity_in_stock: 3000 },
    { name: "Chocolate Chips", base_unit: "g", quantity_in_stock: 6000 },
    { name: "Cream Cheese", base_unit: "g", quantity_in_stock: 4000 },
    { name: "Cinnamon", base_unit: "g", quantity_in_stock: 800 },
    { name: "Yeast", base_unit: "g", quantity_in_stock: 1000 },
    { name: "Honey", base_unit: "g", quantity_in_stock: 2500 },
    { name: "Maple Syrup", base_unit: "ml", quantity_in_stock: 2000 },
    { name: "Lemon Juice", base_unit: "ml", quantity_in_stock: 1500 },
    { name: "Lemon Zest", base_unit: "g", quantity_in_stock: 200 },
    { name: "Blueberries", base_unit: "g", quantity_in_stock: 3000 },
    { name: "Strawberries", base_unit: "g", quantity_in_stock: 3000 },
    { name: "Pecans", base_unit: "g", quantity_in_stock: 2000 },
    { name: "Walnuts", base_unit: "g", quantity_in_stock: 2500 },
    { name: "Almonds", base_unit: "g", quantity_in_stock: 2000 },
    { name: "Vegetable Oil", base_unit: "ml", quantity_in_stock: 4000 },
    { name: "Bananas", base_unit: "g", quantity_in_stock: 5000 },
    { name: "Pumpkin Puree", base_unit: "g", quantity_in_stock: 3000 },
    { name: "Nutmeg", base_unit: "g", quantity_in_stock: 500 },
    { name: "Carrots", base_unit: "g", quantity_in_stock: 4000 },
    { name: "Raisins", base_unit: "g", quantity_in_stock: 2000 },
    { name: "Apples", base_unit: "g", quantity_in_stock: 5000 },
    { name: "Oats", base_unit: "g", quantity_in_stock: 5000 },
    { name: "Caramel", base_unit: "g", quantity_in_stock: 1500 },
    { name: "Peanut Butter", base_unit: "g", quantity_in_stock: 2000 },
  ]);
};
