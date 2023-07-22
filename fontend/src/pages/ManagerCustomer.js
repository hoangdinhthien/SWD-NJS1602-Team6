import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaTrash, FaCheck } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ManagerCustomer() {
  const [staffList, setStaffList] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [create, setCreate] = useState(false);
  const getStaffs = async () => {
    const res = await axios.get("http://localhost:7000/user/");
    setStaffList(res.data);
  };

  const handleDelteStaff = async (id) => {
    const res = await axios.delete(`http://localhost:7000/user/${id}`);
    if (res.data) {
      getStaffs();
    }
  };

  const handleCreate = async () => {
    if (!name || !phone || !password) {
      toast.error("Not enough field", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      try {
        const res = await axios.post("http://localhost:7000/user/register", { name, phone, password, role: "staff" });
        if (res.data) {
          getStaffs();
          setCreate(false);
        }
      } catch (error) {
        toast.error(`${error.response.data.errMessage}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };
  useEffect(() => {
    getStaffs();
  }, []);
  return (
    <div className="flex flex-col">
      <div className="text-center text-white text-4xl font-bold relative z-10">Manager Reception</div>
      <div className="bg-white mt-5 ">
        <div className="flex justify-end ">
          <button
            className="w-12 h-14 opacity-100 bg-white hover:bg-sky-700 mr-10 mt-5 rounded-xl border border-black text-4xl text-black z-50"
            onClick={() => setCreate(true)}
          >
            +
          </button>
        </div>
        <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-yellow-300 border-b">
                  <tr>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Name
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Phone
                    </th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {staffList.map((staff) => (
                    <tr
                      className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                      key={staff._id}
                    >
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{staff.name}</td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{staff.phone}</td>
                      <td
                        className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap cursor-pointer"
                        onClick={() => handleDelteStaff(staff._id)}
                      >
                        <FaTrash />
                      </td>
                    </tr>
                  ))}
                  {create && (
                    <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <input
                          onChange={(e) => setName(e.target.value)}
                          value={name}
                          type="text"
                          className="bg-white px-2 py-1 rounded border-solid border-2"
                          placeholder="Name"
                        />
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <input
                          onChange={(e) => setPhone(e.target.value)}
                          value={phone}
                          type="tel"
                          className="bg-white px-2 py-1 rounded border-solid border-2"
                          placeholder="Phone"
                        />
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <input
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                          type="tel"
                          className="bg-white px-2 py-1 rounded border-solid border-2"
                          placeholder="Password"
                        />
                      </td>
                      <td
                        className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap cursor-pointer"
                        onClick={handleCreate}
                      >
                        <FaCheck />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ManagerCustomer;
