/**
 * Knex configuration file.
 *
 * You will not need to make changes to this file.
 */

import dotenv from "dotenv";
dotenv.config();
import path from "path";

const {
  DATABASE_URL = "postgresql://postgres@localhost/postgres",
  DATABASE_URL_DEVELOPMENT = "postgresql://postgres@localhost/postgres",
  DATABASE_URL_TEST = "postgresql://postgres@localhost/postgres",
  DATABASE_URL_PREVIEW = "postgresql://postgres@localhost/postgres",
  DEBUG,
} = process.env;

export default {
  development: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_DEVELOPMENT,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
      loadExtensions: [`.ts`],
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
      loadExtensions: [`.ts`],
    },
    debug: !!DEBUG,
  },
  test: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_TEST,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
      loadExtensions: [`.ts`],
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
      loadExtensions: [`.ts`],
    },
    debug: !!DEBUG,
  },
  preview: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_PREVIEW,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
      loadExtensions: [`.ts`],
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
      loadExtensions: [`.ts`],
    },
    debug: !!DEBUG,
  },
  production: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
      loadExtensions: [`.ts`],
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
      loadExtensions: [`.ts`],
    },
    debug: !!DEBUG,
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
};
