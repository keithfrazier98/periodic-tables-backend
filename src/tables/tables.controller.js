const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./tables.service");

function validateTable(req, res, next) {
  const data = req.body.data;

  if (!data) {
    next({ status: 400, message: "data" });
  }

  const { table_name, capacity } = data;

  if (!table_name || table_name === "" || table_name.length <= 1) {
    next({ status: 400, message: "table_name" });
  }

  if (!capacity || isNaN(capacity) || capacity <= 0) {
    next({ status: 400, message: "capacity" });
  }

  next();
}

async function create(req, res) {
  const table = req.body.data;
  const created = await service.create(table);
  res.status(201).json({ data: created[0] });
}

async function updateReservationId(req, res, next) {
  const { table_id } = req.params;
  const { reservation_id } = req.body.data;

  if (res.locals.isOccupied) {
    next({ status: 400, message: "occupied" });
  }

  const capacity = Number(res.locals.table.capacity);
  const people = Number(res.locals.reservation.people);

  if (capacity < people) {
    next({ status: 400, message: "capacity" });
  }

  const status = res.locals.reservation.status;
  let assignedId = await service.assignId(table_id, reservation_id);
  res.status(200).json({ data: { status: status } });
}

async function reservationExists(req, res, next) {
  if (!req.body.data) {
    next({ status: 400, message: "data" });
  }
  const { reservation_id } = req.body.data;

  if (!reservation_id) {
    next({ status: 400, message: "reservation_id" });
  }

  const exists = await service.reservationExists(reservation_id);

  if (exists) {
    res.locals.reservation = exists;
    next();
  } else {
    next({ status: 404, message: `${reservation_id}` });
  }
}

async function isOccupied(req, res, next) {
  const { table_id } = req.params;
  const table = await service.getTable(table_id);

  if (!table) {
    next({ status: 404, message: table_id });
  }

  if (table.reservation_id) {
    res.locals.isOccupied = true;
    res.locals.table = table;
    next();
  } else {
    res.locals.isOccupied = false;
    res.locals.table = table;
    next();
  }
}

async function list(req, res) {
  const list = await service.list();
  list.sort((t1, t2) => {
    if (
      (!t1.table_name.includes("Bar") && !t2.table_name.includes("Bar")) ||
      (t1.table_name.includes("Bar") && t2.table_name.includes("Bar"))
    ) {
      let a = t1.table_name.split("");
      let T1Num = [];
      a.forEach((char) => {
        if (Number(char)) {
          T1Num.push(char);
        }
      });
      a = T1Num.join("");

      let b = t2.table_name.split("");
      let T2Num = [];
      b.forEach((char) => {
        if (Number(char)) {
          T2Num.push(char);
        }
      });

      b = T2Num.join("");

      return Number(a) - Number(b);
    } else {
      if (!t1.table_name.includes("Bar")) {
        return -1;
      } else {
        return 1;
      }
    }
  });

  res.json({
    data: list,
  });
}

async function freeTable(req, res, next) {
  if (!res.locals.isOccupied) {
    next({ status: 400, message: "not occupied" });
  }

  const { table_id } = req.params;
  await service.freeTable(table_id);
  next();
}

async function finishReservation(req, res) {
  const { reservation_id } = res.locals.table;
  if (!reservation_id) {
    next({ status: 400, message: "" });
  }
  await service.finishReservation(reservation_id);
  res.sendStatus(200);
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [asyncErrorBoundary(validateTable), asyncErrorBoundary(create)],
  updateReservationId: [
    asyncErrorBoundary(isOccupied),
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(updateReservationId),
  ],
  destroy: [
    asyncErrorBoundary(isOccupied),
    asyncErrorBoundary(freeTable),
    asyncErrorBoundary(finishReservation),
  ],
};
