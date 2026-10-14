import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";

import { StoreRootState, server } from "../redux/store";
import { saveShippingInfo } from "../redux/reducer/cartReducer";

const Shipping = () => {
  const { cartItems, total } = useSelector(
    (state: StoreRootState) => state.cartReducer
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  });

  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(saveShippingInfo(shippingInfo));

    try {
      const { data: keyData } = await axios.get(
        `${server}/api/v1/payment/getKey`
      );
      const { key } = keyData;

      const { data: orderData } = await axios.post(
        `${server}/api/v1/payment/create`,
        {
          amount: total,
        }
      );
      const { order } = orderData;

      navigate("/pay", {
        state: { key, razorpayOrder: order },
      });
    } catch {
      toast.error("Razorpay intent not created");
    }
  };

  useEffect(() => {
    if (cartItems.length == 0) navigate("/cart");
  }, [cartItems, navigate]);

  return (
    <div className="shipping">
      <button className="back-btn" onClick={() => navigate("/cart")}>
        <BiArrowBack />
      </button>

      <form onSubmit={submitHandler}>
        <h1>Shipping Address</h1>

        <input
          required
          type="text"
          placeholder="address"
          name="address"
          value={shippingInfo.address}
          onChange={changeHandler}
        />

        <input
          required
          type="text"
          placeholder="city"
          name="city"
          value={shippingInfo.city}
          onChange={changeHandler}
        />

        <input
          required
          type="text"
          placeholder="state"
          name="state"
          value={shippingInfo.state}
          onChange={changeHandler}
        />

        <select
          name="country"
          id=""
          value={shippingInfo.country}
          onChange={changeHandler}
          required
        >
          <option value="">Choose country</option>
          <option value="India">India</option>
          <option value="US">US</option>
          <option value="UK">UK</option>
          <option value="China">China</option>
          <option value="Japan">Japan</option>
          <option value="Russia">Russia</option>
        </select>

        <input
          required
          type="number"
          placeholder="pin code"
          name="pinCode"
          value={shippingInfo.pinCode}
          onChange={changeHandler}
        />

        <button type="submit">Pay Now</button>
      </form>
    </div>
  );
};

export default Shipping;
