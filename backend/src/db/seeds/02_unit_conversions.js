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
    await knex.raw("TRUNCATE TABLE unit_conversions RESTART IDENTITY CASCADE");
  } else {
    // SQLite specific delete and sequence reset
    await knex("unit_conversions").del();
    await knex.raw(
      "DELETE FROM sqlite_sequence WHERE name = 'unit_conversions'"
    );
  }

  // Insert seed entries
  await knex("unit_conversions").insert([
    // Weight conversions (metric to metric)
    { from_unit: "g", to_unit: "kg", factor: 0.001 },
    { from_unit: "kg", to_unit: "g", factor: 1000 },

    // Weight conversions (imperial to imperial)
    { from_unit: "oz", to_unit: "lb", factor: 0.0625 },
    { from_unit: "lb", to_unit: "oz", factor: 16 },

    // Weight conversions (metric to imperial)
    { from_unit: "g", to_unit: "oz", factor: 0.03527396 },
    { from_unit: "oz", to_unit: "g", factor: 28.3495 },
    { from_unit: "kg", to_unit: "lb", factor: 2.20462 },
    { from_unit: "lb", to_unit: "kg", factor: 0.453592 },

    // Volume conversions (metric to metric)
    { from_unit: "ml", to_unit: "l", factor: 0.001 },
    { from_unit: "l", to_unit: "ml", factor: 1000 },

    // Volume conversions (imperial to imperial)
    { from_unit: "tsp", to_unit: "tbsp", factor: 0.333333 },
    { from_unit: "tbsp", to_unit: "tsp", factor: 3 },
    { from_unit: "tsp", to_unit: "cup", factor: 0.0208333 },
    { from_unit: "tbsp", to_unit: "cup", factor: 0.0625 },
    { from_unit: "cup", to_unit: "tsp", factor: 48 },
    { from_unit: "cup", to_unit: "tbsp", factor: 16 },
    { from_unit: "cup", to_unit: "pint", factor: 0.5 },
    { from_unit: "pint", to_unit: "cup", factor: 2 },
    { from_unit: "pint", to_unit: "quart", factor: 0.5 },
    { from_unit: "quart", to_unit: "pint", factor: 2 },
    { from_unit: "quart", to_unit: "gallon", factor: 0.25 },
    { from_unit: "gallon", to_unit: "quart", factor: 4 },

    // Volume conversions (metric to imperial)
    { from_unit: "ml", to_unit: "tsp", factor: 0.202884 },
    { from_unit: "tsp", to_unit: "ml", factor: 4.92892 },
    { from_unit: "ml", to_unit: "tbsp", factor: 0.067628 },
    { from_unit: "tbsp", to_unit: "ml", factor: 14.7868 },
    { from_unit: "ml", to_unit: "cup", factor: 0.00422675 },
    { from_unit: "cup", to_unit: "ml", factor: 236.588 },
    { from_unit: "l", to_unit: "cup", factor: 4.22675 },
    { from_unit: "cup", to_unit: "l", factor: 0.236588 },
    { from_unit: "l", to_unit: "pint", factor: 2.11338 },
    { from_unit: "pint", to_unit: "l", factor: 0.473176 },
    { from_unit: "l", to_unit: "quart", factor: 1.05669 },
    { from_unit: "quart", to_unit: "l", factor: 0.946353 },
    { from_unit: "l", to_unit: "gallon", factor: 0.264172 },
    { from_unit: "gallon", to_unit: "l", factor: 3.78541 },

    // Common baking ingredient weight-to-volume conversions (for 1 cup)
    { from_unit: "cup_flour", to_unit: "g", factor: 120 },
    { from_unit: "g", to_unit: "cup_flour", factor: 0.00833333 },
    { from_unit: "cup_sugar", to_unit: "g", factor: 200 },
    { from_unit: "g", to_unit: "cup_sugar", factor: 0.005 },
    { from_unit: "cup_brown_sugar", to_unit: "g", factor: 220 },
    { from_unit: "g", to_unit: "cup_brown_sugar", factor: 0.00454545 },
    { from_unit: "cup_butter", to_unit: "g", factor: 227 },
    { from_unit: "g", to_unit: "cup_butter", factor: 0.00440529 },
    { from_unit: "cup_milk", to_unit: "g", factor: 240 },
    { from_unit: "g", to_unit: "cup_milk", factor: 0.00416667 },
    { from_unit: "cup_honey", to_unit: "g", factor: 340 },
    { from_unit: "g", to_unit: "cup_honey", factor: 0.00294118 },
    { from_unit: "cup_cocoa", to_unit: "g", factor: 85 },
    { from_unit: "g", to_unit: "cup_cocoa", factor: 0.01176471 },
    { from_unit: "cup_water", to_unit: "g", factor: 240 },
    { from_unit: "g", to_unit: "cup_water", factor: 0.00416667 },

    // Stick of butter conversions (common in US recipes)
    { from_unit: "stick_butter", to_unit: "g", factor: 113.5 },
    { from_unit: "g", to_unit: "stick_butter", factor: 0.00881057 },
    { from_unit: "stick_butter", to_unit: "cup", factor: 0.5 },
    { from_unit: "cup", to_unit: "stick_butter", factor: 2 },
    { from_unit: "stick_butter", to_unit: "tbsp", factor: 8 },
    { from_unit: "tbsp", to_unit: "stick_butter", factor: 0.125 },

    // Temperature conversions (special cases, will need application logic to handle offsets)
    { from_unit: "celsius", to_unit: "fahrenheit", factor: 1.8 }, // Add 32 after multiplying
    { from_unit: "fahrenheit", to_unit: "celsius", factor: 0.5555555556 }, // Subtract 32 before multiplying
  ]);
};
