import tables from "./01-tables_data.json"
export function seed (knex) {
  return knex.raw("TRUNCATE TABLE tables RESTART IDENTITY CASCADE")
  .then(() => knex("tables").insert(tables))
};
