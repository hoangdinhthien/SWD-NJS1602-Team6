import React from "react";
import "../index.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// import backgroundImage from "../assets/image.png";

export default function HomeGuest() {
  const user = useSelector((state) => state.user.user);
  console.log(Boolean(user));
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {Object.keys(user).length === 0 && (
        <div>
          <div className="text-white text-4xl font-bold mb-8">Reservation Table</div>
          <div style={{ marginTop: "16px" }}>
            <button className="rounded-full mt-16 bg-orange-500 hover:bg-sky-700 w-96 text-white text-4xl font-bold z-50 pb-2 ring-2 ring-blue-500">
              <Link to="/viewTables">Book a Table</Link>
            </button>
          </div>
        </div>
      )}

      {user.role === "staff" && (
        <div>
          <Link
            to={"/manageOrder"}
            className="rounded-full mt-16 bg-orange-500 hover:bg-sky-700 w-96 text-white text-4xl font-bold z-50 pb-2 ring-2 ring-blue-500"
          >
            Manage Order
          </Link>
        </div>
      )}

      {user.role === "admin" && (
        <div className="flex gap-5 text-center">
          <Link
            to={"/managerStaff"}
            className="rounded-full mt-16 bg-orange-500 hover:bg-sky-700 w-96 text-white text-4xl font-bold z-50 p-2 ring-2 ring-blue-500"
          >
            Manage Staff
          </Link>
          <Link
            to={"/createTable"}
            className="rounded-full mt-16 bg-orange-500 hover:bg-sky-700 w-96 text-white text-4xl font-bold z-50 p-2 ring-2 ring-blue-500"
          >
            Manage Table
          </Link>
        </div>
      )}
    </div>
  );
}
