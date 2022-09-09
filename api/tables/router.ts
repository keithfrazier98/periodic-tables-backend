import express from "express";
const router = express.Router();

import controller from "./controller";

router
  .route("/")
  .get(controller.list)
  .post(controller.create)
  .delete(controller.removeTable);
router
  .route("/:table_id/seat")
  .put(controller.seatReservation)
  .delete(controller.destroy);

export default router;
