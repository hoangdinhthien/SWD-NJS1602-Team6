import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOrderTable } from "../redux/orderSlice";

export default function Modal({ setOpen, tableData, bookedTable, toast }) {
  const dispatch = useDispatch();
  // const bookedTable = useSelector((state) => state.order.bookedTable);
  const user = useSelector((state) => state.user.user);
  const handleAddTable = () => {
    if (bookedTable.length === 0) {
      dispatch(
        addOrderTable({
          tableNumber: tableData.table.tableNumber,
          tableType: tableData.table.type,
          timeSlot: tableData.slot.time,
          price: tableData.table.price,
          seats: tableData.table.seats,
        })
      );
      setOpen(false);
    } else {
      const checkTable = bookedTable.find(
        (table) => table.tableNumber === tableData.table.tableNumber && table.timeSlot === tableData.slot.time
      );
      if (!checkTable) {
        dispatch(
          addOrderTable({
            tableNumber: tableData.table.tableNumber,
            tableType: tableData.table.type,
            timeSlot: tableData.slot.time,
            price: tableData.table.price,
            seats: tableData.table.seats,
          })
        );
        setOpen(false);
      } else {
        toast.error("Already in cart", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log("duplicated");
      }
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8">
        <h2 className="text-lg font-bold mb-4">Table Number: {tableData.table.tableNumber}</h2>
        <h2 className="mb-4">Type table: {tableData.table.type}</h2>
        <h2 className="mb-4">Seats: {tableData.table.seats}</h2>
        <h2 className="mb-4">Status: {tableData.slot.status ? "Available" : "Not Available"}</h2>
        <h2 className="mb-4">Giá: {tableData.table.price.toLocaleString()}</h2>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
          onClick={() => setOpen(false)}
        >
          close
        </button>
        {tableData.slot.status && Object.keys(user).length !== 0 && user.role === "user" && (
          <button
            onClick={handleAddTable}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add to order
          </button>
        )}
      </div>
    </div>
  );
}
