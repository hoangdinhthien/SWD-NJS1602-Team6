import { useCallback, useEffect, useState } from "react";
import axios from "axios";
export default function ManageOrder() {
  const [openDetail, setOpenDetail] = useState("");
  const [status, setStatus] = useState("success");
  const [orders, setOrders] = useState([]);

  const getOrder = useCallback(async () => {
    const res = await axios.get(`http://localhost:7000/order?status=${status}`);
    setOrders(res.data);
  }, [status]);
  useEffect(() => {
    getOrder();
  }, [getOrder]);

  const handleVerify = async (id) => {
    const res = await axios.put(`http://localhost:7000/order/verify/${id}`);
    if (res.status) {
      getOrder();
    }
  };
  const handleCancel = async (id) => {
    const res = await axios.delete(`http://localhost:7000/order/cancel/${id}`);
    if (res.status) {
      getOrder();
    }
  };
  const handleFinish = async (id) => {
    const res = await axios.put(`http://localhost:7000/order/finish/${id}`);
    if (res.status) {
      getOrder();
    }
  };
  return (
    <div>
      <div>
        <select onChange={(e) => setStatus(e.target.value)} value={status}>
          <option value="success">Success</option>
          <option value="verified">Verify</option>
        </select>
      </div>
      <table className="min-w-full">
        <thead className="bg-yellow-300 border-b">
          <tr>
            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              Name
            </th>
            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              Phone
            </th>
            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              people
            </th>
            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              TotalPrice
            </th>
            <th></th>
            {status === "success" && <th></th>}
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr
              key={order._id}
              className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer"
            >
              <td
                className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                onClick={() => setOpenDetail(order._id)}
              >
                {order.name}
              </td>
              <td
                className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                onClick={() => setOpenDetail(order._id)}
              >
                {order.phone}
              </td>
              <td
                className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                onClick={() => setOpenDetail(order._id)}
              >
                {order.people}
              </td>
              <td
                className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                onClick={() => setOpenDetail(order._id)}
              >
                {order.totalPrice}
              </td>
              {status === "success" && (
                <td
                  className="text-sm font-light px-6 py-4 whitespace-nowrap text-blue-400"
                  onClick={() => handleVerify(order._id)}
                >
                  Verify
                </td>
              )}
              {status === "success" && (
                <td
                  className="text-sm font-light px-6 py-4 whitespace-nowrap text-blue-400"
                  onClick={() => handleCancel(order._id)}
                >
                  Cancel
                </td>
              )}

              {status === "verified" && (
                <td
                  className="text-sm font-light px-6 py-4 whitespace-nowrap text-blue-400"
                  onClick={() => handleFinish(order._id)}
                >
                  Finish
                </td>
              )}
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
                          <tr key={table.tableNumber}>
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
                      onClick={() => setOpenDetail("")}
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
  );
}
