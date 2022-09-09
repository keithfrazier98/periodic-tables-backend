import reservations from "./00-reservations_data.json";
export function seed(knex) {
  return knex.raw("TRUNCATE TABLE reservations RESTART IDENTITY CASCADE").then(() => knex("reservations").insert(reservations));
}
