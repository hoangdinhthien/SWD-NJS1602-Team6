import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
function AccountDashboard() {
  const [openDetail, setOpenDetail] = useState("");
  const [orders, setOrders] = useState([]);
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    const getOrder = async () => {
      const res = await axios.get(`http://localhost:7000/order/${user.phone}`);
      setOrders(res.data);
    };
    getOrder();
  }, []);

  function formatDate(dateString) {
    const dateObject = new Date(dateString);

    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();

    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  }

  return (
    <div>
      <div className="text-center text-white text-4xl font-bold relative z-10">Account Dashboard</div>
      <div className="flex justify-center items-center h-screen">
        <div className="opacity-100 bg-gray-300 w-3/4 h-3/4 rounded-lg p-8 flex">
          <div className="bg-white h-4/4 w-2/5">
            <div className="h-52 w-full flex flex-col items-center justify-center">
              <svg
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="fullName" className="text-red-500 font-medium">
                Full Name:
              </label>
              <input
                value={user.name}
                readOnly
                type="text"
                id="fullName"
                className="border border-gray-400 bg-slate-400 px-4 py-2 rounded-md mt-2"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="phoneNumber" className="text-red-500 font-medium">
                Phone Number:
              </label>
              <input
                value={user.phone}
                readOnly
                type="text"
                id="phoneNumber"
                className="border border-gray-400 bg-slate-400 px-4 py-2 rounded-md mt-2"
              />
            </div>
          </div>
          <div className="float-right w-3/4 pl-8">
            <div className="flex items-center justify-center bg-orange-400 h-12 ">Order History</div>
            <table className="min-w-full">
              <thead className="bg-yellow-300 border-b">
                <tr>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Date
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Price
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    people
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 "
                    key={order._id}
                  >
                    <td
                      className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap cursor-pointer"
                      onClick={(e) => setOpenDetail(order._id)}
                    >
                      {formatDate(order.createdAt)}
                    </td>
                    <td
                      className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap cursor-pointer"
                      onClick={(e) => setOpenDetail(order._id)}
                    >
                      {order.totalPrice}
                    </td>
                    <td
                      className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap cursor-pointer"
                      onClick={(e) => setOpenDetail(order._id)}
                    >
                      {order.people}
                    </td>
                    <td
                      className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap cursor-pointer"
                      onClick={(e) => setOpenDetail(order._id)}
                    >
                      {order.status}
                    </td>
                    {openDetail === order._id && (
                      <td className="fixed inset-0 flex">
                        <div className="m-auto bg-slate-200 p-4">
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
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <button
                            className="bg-blue-500 p-2 rounded text-white float-right mt-5"
                            onClick={(e) => setOpenDetail(false)}
                          >
                            Close
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountDashboard;
