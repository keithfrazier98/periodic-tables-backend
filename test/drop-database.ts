const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

import knex from "../src/db/connection";

knex.migrate
  .forceFreeMigrationsLock()
  .then(() => knex.migrate.rollback(undefined, true))
  .then(() => knex.migrate.latest())
  .then(() => knex.seed.run())
  .then(() => console.log("Dropped and seeded database"))
  .then(() => knex.destroy())
  .catch((error) => console.error("Failed to drop and seed database", error));
