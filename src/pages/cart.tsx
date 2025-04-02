import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { VscError } from "react-icons/vsc";

import CartItem from "../components/cartItem";

const cartItems = [
  {
    productId: "abc",
    photo: "https://m.media-amazon.com/images/I/71an9eiBxpL._SX250_.jpg",
    name: "Macbook",
    price: 3000,
    quantity: 40,
    stock: 10,
  },
];
const subtotal = 4000;
const discount = 400;
const tax = Math.round(subtotal * 0.18);
const shippingCharges = 200;
const total = subtotal + tax + shippingCharges;

function Cart() {
  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCode, setIsValidCode] = useState<boolean>(false);

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (Math.random() >= 0.5) setIsValidCode(true);
      else setIsValidCode(false);
    }, 1000);

    return () => {
      clearTimeout(timerId);
      setIsValidCode(false);
    };
  }, [couponCode]);

  return (
    <div className="cart">
      <main>
        {cartItems.map((item, idx) => (
          <CartItem item={item} key={idx} />
        ))}
      </main>
      <aside>
        <p>Subtotal: ₹{subtotal}</p>
        <p>Shipping Charges: ₹{shippingCharges}</p>
        <p>Tax: ₹{tax}</p>
        <p>
          Discount: <em className="red"> - ₹{discount}</em>
        </p>
        <p>
          <b>Total: ₹{total}</b>
        </p>

        <input
          type="text"
          placeholder="Enter coupon code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />

        {couponCode &&
          (isValidCode ? (
            <span className="green">
              {discount} off using the <code>{couponCode}</code>
            </span>
          ) : (
            <span className="red">
              Invalid coupon code <VscError />
            </span>
          ))}

        {cartItems.length > 0 && <Link to="/shipping">Checkout</Link>}
      </aside>
    </div>
  );
}

export default Cart;
