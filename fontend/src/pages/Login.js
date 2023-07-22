import axios from "axios";
import { FaPhoneAlt, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const phone = formData.get("phone");
    const password = formData.get("password");
    if (!phone || !password) {
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
        const res = await axios.post("http://localhost:7000/user/login", { phone, password });
        if (res.status === 200) {
          dispatch(login(res.data));
          navigate("/viewTables");
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

  return (
    <div className=" flex justify-center items-center m-auto bg-slate-200 p-10">
      <form onSubmit={handleLogin}>
        <div className="w-96">
          <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">
            Your Phone
          </label>
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaPhoneAlt />
            </div>
            <input
              name="phone"
              type="tel"
              id="phone"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5"
              placeholder="Phone"
            />
          </div>

          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
            Your Password
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
              placeholder="password"
            />
          </div>
        </div>
        {/* <h2 className="text-red-600">Incorrect Email or Password</h2> */}
        <Link to={"/fotgotPassword"} className="float-right text-blue-600">
          Forgot Password
        </Link>
        <button className="w-full bg-[#D35D02] text-white font-medium rounded-lg text-sm px-5 py-2.5">Login</button>
      </form>
      <ToastContainer />
    </div>
  );
}
