import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { clearOrder } from "../redux/orderSlice";
import { useNavigate } from "react-router-dom";

export default function Payment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const order = useSelector((state) => state.order);
  const paypalOptions = {
    clientId: "AXj1Ho_A2pSX1RUXZGQsKx_s2tR4qAQFxAgO1L1Z9S0nyGC1gBErjnMQg6aF0WzwhRKhCn9bG7k8w3Q8",
    currency: "USD",
  };
  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: order.totalPrice,
          },
        },
      ],
    });
  };
  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      // Thực hiện các bước tiếp theo sau khi thanh toán thành công
      const saveOrder = async () => {
        const res = await axios.post("http://localhost:7000/order", order);
        if (res.data) {
          dispatch(clearOrder());
          navigate("/AccountDashboard");
        }
      };
      saveOrder();
    });
  };
  return (
    <div className="flex justify-center items-center m-auto bg-slate-200 p-10 flex-col gap-5">
      <h2>Your deposite for Reservation is {order.totalPrice}</h2>
      <h2>If you want to cancel please call : 0123456789</h2>
      <PayPalScriptProvider options={paypalOptions}>
        <PayPalButtons fundingSource="paypal" createOrder={createOrder} onApprove={onApprove}></PayPalButtons>
      </PayPalScriptProvider>
    </div>
  );
}
