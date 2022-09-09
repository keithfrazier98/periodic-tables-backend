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
exports.exportAliases = void 0;
var asyncErrorBoundary_1 = __importDefault(require("../../src/errors/asyncErrorBoundary"));
var service_1 = __importDefault(require("./service"));
/**
 * List handler for reservation resources
 */
function list(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var mobile_number, searchResults, date, data, sorted;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!req.query.mobile_number) return [3 /*break*/, 2];
                    mobile_number = req.query.mobile_number;
                    return [4 /*yield*/, service_1.default.search(mobile_number)];
                case 1:
                    searchResults = _a.sent();
                    res.json({ data: searchResults });
                    return [3 /*break*/, 4];
                case 2:
                    date = req.query.date;
                    return [4 /*yield*/, service_1.default.list(date)];
                case 3:
                    data = _a.sent();
                    data.sort(function (t1, t2) {
                        var t1_time = t1.reservation_time;
                        var t1_hours = Number("".concat(t1_time[0]).concat(t1_time[1]));
                        var t1_minutes = Number("".concat(t1_time[3]).concat(t1_time[4]));
                        var t2_time = t2.reservation_time;
                        var t2_hours = Number("".concat(t2_time[0]).concat(t2_time[1]));
                        var t2_minutes = Number("".concat(t2_time[3]).concat(t2_time[4]));
                        if (t1_hours === t2_hours) {
                            return t1_minutes - t2_minutes;
                        }
                        else {
                            return t1_hours - t2_hours;
                        }
                    });
                    sorted = data.filter(function (reservation) { return reservation.status !== "finished"; });
                    res.json({
                        data: sorted,
                    });
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
function read(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var reservation_id, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    reservation_id = req.params.reservation_id;
                    return [4 /*yield*/, service_1.default.read(reservation_id)];
                case 1:
                    data = _a.sent();
                    if (data) {
                        res.json({
                            data: data,
                        });
                    }
                    else {
                        next({ status: 404, message: "".concat(reservation_id) });
                    }
                    return [2 /*return*/];
            }
        });
    });
}
// validate reservation exists -> set resrvation as local vairable or call error
function reservationExists(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var reservation_id, exists;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    reservation_id = req.params.reservation_id;
                    return [4 /*yield*/, service_1.default.read(reservation_id)];
                case 1:
                    exists = _a.sent();
                    if (!exists) {
                        next({ status: 404, message: reservation_id });
                    }
                    else {
                        res.locals.reservation = exists;
                        next();
                    }
                    return [2 /*return*/];
            }
        });
    });
}
// validate reservation has proper status when updating status
function properStatus(req, res, next) {
    var status = req.body.data.status;
    var reservation = res.locals.reservation;
    if (status === "seated" && reservation.status === "seated") {
        next({ status: 400, message: "seated" });
    }
    if (reservation.status === "finished") {
        next({ status: 400, message: "finished" });
    }
    if (status === "booked" ||
        status === "seated" ||
        status === "finished" ||
        status === "cancelled") {
        res.locals.status = status;
        next();
    }
    else {
        next({ status: 400, message: "unknown" });
    }
}
// change status of reservation in database
function changeStatus(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var reservation_id, status, newStatus;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    reservation_id = req.params.reservation_id;
                    if (!reservation_id) {
                        next({ status: 400, message: reservation_id });
                    }
                    if (!req.body.data) {
                        next({ status: 400, message: "data" });
                    }
                    status = res.locals.status;
                    return [4 /*yield*/, service_1.default.changeStatus(status, reservation_id)];
                case 1:
                    newStatus = _a.sent();
                    res.status(200).json({ data: { status: newStatus[0] } });
                    return [2 /*return*/];
            }
        });
    });
}
//create a new reservation
function create(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var reservation, newReservation;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    reservation = req.body.data;
                    if (!reservation) {
                        next({ status: 400, message: "no reservation" });
                    }
                    if (!reservation.status) {
                        reservation = __assign(__assign({}, reservation), { status: "booked" });
                    }
                    if (reservation.status === "finished") {
                        next({ status: 400, message: "finished" });
                    }
                    if (reservation.status === "seated") {
                        next({ status: 400, message: "seated" });
                    }
                    return [4 /*yield*/, service_1.default.create(reservation)];
                case 1:
                    newReservation = _a.sent();
                    res.status(201).json({
                        data: newReservation[0],
                    });
                    return [2 /*return*/];
            }
        });
    });
}
//validate req.body reservation has proper data or return error
function validateReservation(req, res, next) {
    var reservation = req.body.data;
    if (!reservation) {
        next({ status: 400, message: "data" });
    }
    var first_name = reservation.first_name, last_name = reservation.last_name, mobile_number = reservation.mobile_number, reservation_date = reservation.reservation_date, reservation_time = reservation.reservation_time, people = reservation.people;
    var attributes = {
        first_name: first_name,
        last_name: last_name,
        reservation_time: reservation_time,
        reservation_date: reservation_date,
        people: people,
        mobile_number: mobile_number,
    };
    var isValidData = true;
    for (var _i = 0, _a = Object.entries(attributes); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        if (key === "people" && isNaN(value)) {
            isValidData = false;
            next({ status: 400, message: "people" });
        }
        if (!value || value === "") {
            isValidData = false;
            next({ status: 400, message: "".concat(key) });
        }
        if (key === "reservation_time") {
            //interpolate hours and minutes and check validity
            var hours = Number("".concat(value[0]).concat(value[1]));
            var minutes = Number("".concat(value[3]).concat(value[4]));
            if (hours > 20 ||
                hours < 10 ||
                minutes < 0 ||
                minutes > 60 ||
                isNaN(minutes) ||
                isNaN(hours) ||
                (hours === 20 && minutes > 30) ||
                (hours === 10 && minutes < 30)) {
                isValidData = false;
                next({ status: 400, message: key });
            }
        }
        if (key === "reservation_date") {
            var message = "";
            var date = new Date("".concat(value, " ").concat(attributes.reservation_time));
            // if (isNaN(date)) {
            //   next({ status: 400, message: `${key}` });
            // }
            var today = new Date(Date.now());
            var offset = today.getTimezoneOffset() / 60;
            var isATuesday = date.getDay() === 2;
            var compareYear = date.getFullYear() - today.getFullYear();
            var compareMonth = date.getMonth() - today.getMonth();
            var compareDay = date.getDate() - today.getDate();
            var compareHours = date.getHours() + 7 - today.getHours();
            var compareMinutes = date.getMinutes() - today.getMinutes();
            var isInThePast = void 0;
            if (compareYear >= 0) {
                if (compareYear === 0) {
                    if (compareMonth >= 0) {
                        if (compareMonth === 0) {
                            if (compareDay >= 0) {
                                if (compareDay === 0) {
                                    if (compareHours >= 0) {
                                        if (compareHours === 0) {
                                            if (compareMinutes >= 0 || compareMinutes === 0) {
                                            }
                                            else {
                                                //minute is in the past
                                                isValidData = false;
                                                message = "future";
                                                isInThePast = true;
                                            }
                                        }
                                    }
                                    else {
                                        //hour is in the past
                                        isValidData = false;
                                        message = "future";
                                        isInThePast = true;
                                    }
                                }
                            }
                            else {
                                //day is in the past
                                isValidData = false;
                                message = "future";
                                isInThePast = true;
                            }
                        }
                    }
                    else {
                        //month is in the past
                        isValidData = false;
                        message = "future";
                        isInThePast = true;
                    }
                }
            }
            else {
                //year is in the past
                isValidData = false;
                message = "future";
                isInThePast = true;
            }
            if (isATuesday) {
                message = "closed";
            }
            if (isATuesday || isInThePast) {
                next({ status: 400, message: "".concat(message) });
            }
        }
    }
    if (isValidData) {
        next();
    }
    else {
        next({ status: 400, message: "Data is invalid" });
    }
}
//edit existing resrevation data
function editReservation(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var reservation_id, reservation, update;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    reservation_id = req.params.reservation_id;
                    if (!reservation_id) {
                        next({ status: 400, message: "data" });
                    }
                    if (!req.body.data) {
                        next({ status: 400, message: "data" });
                    }
                    reservation = req.body.data;
                    if (!reservation) {
                        next({ status: 400, message: "no reservation" });
                    }
                    return [4 /*yield*/, service_1.default.editReservation(reservation_id, reservation)];
                case 1:
                    update = _a.sent();
                    res.status(200).json({ data: update[0] });
                    return [2 /*return*/];
            }
        });
    });
}
function isPeopleNumber(req, res, next) {
    var people = req.body.data.people;
    if (typeof people !== "number") {
        return next({
            status: 400,
            message: "people: must be a Number",
        });
    }
    else {
        next();
    }
}
var exportAliases = {
    list: (0, asyncErrorBoundary_1.default)(list),
    create: [
        (0, asyncErrorBoundary_1.default)(validateReservation),
        isPeopleNumber,
        (0, asyncErrorBoundary_1.default)(create),
    ],
    read: (0, asyncErrorBoundary_1.default)(read),
    changeStatus: [
        (0, asyncErrorBoundary_1.default)(reservationExists),
        properStatus,
        (0, asyncErrorBoundary_1.default)(changeStatus),
    ],
    editReservation: [
        (0, asyncErrorBoundary_1.default)(validateReservation),
        isPeopleNumber,
        (0, asyncErrorBoundary_1.default)(reservationExists),
        (0, asyncErrorBoundary_1.default)(editReservation),
    ],
};
exports.exportAliases = exportAliases;
//# sourceMappingURL=controller.js.map