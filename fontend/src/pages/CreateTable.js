import axios from "axios";
import { useEffect, useState } from "react";

export default function CreateTable() {
  const [typeUpdate, setTypeUpdate] = useState();
  const [seatsUpdate, setSeatsUpdate] = useState();
  const [priceUpdate, setPriceUpdate] = useState();
  const [create, setCreate] = useState(false);
  const [tableList, setTableList] = useState([]);
  const [editId, setEditId] = useState("");
  const getTable = async () => {
    const res = await axios.get("http://localhost:7000/table/");
    setTableList(res.data);
  };
  useEffect(() => {
    getTable();
  }, []);
  const handleAddTable = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const body = Object.fromEntries([...formData]);
    const res = await axios.post("http://localhost:7000/table/", body);
    if (res.data) {
      getTable();
    }
    setCreate(false);
  };

  const handleDeleteTable = async (id) => {
    const res = await axios.delete(`http://localhost:7000/table/${id}`);
    getTable();
    console.log(res);
  };

  const handleEdit = async (table) => {
    const id = table._id;
    const type = typeUpdate || table.type;
    const seats = seatsUpdate || table.seats;
    const price = priceUpdate || table.price;
    const res = await axios.put(`http://localhost:7000/table/${id}`, { type, seats, price });
    if (res.data) {
      setEditId("");
      getTable();
    }
  };
  return (
    <div className=" m-auto bg-slate-200 p-10 ">
      <button className="float-right bg-blue-700 rounded text-white p-2" onClick={() => setCreate(true)}>
        Add new Table
      </button>
      <table className="text-center w-full">
        <thead>
          <tr>
            <th className="px-6 py-2">Table number</th>
            <th className="px-6 py-2">Table type</th>
            <th className="px-6 py-2">Seats</th>
            <th className="px-6 py-2">Price</th>
            <th className="px-6 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {tableList.map((table) =>
            editId === table._id ? (
              <tr key={table.tableNumber}>
                <td className="px-6 py-1">{table.tableNumber}</td>
                <td className="px-6 py-1">
                  {/* <input
                    className="px-2 py-1 rounded"
                    defaultValue={table.type}
                    onChange={(e) => setTypeUpdate(e.target.value)}
                  /> */}

                  <select defaultValue={table.type} onChange={(e) => setTypeUpdate(e.target.value)}>
                    <option value="square">square</option>
                    <option value="round">round</option>
                    <option value="long">long</option>
                  </select>
                </td>
                <td className="px-6 py-1">
                  <input
                    className="px-2 py-1 rounded"
                    defaultValue={table.seats}
                    onChange={(e) => setSeatsUpdate(e.target.value)}
                  />
                </td>
                <td className="px-6 py-1">
                  <input
                    className="px-2 py-1 rounded"
                    defaultValue={table.price}
                    onChange={(e) => setPriceUpdate(e.target.value)}
                  />
                </td>
                <td className="px-6 py-1 text-blue-500 cursor-pointer" onClick={() => handleEdit(table)}>
                  Confirm
                </td>
                <td className="px-6 py-1 text-blue-500 cursor-pointer" onClick={() => setEditId("")}>
                  Cancel
                </td>
              </tr>
            ) : (
              <tr key={table.tableNumber}>
                <td className="px-6 py-1">{table.tableNumber}</td>
                <td className="px-6 py-1">{table.type}</td>
                <td className="px-6 py-1">{table.seats}</td>
                <td className="px-6 py-1">{table.price}</td>
                <td className="px-6 py-1 text-blue-500 cursor-pointer" onClick={() => handleDeleteTable(table._id)}>
                  Delete
                </td>
                <td className="px-6 py-1 text-blue-500 cursor-pointer" onClick={() => setEditId(table._id)}>
                  Edit
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      {create && (
        <div className="fixed inset-0 flex">
          <div className="m-auto bg-slate-200 p-10">
            <form onSubmit={handleAddTable}>
              <div className="flex flex-col">
                <label>Seats</label>
                <input className="rounded px-2 py-1" name="seats" />
                <label>Price</label>
                <input className="rounded px-2 py-1" name="price" />
                <label>Type</label>
                <select className="rounded px-2 py-1 cursor-pointer" name="type">
                  <option>round</option>
                  <option>long</option>
                  <option>square</option>
                </select>
              </div>
              <button className="bg-blue-500 p-2 rounded text-white float-right mt-5">Create</button>
            </form>
            <button
              className="bg-blue-500 p-2 rounded text-white float-right mt-5 float-left"
              onClick={() => setCreate(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
