const { get } = require("../app");
const knex = require("../db/connection");

function list() {
  return knex("tables").select("*");
}

function assignId(table_id, reservation_id ) {
  //assigns reservation id to a table to 'seat' a reservation
  return knex("tables")
    .whereRaw(`table_id=${table_id}`)
    .update("reservation_id", reservation_id);
}

function create(table) {
  return knex("tables").insert(table).returning(['table_name', 'capacity']);
}

function reservationExists(reservation_id){
  return knex("reservations").whereRaw(`reservation_id=${reservation_id}`).select("*").first()
}

function getTable(table_id) {
  //returns reservation_id from table
  return knex("tables")
    .whereRaw(`table_id=${table_id}`)
    .first();
}

function freeTable(table_id) {
  //sets reservation_id to null
  return knex("tables")
    .whereRaw(`table_id=${table_id}`)
    .update("reservation_id", null);
}

function finishReservation(reservation_id) {
  return knex("reservations")
    .whereRaw(`reservation_id=${reservation_id}`)
    .update(`status`, 'finished');
}
module.exports = {
  list,
  create,
  assignId,
  freeTable,
  getTable,
  finishReservation,
  reservationExists
};
