const knex = require("../db/connection");

const tableName = "unit_conversions"

function listConversions() {
    return knex(tableName).select('*');
}

async function listUnits() {
    // Get the from_unit records, ordered alphabetically
    const records = await knex(tableName).distinct('from_unit').orderBy('from_unit');

    // Extract the values, add "unit", filter out temperature units, return the list
    const units = records.map((record) => record.from_unit);
    units.push("unit");
    const filteredUnits = units.filter((element) => element !== "celsius" && element !== "fahrenheit");
    return filteredUnits;
}

module.exports = {
    listConversions,
    listUnits,
}