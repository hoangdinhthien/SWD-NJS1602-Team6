import createHttpError from "http-errors";
import table from "./table.model.js";
import mongoose from "mongoose";

export async function getTable(req, res, next) {
  try {
    // const condition = { "timeSlot.time": "17h-20h" };
    const listTable = await table.find();
    res.status(200).json(listTable);
  } catch (error) {
    next(error);
  }
}

export async function editTable(req, res, next) {
  try {
    const { id } = req.params;
    if (!id) {
      throw createHttpError.BadRequest();
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw createHttpError.NotFound("Not found table");
    }
    const { type, seats, price } = req.body;
    if (!type || !seats || !price) {
      throw createHttpError.BadRequest();
    }

    const updatedTable = await table.findByIdAndUpdate({ _id: id }, { type, seats, price }, { new: true });
    if (!updatedTable) {
      throw createHttpError.NotFound("Not found table");
    }
    res.status(200).json(updatedTable);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export async function createTable(req, res, next) {
  try {
    const { type, seats, price } = req.body;
    if (!type || !seats || !price) {
      throw createHttpError.BadRequest();
    }

    // const tableNumber = (await table.countDocuments()) + 1;
    const lastTable = await table.findOne({}, {}, { sort: { tableNumber: -1 } });
    const tableNumber = (lastTable?.tableNumber || 0) + 1;
    const newTable = new table({
      type,
      seats,
      price,
      tableNumber,
      timeSlot: [
        { time: "9h-12h", status: true },
        { time: "13h-16h", status: true },
        { time: "17h-20h", status: true },
        { time: "21h-00h", status: true },
      ],
    });
    const savedTable = await newTable.save();
    res.status(201).json(savedTable);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export async function deleteTable(req, res, next) {
  try {
    const { id } = req.params;
    if (!id) {
      throw createHttpError.BadRequest();
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw createHttpError.NotFound("Not found nation");
    }

    const deleteTable = await table.findByIdAndDelete(id);
    if (!deleteTable) {
      throw createHttpError.NotFound("not found table");
    }

    res.status(200).json({ message: "delete sucessfully" });
  } catch (error) {
    next(error);
  }
}

export async function changeStatus(req, res, next) {
  try {
    const id = "648fa62a06c453a7dc276e50";
    const time = "17h-20h";
    if (!id) {
      throw createHttpError.BadRequest();
    }
    const changeStatusTable = await table.updateOne(
      { _id: id, "timeSlot.time": time },
      { $set: { "timeSlot.$.status": false } }
    );
    if (!changeStatusTable) {
      throw createHttpError.NotFound("not found table");
    }
    res.status(200).json(changeStatusTable);
  } catch (error) {
    next(error);
  }
}

export async function uploadImg(req, res, next) {
  try {
    const { path, filename } = req.file;
    res.status(201).json({ img: { path, filename } });
  } catch (error) {
    console.log(error);
    next(error);
  }
}
