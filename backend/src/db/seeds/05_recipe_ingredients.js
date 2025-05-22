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
    await knex.raw(
      "TRUNCATE TABLE recipe_ingredients RESTART IDENTITY CASCADE"
    );
  } else {
    // SQLite specific delete
    await knex("recipe_ingredients").del();
  }

  // Insert seed entries
  await knex("recipe_ingredients").insert([
    // Recipe 1: Classic Chocolate Chip Cookies
    { recipe_id: 1, ingredient_id: 1, amount_needed: 280, unit: "g" }, // All-Purpose Flour
    { recipe_id: 1, ingredient_id: 5, amount_needed: 150, unit: "g" }, // Granulated Sugar
    { recipe_id: 1, ingredient_id: 6, amount_needed: 165, unit: "g" }, // Brown Sugar
    { recipe_id: 1, ingredient_id: 8, amount_needed: 5, unit: "g" }, // Baking Powder
    { recipe_id: 1, ingredient_id: 9, amount_needed: 3, unit: "g" }, // Baking Soda
    { recipe_id: 1, ingredient_id: 10, amount_needed: 3, unit: "g" }, // Salt
    { recipe_id: 1, ingredient_id: 11, amount_needed: 225, unit: "g" }, // Butter
    { recipe_id: 1, ingredient_id: 12, amount_needed: 2, unit: "unit" }, // Eggs
    { recipe_id: 1, ingredient_id: 16, amount_needed: 5, unit: "ml" }, // Vanilla Extract
    { recipe_id: 1, ingredient_id: 18, amount_needed: 340, unit: "g" }, // Chocolate Chips

    // Recipe 2: Blueberry Muffins
    { recipe_id: 2, ingredient_id: 1, amount_needed: 250, unit: "g" }, // All-Purpose Flour
    { recipe_id: 2, ingredient_id: 5, amount_needed: 150, unit: "g" }, // Granulated Sugar
    { recipe_id: 2, ingredient_id: 8, amount_needed: 10, unit: "g" }, // Baking Powder
    { recipe_id: 2, ingredient_id: 10, amount_needed: 2, unit: "g" }, // Salt
    { recipe_id: 2, ingredient_id: 11, amount_needed: 113, unit: "g" }, // Butter
    { recipe_id: 2, ingredient_id: 12, amount_needed: 2, unit: "unit" }, // Eggs
    { recipe_id: 2, ingredient_id: 13, amount_needed: 240, unit: "ml" }, // Milk
    { recipe_id: 2, ingredient_id: 16, amount_needed: 5, unit: "ml" }, // Vanilla Extract
    { recipe_id: 2, ingredient_id: 26, amount_needed: 200, unit: "g" }, // Blueberries

    // Recipe 3: New York Style Cheesecake
    { recipe_id: 3, ingredient_id: 5, amount_needed: 200, unit: "g" }, // Granulated Sugar
    { recipe_id: 3, ingredient_id: 10, amount_needed: 2, unit: "g" }, // Salt
    { recipe_id: 3, ingredient_id: 11, amount_needed: 60, unit: "g" }, // Butter
    { recipe_id: 3, ingredient_id: 12, amount_needed: 4, unit: "unit" }, // Eggs
    { recipe_id: 3, ingredient_id: 14, amount_needed: 120, unit: "ml" }, // Heavy Cream
    { recipe_id: 3, ingredient_id: 16, amount_needed: 10, unit: "ml" }, // Vanilla Extract
    { recipe_id: 3, ingredient_id: 19, amount_needed: 900, unit: "g" }, // Cream Cheese
    { recipe_id: 3, ingredient_id: 24, amount_needed: 15, unit: "ml" }, // Lemon Juice

    // Recipe 4: Cinnamon Rolls
    { recipe_id: 4, ingredient_id: 3, amount_needed: 500, unit: "g" }, // Bread Flour
    { recipe_id: 4, ingredient_id: 5, amount_needed: 100, unit: "g" }, // Granulated Sugar
    { recipe_id: 4, ingredient_id: 6, amount_needed: 135, unit: "g" }, // Brown Sugar
    { recipe_id: 4, ingredient_id: 10, amount_needed: 5, unit: "g" }, // Salt
    { recipe_id: 4, ingredient_id: 11, amount_needed: 85, unit: "g" }, // Butter
    { recipe_id: 4, ingredient_id: 12, amount_needed: 1, unit: "unit" }, // Eggs
    { recipe_id: 4, ingredient_id: 13, amount_needed: 240, unit: "ml" }, // Milk
    { recipe_id: 4, ingredient_id: 16, amount_needed: 5, unit: "ml" }, // Vanilla Extract
    { recipe_id: 4, ingredient_id: 19, amount_needed: 225, unit: "g" }, // Cream Cheese
    { recipe_id: 4, ingredient_id: 20, amount_needed: 15, unit: "g" }, // Cinnamon
    { recipe_id: 4, ingredient_id: 21, amount_needed: 7, unit: "g" }, // Yeast
    { recipe_id: 4, ingredient_id: 7, amount_needed: 120, unit: "g" }, // Powdered Sugar

    // Recipe 5: Carrot Cake
    { recipe_id: 5, ingredient_id: 1, amount_needed: 250, unit: "g" }, // All-Purpose Flour
    { recipe_id: 5, ingredient_id: 5, amount_needed: 300, unit: "g" }, // Granulated Sugar
    { recipe_id: 5, ingredient_id: 8, amount_needed: 10, unit: "g" }, // Baking Powder
    { recipe_id: 5, ingredient_id: 9, amount_needed: 5, unit: "g" }, // Baking Soda
    { recipe_id: 5, ingredient_id: 10, amount_needed: 3, unit: "g" }, // Salt
    { recipe_id: 5, ingredient_id: 12, amount_needed: 4, unit: "unit" }, // Eggs
    { recipe_id: 5, ingredient_id: 19, amount_needed: 225, unit: "g" }, // Cream Cheese
    { recipe_id: 5, ingredient_id: 20, amount_needed: 5, unit: "g" }, // Cinnamon
    { recipe_id: 5, ingredient_id: 29, amount_needed: 100, unit: "g" }, // Walnuts
    { recipe_id: 5, ingredient_id: 31, amount_needed: 180, unit: "ml" }, // Vegetable Oil
    { recipe_id: 5, ingredient_id: 35, amount_needed: 300, unit: "g" }, // Carrots
    { recipe_id: 5, ingredient_id: 7, amount_needed: 200, unit: "g" }, // Powdered Sugar
    { recipe_id: 5, ingredient_id: 34, amount_needed: 1, unit: "g" }, // Nutmeg

    // Recipe 6: Sourdough Bread
    { recipe_id: 6, ingredient_id: 3, amount_needed: 500, unit: "g" }, // Bread Flour
    { recipe_id: 6, ingredient_id: 10, amount_needed: 10, unit: "g" }, // Salt
    { recipe_id: 6, ingredient_id: 13, amount_needed: 50, unit: "ml" }, // Milk

    // Recipe 7: Apple Pie
    { recipe_id: 7, ingredient_id: 1, amount_needed: 300, unit: "g" }, // All-Purpose Flour
    { recipe_id: 7, ingredient_id: 5, amount_needed: 100, unit: "g" }, // Granulated Sugar
    { recipe_id: 7, ingredient_id: 6, amount_needed: 100, unit: "g" }, // Brown Sugar
    { recipe_id: 7, ingredient_id: 10, amount_needed: 3, unit: "g" }, // Salt
    { recipe_id: 7, ingredient_id: 11, amount_needed: 225, unit: "g" }, // Butter
    { recipe_id: 7, ingredient_id: 20, amount_needed: 5, unit: "g" }, // Cinnamon
    { recipe_id: 7, ingredient_id: 24, amount_needed: 15, unit: "ml" }, // Lemon Juice
    { recipe_id: 7, ingredient_id: 34, amount_needed: 1, unit: "g" }, // Nutmeg
    { recipe_id: 7, ingredient_id: 37, amount_needed: 1000, unit: "g" }, // Apples

    // Recipe 8: Banana Bread
    { recipe_id: 8, ingredient_id: 1, amount_needed: 240, unit: "g" }, // All-Purpose Flour
    { recipe_id: 8, ingredient_id: 5, amount_needed: 150, unit: "g" }, // Granulated Sugar
    { recipe_id: 8, ingredient_id: 8, amount_needed: 5, unit: "g" }, // Baking Powder
    { recipe_id: 8, ingredient_id: 9, amount_needed: 5, unit: "g" }, // Baking Soda
    { recipe_id: 8, ingredient_id: 10, amount_needed: 3, unit: "g" }, // Salt
    { recipe_id: 8, ingredient_id: 11, amount_needed: 85, unit: "g" }, // Butter
    { recipe_id: 8, ingredient_id: 12, amount_needed: 2, unit: "unit" }, // Eggs
    { recipe_id: 8, ingredient_id: 16, amount_needed: 5, unit: "ml" }, // Vanilla Extract
    { recipe_id: 8, ingredient_id: 20, amount_needed: 2, unit: "g" }, // Cinnamon
    { recipe_id: 8, ingredient_id: 32, amount_needed: 450, unit: "g" }, // Bananas
    { recipe_id: 8, ingredient_id: 15, amount_needed: 60, unit: "ml" }, // Buttermilk

    // Recipe 9: Chocolate Lava Cake
    { recipe_id: 9, ingredient_id: 1, amount_needed: 30, unit: "g" }, // All-Purpose Flour
    { recipe_id: 9, ingredient_id: 5, amount_needed: 100, unit: "g" }, // Granulated Sugar
    { recipe_id: 9, ingredient_id: 10, amount_needed: 1, unit: "g" }, // Salt
    { recipe_id: 9, ingredient_id: 11, amount_needed: 115, unit: "g" }, // Butter
    { recipe_id: 9, ingredient_id: 12, amount_needed: 4, unit: "unit" }, // Eggs
    { recipe_id: 9, ingredient_id: 16, amount_needed: 2, unit: "ml" }, // Vanilla Extract
    { recipe_id: 9, ingredient_id: 17, amount_needed: 30, unit: "g" }, // Cocoa Powder
    { recipe_id: 9, ingredient_id: 18, amount_needed: 170, unit: "g" }, // Chocolate Chips

    // Recipe 10: Oatmeal Raisin Cookies
    { recipe_id: 10, ingredient_id: 1, amount_needed: 125, unit: "g" }, // All-Purpose Flour
    { recipe_id: 10, ingredient_id: 5, amount_needed: 100, unit: "g" }, // Granulated Sugar
    { recipe_id: 10, ingredient_id: 6, amount_needed: 135, unit: "g" }, // Brown Sugar
    { recipe_id: 10, ingredient_id: 8, amount_needed: 2, unit: "g" }, // Baking Powder
    { recipe_id: 10, ingredient_id: 9, amount_needed: 2, unit: "g" }, // Baking Soda
    { recipe_id: 10, ingredient_id: 10, amount_needed: 3, unit: "g" }, // Salt
    { recipe_id: 10, ingredient_id: 11, amount_needed: 115, unit: "g" }, // Butter
    { recipe_id: 10, ingredient_id: 12, amount_needed: 1, unit: "unit" }, // Eggs
    { recipe_id: 10, ingredient_id: 16, amount_needed: 5, unit: "ml" }, // Vanilla Extract
    { recipe_id: 10, ingredient_id: 20, amount_needed: 3, unit: "g" }, // Cinnamon
    { recipe_id: 10, ingredient_id: 36, amount_needed: 100, unit: "g" }, // Raisins
    { recipe_id: 10, ingredient_id: 38, amount_needed: 150, unit: "g" }, // Oats
  ]);
};
