import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { VscError } from "react-icons/vsc";

import { addToCart, removeFromCart } from "../redux/reducer/cartReducer";
import CartItemCard from "../components/cartItem";
import { CartReducerInitialState } from "../types/reducer-types";
import { CartItem } from "../types/types";
import toast from "react-hot-toast";

function Cart() {
  const { cartItems, subtotal, discount, tax, shippingCharges, total } =
    useSelector(
      (state: { cartReducer: CartReducerInitialState }) => state.cartReducer
    );

  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCode, setIsValidCode] = useState<boolean>(false);
  const dispatch = useDispatch();

  // Handler functions
  const incrementHandler = (cartItem: CartItem) => {
    if (cartItem.quantity === cartItem.stock) {
      toast.error("Product stock limit reached");
      return;
    }

    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
  };

  const decrementHandler = (cartItem: CartItem) => {
    if (cartItem.quantity === 1) return;

    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
  };

  const removeHandler = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

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
          <CartItemCard
            item={item}
            key={idx}
            incrementHandler={incrementHandler}
            decrementHandler={decrementHandler}
            removeHandler={removeHandler}
          />
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
