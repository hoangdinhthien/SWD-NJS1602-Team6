import { useState } from "react";
import { FaPhoneAlt, FaLock, FaUserCircle } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");
  const [openPhone, setOpenPhone] = useState(true);
  const [openOtp, setOpenOtp] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const navigate = useNavigate();

  const sendOtp = async () => {
    if (!phone || !name) {
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
        const res = await axios.post("http://localhost:7000/user/otp", { phone });
        if (res.status === 200) {
          setOpenPhone(false);
          setOpenOtp(true);
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

  const verifyOtp = async () => {
    if (!otp) {
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
        const res = await axios.post("http://localhost:7000/user/verify", { otp });
        if (res.status === 200) {
          setOpenOtp(false);
          setOpenPassword(true);
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

  const register = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (!password || !confirmPassword) {
      toast.error("Not enough field", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (password !== confirmPassword) {
      toast.error("Password and Re-password is not same", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      const res = await axios.post("http://localhost:7000/user/register", { phone, password, name });
      if (res.status === 201) {
        navigate("/login");
      }
    }
  };
  return (
    <div className=" flex justify-center items-center m-auto bg-slate-200 p-10">
      {openPhone && (
        <div>
          <div className="w-96">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
              Your Name
            </label>
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaUserCircle />
              </div>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5"
                placeholder="Name"
              />
            </div>

            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">
              Your Phone
            </label>
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaPhoneAlt />
              </div>
              <input
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                type="number"
                id="phone"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5"
                placeholder="Phone"
              />
            </div>
          </div>
          <button
            className="w-full bg-[#D35D02] text-white font-medium rounded-lg text-sm px-5 py-2.5"
            onClick={sendOtp}
          >
            Send otp
          </button>
        </div>
      )}

      {openOtp && (
        <div>
          <div className="w-96">
            <label htmlFor="otp" className="block mb-2 text-sm font-medium text-gray-900">
              Otp
            </label>
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaLock />
              </div>
              <input
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
                type="text"
                id="otp"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5"
                placeholder="Otp"
              />
            </div>
          </div>
          <button
            onClick={sendOtp}
            className="w-full bg-[#D35D02] text-white font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Send again
          </button>
          <button
            onClick={verifyOtp}
            className="w-full bg-[#D35D02] text-white font-medium rounded-lg text-sm px-5 py-2.5 mt-4"
          >
            Verify
          </button>
        </div>
      )}

      {openPassword && (
        <div>
          <form onSubmit={register}>
            <div className="w-96">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                Password
              </label>
              <div className="relative mb-6">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaLock />
                </div>
                <input
                  name="password"
                  type="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5"
                  placeholder="Password"
                />
              </div>

              <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900">
                Confirm Password
              </label>
              <div className="relative mb-6">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaLock />
                </div>
                <input
                  name="confirmPassword"
                  type="password"
                  id="confirmPassword"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5"
                  placeholder="Confirm password"
                />
              </div>
            </div>
            <button className="w-full bg-[#D35D02] text-white font-medium rounded-lg text-sm px-5 py-2.5">
              Register
            </button>
          </form>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
