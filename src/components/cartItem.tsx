import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

interface CartItemProps {
  item: {
    productId: string;
    photo: string;
    name: string;
    price: number;
    quantity: number;
    stock: number;
  };
}

function CartItem({ item }: CartItemProps) {
  const { productId, photo, name, price, quantity } = item;

  return (
    <div className="cart-item">
      <img src={photo} alt={name} />
      <article>
        <Link to={`/product/${productId}`}>{name}</Link>
        <span>₹ {price}</span>
      </article>

      <div>
        <button>-</button>
        <p>{quantity}</p>
        <button>+</button>
      </div>

      <button>
        <FaTrash />
      </button>
    </div>
  );
}

export default CartItem;
