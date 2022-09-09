"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editReservation = exports.changeStatus = exports.read = exports.create = exports.search = exports.list = void 0;
var connection_1 = __importDefault(require("../../src/db/connection"));
function list(date) {
    return (0, connection_1.default)("reservations")
        .whereRaw("reservation_date='".concat(date, "'"))
        .select("*");
}
exports.list = list;
function search(mobile_number) {
    return (0, connection_1.default)("reservations")
        .whereRaw("translate(mobile_number, '() -', '') like ?", "%".concat(mobile_number.replace(/\D/g, ""), "%"))
        .orderBy("reservation_date");
}
exports.search = search;
function create(reservation) {
    return (0, connection_1.default)("reservations")
        .insert(reservation)
        .returning([
        "reservation_id",
        "reservation_date",
        "first_name",
        "last_name",
        "mobile_number",
        "people",
        "reservation_time",
    ]);
}
exports.create = create;
function read(reservation_id) {
    return (0, connection_1.default)("reservations")
        .whereRaw("reservation_id='".concat(reservation_id, "'"))
        .select("*")
        .first();
}
exports.read = read;
function changeStatus(status, reservation_id) {
    return (0, connection_1.default)("reservations")
        .whereRaw("reservation_id=".concat(reservation_id))
        .update("status", status)
        .returning("status");
}
exports.changeStatus = changeStatus;
function editReservation(reservation_id, reservation) {
    var status = reservation.status, reservation_time = reservation.reservation_time, reservation_date = reservation.reservation_date, first_name = reservation.first_name, last_name = reservation.last_name, people = reservation.people, created_at = reservation.created_at, mobile_number = reservation.mobile_number;
    return (0, connection_1.default)("reservations")
        .whereRaw("reservation_id=".concat(reservation_id))
        .update({
        status: status,
        reservation_time: reservation_time,
        reservation_date: reservation_date,
        first_name: first_name,
        last_name: last_name,
        people: people,
        created_at: created_at,
        mobile_number: mobile_number,
    })
        .returning([
        "first_name",
        "last_name",
        "mobile_number",
        "people",
        "reservation_date",
        "reservation_time",
    ]);
}
exports.editReservation = editReservation;
exports.default = {
    list: list,
    search: search,
    create: create,
    read: read,
    changeStatus: changeStatus,
    editReservation: editReservation,
};
//# sourceMappingURL=service.js.map