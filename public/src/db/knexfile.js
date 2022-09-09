"use strict";
/**
 * Knex configuration file.
 *
 * You will not need to make changes to this file.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var path_1 = __importDefault(require("path"));
var _a = process.env, _b = _a.DATABASE_URL, DATABASE_URL = _b === void 0 ? "postgresql://postgres@localhost/postgres" : _b, _c = _a.DATABASE_URL_DEVELOPMENT, DATABASE_URL_DEVELOPMENT = _c === void 0 ? "postgresql://postgres@localhost/postgres" : _c, _d = _a.DATABASE_URL_TEST, DATABASE_URL_TEST = _d === void 0 ? "postgresql://postgres@localhost/postgres" : _d, _e = _a.DATABASE_URL_PREVIEW, DATABASE_URL_PREVIEW = _e === void 0 ? "postgresql://postgres@localhost/postgres" : _e, DEBUG = _a.DEBUG;
exports.default = {
    development: {
        client: "postgresql",
        pool: { min: 1, max: 5 },
        connection: DATABASE_URL_DEVELOPMENT,
        migrations: {
            directory: path_1.default.join(__dirname, "src", "db", "migrations"),
        },
        seeds: {
            directory: path_1.default.join(__dirname, "src", "db", "seeds"),
        },
        debug: !!DEBUG,
    },
    test: {
        client: "postgresql",
        pool: { min: 1, max: 5 },
        connection: DATABASE_URL_TEST,
        migrations: {
            directory: path_1.default.join(__dirname, "src", "db", "migrations"),
        },
        seeds: {
            directory: path_1.default.join(__dirname, "src", "db", "seeds"),
        },
        debug: !!DEBUG,
    },
    preview: {
        client: "postgresql",
        pool: { min: 1, max: 5 },
        connection: DATABASE_URL_PREVIEW,
        migrations: {
            directory: path_1.default.join(__dirname, "src", "db", "migrations"),
        },
        seeds: {
            directory: path_1.default.join(__dirname, "src", "db", "seeds"),
        },
        debug: !!DEBUG,
    },
    production: {
        client: "postgresql",
        pool: { min: 1, max: 5 },
        connection: DATABASE_URL,
        migrations: {
            directory: path_1.default.join(__dirname, "src", "db", "migrations"),
        },
        seeds: {
            directory: path_1.default.join(__dirname, "src", "db", "seeds"),
        },
        debug: !!DEBUG,
        ssl: {
            require: true,
            rejectUnauthorized: false
        },
    },
};
//# sourceMappingURL=knexfile.js.map