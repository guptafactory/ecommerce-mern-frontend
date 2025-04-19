import axios from "axios";
import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useCreateOrderMutation } from "../redux/api/orderAPI";
import { resetCart } from "../redux/reducer/cartReducer";
import { RootState, server } from "../redux/store";
import { NewOrderRequest } from "../types/api/order";
import { responseToast } from "../utils/features";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.userReducer);
  const {
    shippingInfo,
    cartItems,
    subtotal,
    tax,
    discount,
    shippingCharges,
    total,
  } = useSelector((state: RootState) => state.cartReducer);

  const orderData = useMemo<NewOrderRequest>(
    () => ({
      shippingInfo,
      orderItems: cartItems,
      subtotal,
      tax,
      discount,
      shippingCharges,
      total,
      user: user?._id || "test",
    }),
    [
      shippingInfo,
      cartItems,
      subtotal,
      tax,
      discount,
      shippingCharges,
      total,
      user?._id,
    ]
  );

  const [newOrder] = useCreateOrderMutation();

  const location = useLocation();
  const { key, razorpayOrder } = location?.state || {};

  const launchedRef = useRef(false); // flag to avoid multiple Razorpay window launches

  useEffect(() => {
    if (!key || !razorpayOrder || launchedRef.current) return;

    launchedRef.current = true; // ✅ only allow one launch

    const launchRazorpay = () => {
      try {
        const options: RazorpayOptions = {
          key: key,
          amount: razorpayOrder.amount,
          currency: razorpayOrder.currency,
          name: "Ecommerce MERN",
          description: "Order Payment",
          order_id: razorpayOrder.id,
          handler: async (response: RazorpayResponse) => {
            try {
              const {
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
              } = response;

              await axios.post(`${server}/api/v1/payment/verify`, {
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
              });

              const res2 = await newOrder(orderData);
              toast.success(res2.data?.message || "Order created successfully");

              dispatch(resetCart());
              responseToast(res2, navigate, "/orders");
            } catch {
              toast.error("Payment verification or Order creation failed");
            }
          },
          prefill: {
            name: user?.name || "test",
            email: user?.email || "test@example.com",
            contact: "9999999999",
          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch {
        toast.error("Razorpay payment failed");
      }
    };

    launchRazorpay();
  }, [key, razorpayOrder, dispatch, navigate, newOrder, orderData, user]);

  if (!key || !razorpayOrder) return <Navigate to={"/shipping"} />;

  return <></>;
};

export default Checkout;
