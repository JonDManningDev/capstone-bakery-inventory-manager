const knex = require("../db/connection");

const tableName = "bakes";

function create(newBake) {
    return knex(tableName).insert(newBake).returning('*');
}

module.exports = {
    create,
};