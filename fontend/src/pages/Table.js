import React, { useEffect, useState } from "react";
import square from "../assets/square.png";
import round from "../assets/round.png";
import long from "../assets/long.png";
import Modal from "../components/Modal";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Table() {
  const [tables, setTable] = useState([]);
  const [time, setTime] = useState("");
  const [open, setOpen] = useState(false);
  const [tableData, setTableData] = useState({});

  useEffect(() => {
    const currentTime = new Date().getHours();

    if (currentTime < 9 || (currentTime >= 9 && currentTime < 12)) {
      setTime("9h-12h");
    } else if (currentTime < 13 || (currentTime >= 13 && currentTime < 16)) {
      setTime("13h-16h");
    } else if (currentTime < 17 || (currentTime >= 17 && currentTime < 20)) {
      setTime("17h-20h");
    } else if (currentTime < 21 || currentTime >= 21 || currentTime < 3) {
      setTime("21h-00h");
    }
  }, []);

  useEffect(() => {
    const getTables = async () => {
      const res = await axios.get("http://localhost:7000/table");
      setTable(res.data);
    };
    getTables();
  }, []);

  const navigate = useNavigate();
  const bookedTable = useSelector((state) => state.order.bookedTable);
  const role = useSelector((state) => state.user.user.role);

  const handleTime = (time) => {
    const currentTime = new Date().getHours();
    if (time === "9h-12h") {
      if (currentTime < 9 || (currentTime >= 9 && currentTime < 12)) {
        setTime(time);
      }
    } else if (time === "13h-16h") {
      if (currentTime < 13 || (currentTime >= 13 && currentTime < 16)) {
        setTime(time);
      }
    } else if (time === "17h-20h") {
      if (currentTime < 17 || (currentTime >= 17 && currentTime < 20)) {
        setTime(time);
      }
    } else if (time === "21h-00h") {
      if (currentTime < 21 || currentTime >= 21 || currentTime < 3) {
        setTime(time);
      }
    }

    // setTime(time);
  };

  const handleClickTable = (table, slot) => {
    setOpen(true);
    setTableData({ table, slot });
  };
  return (
    <div className="mt-10">
      <div className="flex items-center justify-center gap-10 text-white">
        <div
          className={`cursor-pointer ${time === "9h-12h" && `text-rose-500 text-lg`}`}
          onClick={() => handleTime("9h-12h")}
        >
          9h-12h
        </div>
        <div
          className={`cursor-pointer ${time === "13h-16h" && `text-rose-500 text-lg`}`}
          onClick={() => handleTime("13h-16h")}
        >
          13h-16h
        </div>
        <div
          className={`cursor-pointer ${time === "17h-20h" && `text-rose-500 text-lg`}`}
          onClick={() => handleTime("17h-20h")}
        >
          17h-20h
        </div>
        <div
          className={`cursor-pointer ${time === "21h-00h" && `text-rose-500 text-lg`}`}
          onClick={() => handleTime("21h-00h")}
        >
          21h-00h
        </div>

        {role === "user" && (
          <div className="relative cursor-pointer" onClick={() => navigate("/order")}>
            <FaShoppingCart className="text-orange-400 text-2xl" />
            <span className="absolute top-0 w-5 h-5 rounded-[50%] text-center bg-white text-orange-400 right-0 mt-[-12px] mr-[-8px] leading-5 text-xs">
              {bookedTable.length}
            </span>
          </div>
        )}
      </div>

      <div className="bg-white mx-auto max-w-screen-xl">
        <div className="flex">
          <div className="w-2/6 flex flex-wrap gap-2 justify-center items-center">
            {tables
              .filter((table) => table.type === "square")
              .map((table, i) => {
                const slot = table.timeSlot.find((slot) => slot.time === time);
                return (
                  <div
                    key={i}
                    onClick={() => handleClickTable(table, slot)}
                    className={`w-1/4 cursor-pointer h-fit flex items-center justify-center flex-col ${
                      slot?.status === false && `bg-[#f11818]`
                    }`}
                  >
                    <img src={square} alt="" />
                    <h3 className="text-center">{table.tableNumber}</h3>
                  </div>
                );
              })}
          </div>

          <div className="w-2/6 flex flex-wrap gap-2 justify-center items-center">
            {tables
              .filter((table) => table.type === "round")
              .map((table, i) => {
                const slot = table.timeSlot.find((slot) => slot.time === time);
                return (
                  <div
                    onClick={() => handleClickTable(table, slot)}
                    key={i}
                    className={`w-2/5 cursor-pointer h-fit flex items-center justify-center flex-col ${
                      slot?.status === false && `bg-[#f11818]`
                    }`}
                  >
                    <img src={round} alt="" />
                    <h3>{table.tableNumber}</h3>
                  </div>
                );
              })}
          </div>
          <div className="w-2/6 flex flex-wrap gap-2 justify-center items-center">
            {tables
              .filter((table) => table.type === "long")
              .map((table, i) => {
                const slot = table.timeSlot.find((slot) => slot.time === time);
                return (
                  <div
                    onClick={() => handleClickTable(table, slot)}
                    key={i}
                    className={`w-2/5 cursor-pointer flex items-center justify-center flex-col ${
                      slot?.status === false && `bg-[#f11818]`
                    }`}
                  >
                    <img src={long} alt="" />
                    <h3>{table.tableNumber}</h3>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      {open && <Modal setOpen={setOpen} tableData={tableData} bookedTable={bookedTable} toast={toast} />}
      <ToastContainer />
    </div>
  );
}
