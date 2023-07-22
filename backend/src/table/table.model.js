import mongoose from "mongoose";
const Schema = mongoose.Schema;

const tableSchema = new Schema({
  type: { type: String, enum: ["round", "long", "square"] },
  seats: { type: Number, required: true },
  price: { type: Number, required: true },
  tableNumber: { type: Number, required: true },
  timeSlot: [
    {
      time: { type: String, required: true, enum: ["9h-12h", "13h-16h", "17h-20h", "21h-00h"] },
      status: { type: Boolean, required: true, default: true },
    },
  ],
});

const table = mongoose.model("Table", tableSchema);
export default table;
