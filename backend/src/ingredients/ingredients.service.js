const knex = require("../db/connection");

const tableName = "ingredients";

function list() {
    return knex(tableName).select('*');
}

function read(ingredientId) {
    return knex(tableName).where({ ingredient_id: ingredientId}).first();
}

module.exports = {
    list,
    read,
}