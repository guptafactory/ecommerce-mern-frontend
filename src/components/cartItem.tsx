import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { server } from "../redux/store";
import { CartItem as CartItemType } from "../types/types";

type CartItemProps = {
  item: CartItemType;
  incrementHandler: (cartItem: CartItemType) => void;
  decrementHandler: (cartItem: CartItemType) => void;
  removeHandler: (productId: string) => void;
};

function CartItem({
  item,
  incrementHandler,
  decrementHandler,
  removeHandler,
}: CartItemProps) {
  const { productId, photo, name, price, quantity } = item;

  return (
    <div className="cart-item">
      <img src={`${server}/${photo}`} alt={name} />
      <article>
        <Link to={`/product/${productId}`}>{name}</Link>
        <span>₹ {price}</span>
      </article>

      <div>
        <button onClick={() => decrementHandler(item)}>-</button>
        <p>{quantity}</p>
        <button onClick={() => incrementHandler(item)}>+</button>
      </div>

      <button onClick={() => removeHandler(productId)}>
        <FaTrash />
      </button>
    </div>
  );
}

export default CartItem;
