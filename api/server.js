const { PORT = 5000 } = process.env;

const app = require("./app");
const knex = require("../src/db/connection");

async function listener() {
  try {
    const migrations = await knex.migrate.latest();
    console.log("migrations", migrations);
    app.listen(PORT, () => console.log(`Listening on Port ${PORT}!`));
  } catch (error) {
    console.error(error);
    knex.destroy();
  }
}

const server = listener();
export { listener };
