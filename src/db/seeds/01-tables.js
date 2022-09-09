const tables = require("./01-tables_data.json")
exports.seed = function (knex) {
  return knex.raw("TRUNCATE TABLE tables RESTART IDENTITY CASCADE")
  .then(() => knex("tables").insert(tables))
};
