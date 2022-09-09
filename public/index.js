"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = process.env.PORT, PORT = _a === void 0 ? 5000 : _a;
var path_1 = __importDefault(require("path"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, "..", ".env") });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var errorHandler_1 = __importDefault(require("./src/errors/errorHandler"));
var notFound_1 = __importDefault(require("./src/errors/notFound"));
var router_1 = __importDefault(require("./api/reservations/router"));
var router_2 = __importDefault(require("./api/tables/router"));
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/dashboard", router_1.default);
app.use("/api/tables", router_2.default);
app.use("/api/reservations", router_1.default);
app.use(notFound_1.default);
app.use(errorHandler_1.default);
// knex.migrate
//   .latest()
//   .then((migrations) => {
//     console.log("migrations", migrations);
app.listen(PORT, function () { return console.log("Listening on Port ".concat(PORT, "!")); });
// })
// .catch((error) => {
//   console.error(error);
//   knex.destroy();
// });
//# sourceMappingURL=index.js.map