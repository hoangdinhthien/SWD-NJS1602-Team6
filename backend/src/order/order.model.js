import mongoose from "mongoose";
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, required: true },
    //(4 status : success: đặt bàn thành công/verify: đã nhận bàn/finish: kết thúc order/cancel: hủy)
    people: { type: Number, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    note: { type: String },
    // tableId: [{ type: Schema.Types.ObjectId, ref: "Table" }],
    bookedTable: [
      {
        tableNumber: { type: Number, ref: "Table" },
        tableType: { type: String },
        timeSlot: { type: String, required: true },
        price: { type: Number },
      },
    ],
  },
  { timestamps: true }
);

const order = mongoose.model("Order", orderSchema);
export default order;
