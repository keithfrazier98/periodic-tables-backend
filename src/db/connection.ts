const environment = process.env.NODE_ENV || "development";
import knexfile from "../../knexfile";
const config = knexfile[environment];
import Knex from "knex";

const knex = Knex(config);

export default knex;
