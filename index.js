const { PORT = 5000 } = process.env;

import knex from "./src/db/connection";
import path from "path";

import dotenv from "dotenv";
dotenv.config({ path: path.join(__dirname, "..", ".env") });

import express from "express";
import cors from "cors";

import errorHandler from "./src/errors/errorHandler";
import notFound from "./src/errors/notFound";
import reservationsRouter from "./api/reservations/router";
import tablesRouter from "./api/tables/router";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/dashboard", reservationsRouter);
app.use("/tables", tablesRouter);
app.use("/reservations", reservationsRouter);

app.use(notFound);
app.use(errorHandler);

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

listener();
