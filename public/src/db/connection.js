"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var environment = process.env.NODE_ENV || "development";
var knexfile_1 = __importDefault(require("../../knexfile"));
var config = knexfile_1.default[environment];
var knex_1 = __importDefault(require("knex"));
var knex = (0, knex_1.default)(config);
exports.default = knex;
//# sourceMappingURL=connection.js.map