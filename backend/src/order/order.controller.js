import mongoose from "mongoose";
import order from "./order.model.js";
import createHttpError from "http-errors";
import table from "../table/table.model.js";

export async function createOrder(req, res, next) {
  try {
    const { totalPrice, phone, userId, bookedTable, name, people, note } = req.body;
    const newOrder = new order({
      totalPrice,
      status: "success",
      userId,
      bookedTable,
      phone,
      name,
      people,
      note,
    });
    bookedTable.forEach(async (bookedTable) => {
      const { tableNumber, timeSlot } = bookedTable;
      await table.updateOne(
        { tableNumber: tableNumber, "timeSlot.time": timeSlot },
        { $set: { "timeSlot.$.status": false } }
      );
    });
    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export async function getOrderByPhone(req, res, next) {
  try {
    const { phone } = req.params;
    if (!phone) {
      throw createHttpError.BadRequest();
    }
    const checkPhone = await order.find({ phone });
    if (!checkPhone) {
      throw createHttpError.NotFound("not found order");
    }
    res.status(200).json(checkPhone);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export async function getOrder(req, res, next) {
  try {
    const { status } = req.query;
    const orderList = await order.find({ status: status });
    res.status(200).json(orderList);
  } catch (error) {
    next(error);
  }
}

export async function cancelOrder(req, res, next) {
  try {
    const { id } = req.params;
    console.log(id);
    if (!id) {
      throw createHttpError.BadRequest();
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw createHttpError.NotFound("not found order");
    }
    const checkOrder = await order.findByIdAndUpdate(id, { status: "cancel" });
    if (!checkOrder) {
      throw createHttpError.NotFound("not found order");
    }
    checkOrder.bookedTable.forEach(async (bookedTable) => {
      const { tableNumber, timeSlot } = bookedTable;
      await table.updateOne(
        { tableNumber: tableNumber, "timeSlot.time": timeSlot },
        { $set: { "timeSlot.$.status": true } }
      );
    });
    res.status(200).json({ message: "cancel successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
}
export async function verifyOrder(req, res, next) {
  try {
    const { id } = req.params;
    if (!id) {
      throw createHttpError.BadRequest();
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw createHttpError.NotFound("not found order");
    }
    const checkOrder = await order.findByIdAndUpdate(id, { status: "verified" });
    if (!checkOrder) {
      throw createHttpError.NotFound("not found order");
    }
    res.status(200).json({ message: "verify successfully" });
  } catch (error) {
    next(error);
  }
}
export async function finishOrder(req, res, next) {
  try {
    const { id } = req.params;
    if (!id) {
      throw createHttpError.BadRequest();
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw createHttpError.NotFound("not found order");
    }
    const checkOrder = await order.findByIdAndUpdate({ _id: id }, { status: "finished" });
    if (!checkOrder) {
      throw createHttpError.NotFound("not found order");
    }
    checkOrder.bookedTable.forEach(async (bookedTable) => {
      const { tableNumber, timeSlot } = bookedTable;
      await table.updateOne(
        { tableNumber: tableNumber, "timeSlot.time": timeSlot },
        { $set: { "timeSlot.$.status": true } }
      );
    });
    res.status(200).json({ message: "order finished" });
  } catch (error) {
    next(error);
  }
}
