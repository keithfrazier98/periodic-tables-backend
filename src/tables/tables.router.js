const router = require("express").Router()
const controller = require("./tables.controller")

router.route("/").get(controller.list).post(controller.create).delete(controller.removeTable)
router.route("/:table_id/seat").put(controller.seatReservation).delete(controller.destroy)


module.exports = router