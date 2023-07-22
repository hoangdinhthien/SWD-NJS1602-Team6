import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import { clearOrder } from "../redux/orderSlice";

export default function Navbar() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearOrder());
    navigate("/");
  };
  return (
    <div>
      <div className="flex justify-around items-center py-5">
        <span className="text-white">SWD</span>
        <div className="gap-8 flex text-lg text-white font-medium">
          <Link to={"/"} className="hover:font-bold">
            Home
          </Link>
          <Link to={"/viewTables"} className="hover:font-bold">
            Tables
          </Link>
          {Object.keys(user).length === 0 ? (
            <Link to={"/login"} className="hover:font-bold">
              Login
            </Link>
          ) : (
            <button onClick={handleLogout} className="hover:font-bold">
              Logout
            </button>
          )}
          {Object.keys(user).length === 0 ? (
            <Link to={"/register"} className="hover:font-bold">
              Sign up
            </Link>
          ) : (
            <Link to={"/AccountDashboard"}>Account</Link>
          )}
        </div>
      </div>
    </div>
  );
}
