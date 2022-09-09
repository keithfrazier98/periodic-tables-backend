"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = require("../../src/errors");
var service_1 = __importDefault(require("./service"));
var service_2 = __importDefault(require("../reservations/service"));
// validate table in req.body has proper data
function validateTable(req, res, next) {
    var data = req.body.data;
    if (!data) {
        next({ status: 400, message: "data" });
    }
    var table_name = data.table_name, capacity = data.capacity;
    if (!table_name || table_name === "" || table_name.length <= 1) {
        next({ status: 400, message: "table_name" });
    }
    if (!capacity || isNaN(capacity) || capacity <= 0) {
        next({ status: 400, message: "capacity" });
    }
    next();
}
// create a new table
function create(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var table, created;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    table = req.body.data;
                    return [4 /*yield*/, service_1.default.create(table)];
                case 1:
                    created = _a.sent();
                    res.status(201).json({ data: created[0] });
                    return [2 /*return*/];
            }
        });
    });
}
function seatReservation(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var table_id, reservation_id, capacity, people, status, resev, updated;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    table_id = req.params.table_id;
                    reservation_id = req.body.data.reservation_id;
                    if (res.locals.isOccupied) {
                        next({ status: 400, message: "occupied" });
                    }
                    capacity = Number(res.locals.table.capacity);
                    people = Number(res.locals.reservation.people);
                    if (capacity < people) {
                        next({ status: 400, message: "capacity" });
                    }
                    status = res.locals.reservation.status;
                    return [4 /*yield*/, service_1.default.assignId(table_id, reservation_id)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, service_2.default.read(reservation_id)];
                case 2:
                    resev = _a.sent();
                    if (resev.status === "seated") {
                        next({
                            message: "already seated",
                            status: 400,
                        });
                    }
                    return [4 /*yield*/, service_1.default.updateRes(__assign(__assign({}, resev), { status: "seated" }))];
                case 3:
                    updated = _a.sent();
                    res.status(200).json({ data: updated });
                    return [2 /*return*/];
            }
        });
    });
}
// validate reservation exists
function reservationExists(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var reservation_id, exists;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!req.body.data) {
                        next({ status: 400, message: "data" });
                    }
                    reservation_id = req.body.data.reservation_id;
                    if (!reservation_id) {
                        next({ status: 400, message: "reservation_id" });
                    }
                    return [4 /*yield*/, service_1.default.reservationExists(reservation_id)];
                case 1:
                    exists = _a.sent();
                    if (exists) {
                        res.locals.reservation = exists;
                        next();
                    }
                    else {
                        next({ status: 404, message: "".concat(reservation_id) });
                    }
                    return [2 /*return*/];
            }
        });
    });
}
// validate whether a table is already occupied
function isOccupied(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var table_id, table;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    table_id = req.params.table_id;
                    return [4 /*yield*/, service_1.default.read(table_id)];
                case 1:
                    table = _a.sent();
                    if (!table) {
                        next({ status: 404, message: table_id });
                    }
                    if (table.reservation_id) {
                        res.locals.isOccupied = true;
                        res.locals.table = table;
                        next();
                    }
                    else {
                        res.locals.isOccupied = false;
                        res.locals.table = table;
                        next();
                    }
                    return [2 /*return*/];
            }
        });
    });
}
// list and sort all tables by name
function list(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var list;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, service_1.default.list()];
                case 1:
                    list = _a.sent();
                    list.sort(function (t1, t2) {
                        if ((!t1.table_name.includes("Bar") && !t2.table_name.includes("Bar")) ||
                            (t1.table_name.includes("Bar") && t2.table_name.includes("Bar"))) {
                            var a = t1.table_name.split("");
                            var T1Num_1 = [];
                            a.forEach(function (char) {
                                if (Number(char)) {
                                    T1Num_1.push(char);
                                }
                            });
                            a = T1Num_1.join("");
                            var b = t2.table_name.split("");
                            var T2Num_1 = [];
                            b.forEach(function (char) {
                                if (Number(char)) {
                                    T2Num_1.push(char);
                                }
                            });
                            b = T2Num_1.join("");
                            return Number(a) - Number(b);
                        }
                        else {
                            if (!t1.table_name.includes("Bar")) {
                                return -1;
                            }
                            else {
                                return 1;
                            }
                        }
                    });
                    res.json({
                        data: list,
                    });
                    return [2 /*return*/];
            }
        });
    });
}
// validate whether a table is free
function freeTable(req, res, next) {
    if (!res.locals.isOccupied) {
        next({ status: 400, message: "not occupied" });
    }
    next();
}
function removeTable(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var table_id;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    table_id = req.query.table_id;
                    return [4 /*yield*/, service_1.default.destroy(table_id)];
                case 1:
                    _a.sent();
                    res.status(200).json({ data: "deleted" });
                    return [2 /*return*/];
            }
        });
    });
}
// finish reservation and clear table
function finishReservation(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var table_id, table, reservation_id, resev, updated;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    table_id = req.params.table_id;
                    return [4 /*yield*/, service_1.default.read(table_id)];
                case 1:
                    table = _a.sent();
                    reservation_id = table.reservation_id;
                    return [4 /*yield*/, service_2.default.read(reservation_id)];
                case 2:
                    resev = _a.sent();
                    return [4 /*yield*/, service_1.default.updateRes(__assign(__assign({}, resev), { status: "finished" }))];
                case 3:
                    updated = _a.sent();
                    return [4 /*yield*/, service_1.default.freeTable(table_id)];
                case 4:
                    _a.sent();
                    res.status(200).json({ data: "finished" });
                    return [2 /*return*/];
            }
        });
    });
}
exports.default = {
    list: (0, errors_1.asyncErrorBoundary)(list),
    create: [(0, errors_1.asyncErrorBoundary)(validateTable), (0, errors_1.asyncErrorBoundary)(create)],
    seatReservation: [
        (0, errors_1.asyncErrorBoundary)(isOccupied),
        (0, errors_1.asyncErrorBoundary)(reservationExists),
        (0, errors_1.asyncErrorBoundary)(seatReservation),
    ],
    destroy: [
        (0, errors_1.asyncErrorBoundary)(isOccupied),
        freeTable,
        (0, errors_1.asyncErrorBoundary)(finishReservation),
    ],
    removeTable: (0, errors_1.asyncErrorBoundary)(removeTable),
};
//# sourceMappingURL=controller.js.map