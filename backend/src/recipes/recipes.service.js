const knex = require("../db/connection");

const tableName = "recipes";

function list() {
    return knex('recipes').select('*');
}

module.exports = {
    list,
}