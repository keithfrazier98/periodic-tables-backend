const reservations = require("./00-reservations_data.json")
exports.seed = function (knex) {
  return knex.raw("TRUNCATE TABLE reservations RESTART IDENTITY CASCADE")
  .then(() => knex("reservations").insert(reservations))
};
