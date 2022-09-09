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
var controller_1 = __importDefault(require("./controller"));
router.route("/").get(controller_1.default.list).post(controller_1.default.create);
router
    .route("/:reservation_id")
    .put(controller_1.default.editReservation)
    .get(controller_1.default.read);
router.route("/:reservation_id/status").put(controller_1.default.changeStatus);
exports.default = router;
//# sourceMappingURL=router.js.map