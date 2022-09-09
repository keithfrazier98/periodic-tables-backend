"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var controller_1 = __importDefault(require("./controller"));
router
    .route("/")
    .get(controller_1.default.list)
    .post(controller_1.default.create)
    .delete(controller_1.default.removeTable);
router
    .route("/:table_id/seat")
    .put(controller_1.default.seatReservation)
    .delete(controller_1.default.destroy);
exports.default = router;
//# sourceMappingURL=router.js.map