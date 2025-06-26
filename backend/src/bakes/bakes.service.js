const knex = require("../db/connection");

const tableName = "bakes";

async function create(newBake) {
  const [newRecord] = await knex(tableName).insert(newBake).returning("*");

  const [employee] = await knex("employees")
    .select("first_name", "last_name")
    .where({ employee_id: newBake.employee_id });

  return {
    ...newRecord,
    employee,
  };
}

async function list() {
  // Obtain data for bakes and employees
  const bakes = await knex(`${tableName} as b`)
    .join("employees as e", "b.employee_id", "e.employee_id")
    .select(
      "b.bake_id",
      "b.recipe_id",
      "b.employee_id",
      "b.status",
      "b.created_at",
      "b.updated_at",
      "e.first_name",
      "e.last_name"
    );

  // Reformat data so that employee data is under "employee" key
  const bakesAndEmployees = bakes.map(
    ({
      bake_id,
      recipe_id,
      employee_id,
      status,
      created_at,
      updated_at,
      first_name,
      last_name,
    }) => {
      return {
        bake_id,
        recipe_id,
        status,
        created_at,
        updated_at,
        employee: {
          employee_id,
          first_name,
          last_name,
        },
      };
    }
  );

  const recipes = await knex("recipes as r")
    .join("recipe_ingredients as ri", "r.recipe_id", "ri.recipe_id")
    .join("ingredients as i", "ri.ingredient_id", "i.ingredient_id")
    .select(
      "r.recipe_id",
      "r.title",
      "r.image_url",
      "i.ingredient_id",
      "i.name",
      "ri.amount_needed",
      "ri.unit",
      "i.base_unit",
      "i.quantity_in_stock"
    );

  // Match recipe information to bake information via recipe_id
  // Reformat so that recipe information is under "recipe" key for each bake

  const recipeMap = new Map();

  // Remember that each row of records that gets returned from the recipes query will have all of the data for a single recipe from the 'recipes' table...
  // And the data for a single ingredient used in that recipe from 'recipe_ingredients' and 'ingredients'.
  // The trick is to copy the recipe information only once, because it is duplicated as many times as there are ingredients in that recipe...
  // Then push in the data for each successive ingredient as long as it is still part of that recipe.
  // Once recipe_id changes, that signals that you are looking at a new recipe, so you need logic to trigger a new entry in the map.
  for (const row of recipes) {
    // These are all the values you are going to find in each row returned from the recipes query
    // The first three (from 'recipes') will be duplicated in further rows
    // The rest (from 'recipe_ingredients' and 'ingredients') will be unique each time
    const {
      recipe_id,
      title,
      image_url,
      ingredient_id,
      name,
      amount_needed,
      unit,
      base_unit,
      quantity_in_stock,
    } = row;

    // If the recipe from the row is not in the map yet, set its basic information, leaving an empty array to push ingredients into.
    // Otherwise, skip to pushing the unique ingredient data into the array.
    if (!recipeMap.has(recipe_id)) {
      recipeMap.set(recipe_id, {
        recipe_id: recipe_id,
        title: title,
        image_url: image_url,
        ingredients: [],
      });
    }

    // Get the entry data related to the recipe_id from the row so that you can push the ingredient data into it
    recipeMap.get(recipe_id).ingredients.push({
      ingredient_id: ingredient_id,
      name: name,
      amount_needed: amount_needed,
      unit: unit,
      base_unit: base_unit,
      quantity_in_stock: quantity_in_stock,
    });
  }

  // Merge the two arrays, using the recipe_id in each bake record to get relevant recipe data from recipeMap.
  const bakesList = bakesAndEmployees.map((bake) => ({
    ...bake,
    recipe: recipeMap.get(bake.recipe_id) || null,
  }));
  // Return the fully-formatted data to the controller to send to the client
  return bakesList;
}

async function read(bakeId) {
  const bakeRecord = await knex(`${tableName} as b`)
    .join("employees as e", "b.employee_id", "e.employee_id")
    .join("recipes as r", "b.recipe_id", "r.recipe_id")
    .select(
      "b.bake_id",
      "b.status",
      "b.created_at",
      "b.updated_at",
      "e.employee_id",
      "e.first_name",
      "e.last_name",
      "r.recipe_id",
      "r.title",
      "r.image_url"
    )
    .where({ bake_id: bakeId })
    .first();

  const {
    bake_id,
    status,
    created_at,
    updated_at,
    employee_id,
    first_name,
    last_name,
    recipe_id,
    title,
    image_url,
  } = bakeRecord;

  return {
    bake_id,
    status,
    created_at,
    updated_at,
    employee: {
      employee_id,
      first_name,
      last_name,
    },
    recipe: {
      recipe_id,
      title,
      image_url,
    },
  };
}

async function update(bakeId, updatedBake) {
  const [updatedRecord] = await knex(tableName)
    .where({ bake_id: bakeId })
    .update(updatedBake)
    .returning("*");

  const { employee, recipe } = await read(bakeId);

  return {
    ...updatedRecord,
    employee,
    recipe
  };
}

module.exports = {
  create,
  list,
  read,
  update,
};
