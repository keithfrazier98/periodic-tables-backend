/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

import express from "express";
const router = express.Router();

import controller from "./controller";
router.route("/").get(controller.list).post(controller.create);
router
  .route("/:reservation_id")
  .put(controller.editReservation)
  .get(controller.read);
router.route("/:reservation_id/status").put(controller.changeStatus);

export default router;
