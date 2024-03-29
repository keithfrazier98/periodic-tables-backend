export function up(knex) {
  return knex.schema.createTable("reservations", (table) => {
    table.increments("reservation_id").primary();
    table.timestamps(true, true);
    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
    table.string("mobile_number").notNullable();
    table.integer("people").notNullable();
    table.date("reservation_date").notNullable();
    table.time("reservation_time").notNullable();
    table.string("status");
  });
}

export function down(knex) {
  return knex.schema.dropTable("reservations");
}
