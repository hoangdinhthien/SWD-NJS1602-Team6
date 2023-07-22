import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    name: "",
    phone: "",
    bookedTable: [],
    people: 0,
    totalPrice: 0,
    userId: "",
    note: "",
  },
  reducers: {
    addOrderTable: (state, action) => {
      state.bookedTable.push(action.payload);
      state.totalPrice = state.bookedTable.reduce((total, table) => total + table.price, 0);
    },
    removeOrderTable: (state, action) => {
      state.bookedTable = state.bookedTable.filter((table) => table.tableNumber !== action.payload.tableNumber);
      state.totalPrice = state.totalPrice - action.payload.price;
    },
    createOrder: (state, action) => {
      state.name = action.payload.name;
      state.phone = action.payload.phone;
      state.people = action.payload.people;
      state.userId = action.payload.userId;
      state.note = action.payload.note;
    },

    clearOrder: (state) => {
      state.name = "";
      state.phone = "";
      state.bookedTable = [];
      state.people = 0;
      state.totalPrice = 0;
      state.userId = "";
      state.note = "";
    },
  },
});

export const { createOrder, addOrderTable, removeOrderTable, clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
