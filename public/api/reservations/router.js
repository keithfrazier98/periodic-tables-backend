"use strict";
/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var controller = require("./reservations.controller");
router.route("/").get(controller.list).post(controller.create);
router
    .route("/:reservation_id")
    .put(controller.editReservation)
    .get(controller.read);
router.route("/:reservation_id/status").put(controller.changeStatus);
exports.default = router;
//# sourceMappingURL=router.js.map