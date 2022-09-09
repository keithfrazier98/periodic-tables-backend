import knex from "../../src/db/connection";

export function list(date) {
  return knex("reservations")
    .whereRaw(`reservation_date='${date}'`)
    .select("*");
}

export function search(mobile_number) {
  return knex("reservations")
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");
}

export function create(reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning([
      "reservation_id",
      "reservation_date",
      "first_name",
      "last_name",
      "mobile_number",
      "people",
      "reservation_time",
    ]);
}

export function read(reservation_id) {
  return knex("reservations")
    .whereRaw(`reservation_id='${reservation_id}'`)
    .select("*")
    .first();
}
export function changeStatus(status, reservation_id) {
  return knex("reservations")
    .whereRaw(`reservation_id=${reservation_id}`)
    .update("status", status)
    .returning("status");
}

export function editReservation(reservation_id, reservation) {
  const {
    status,
    reservation_time,
    reservation_date,
    first_name,
    last_name,
    people,
    created_at,
    mobile_number,
  } = reservation;

  return knex("reservations")
    .whereRaw(`reservation_id=${reservation_id}`)
    .update({
      status: status,
      reservation_time: reservation_time,
      reservation_date: reservation_date,
      first_name: first_name,
      last_name: last_name,
      people: people,
      created_at: created_at,
      mobile_number: mobile_number,
    })
    .returning([
      "first_name",
      "last_name",
      "mobile_number",
      "people",
      "reservation_date",
      "reservation_time",
    ]);
}

export default {
  list,
  search,
  create,
  read,
  changeStatus,
  editReservation,
};
