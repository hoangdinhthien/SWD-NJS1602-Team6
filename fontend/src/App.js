import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomeGuest from "./pages/HomeGuest";
import Navbar from "./components/Navbar";
import background from "./assets/image.png";
import NotFound from "./pages/NotFound";
import Table from "./pages/Table";
import Order from "./pages/Order";
import ManagerCustomer from "./pages/ManagerCustomer";
import AccountDashboard from "./pages/AccountDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Payment from "./pages/Payment";
import CreateTable from "./pages/CreateTable";
import ManageOrder from "./pages/ManageOrder";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <div>
      <img
        src={background}
        className="fixed top-0 left-0 w-full h-full mix-blend-overlay object-cover z-0 pointer-events-none"
        alt="backGroundImg"
      />
      <div className="flex flex-col h-screen">
        <Navbar />

        <Routes>
          <Route path="/payment" element={<Payment />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<HomeGuest />} />
          <Route path="/viewTables" element={<Table />} />
          <Route path="/order" element={<Order />} />
          <Route path="/managerStaff" element={<ManagerCustomer />} />
          <Route path="/AccountDashboard" element={<AccountDashboard />} />
          <Route path="/createTable" element={<CreateTable />} />
          <Route path="/manageOrder" element={<ManageOrder />} />
          <Route path="/fotgotPassword" element={<ForgotPassword />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
