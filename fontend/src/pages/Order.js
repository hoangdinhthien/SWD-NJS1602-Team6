import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { createOrder, removeOrderTable } from "../redux/orderSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Order() {
  const navigate = useNavigate();
  const [people, setPeople] = useState(1);
  const [note, setNote] = useState("");
  const disapatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const order = useSelector((state) => state.order);
  const handleDeleteTable = (tableNumber, price) => {
    disapatch(removeOrderTable({ tableNumber, price }));
  };

  const handleOrder = () => {
    disapatch(createOrder({ name: user.name, phone: user.phone, people, userId: user.id, note }));
    navigate("/payment");
  };

  const handlePeople = (e) => {
    let maxPeople = 0;
    order.bookedTable.forEach((table) => {
      maxPeople += table.seats;
    });
    console.log(maxPeople);
    console.log(order.bookedTable);
    if (e.target.value > maxPeople) {
      toast.error(`People must less than ${maxPeople}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      setPeople(e.target.value);
    }
  };
  return (
    <div className="bg-neutral-200 mx-auto max-w-screen-sm p-10 flex justify-center flex-col items-center">
      <div>
        <div className="flex flex-col mt-4">
          <label htmlFor="name">Your Name:</label>
          <input className="rounded mt-2 pl-2 py-1" id="name" readOnly value={user.name} />
        </div>
        <div className="flex flex-col mt-4">
          <label htmlFor="phone">Phone Number:</label>
          <input className="rounded mt-2 pl-2 py-1" id="phone" readOnly value={user.phone} />
        </div>
        <div className="flex flex-col mt-4">
          <label htmlFor="people">People:</label>
          <input
            className="rounded mt-2 pl-2 py-1"
            id="people"
            type="number"
            value={people}
            onChange={(e) => handlePeople(e)}
          />
        </div>
        <div>
          <span>Tables:</span>
          <table className="text-center">
            <thead>
              <tr>
                <th className="px-6 py-2">Table number</th>
                <th className="px-6 py-2">Table type</th>
                <th className="px-6 py-2">Time</th>
                <th className="px-6 py-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {order.bookedTable.map((table) => (
                <tr>
                  <td className="px-6 py-1">{table.tableNumber}</td>
                  <td className="px-6 py-1">{table.tableType}</td>
                  <td className="px-6 py-1">{table.timeSlot}</td>
                  <td className="px-6 py-1">{table.price}</td>
                  <td
                    className="px-6 py-1 cursor-pointer"
                    onClick={() => handleDeleteTable(table.tableNumber, table.price)}
                  >
                    <FaTrash />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex mt-4">
          <span>Total:</span>
          <span className="ml-2">{order.totalPrice}</span>
        </div>
        <div className="flex flex-col mt-4">
          <label>Note</label>
          <textarea className="rounded pl-2 py-1" value={note} onChange={(e) => setNote(e.target.value)} />
        </div>

        {order.bookedTable.length !== 0 && (
          <button className="rounded border-solid border-4 w-full bg-orange-600 mt-4 py-2" onClick={handleOrder}>
            Reserve
          </button>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}
