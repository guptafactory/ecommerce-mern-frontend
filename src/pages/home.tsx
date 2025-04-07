import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import ProductCard from "../components/productCard";
import { SkeletonLoader } from "../components/loader";
import { CartItem } from "../types/types";
import { useLatestProductsQuery } from "../redux/api/productAPI";
import { addToCart } from "../redux/reducer/cartReducer";

function Home() {
  const { data, isError, isLoading } = useLatestProductsQuery("");
  const dispatch = useDispatch();

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock === 0) {
      toast.error("Product is out of stock");
      return;
    }

    dispatch(addToCart(cartItem));
    toast.success("Product added to cart");
  };

  useEffect(() => {
    if (isError) {
      toast.error("Failed to fetch products");
    }
  }, [isError]);

  return (
    <div className="home">
      <section>Image</section>

      <h1>
        Latest products
        <Link to={"/search"} className="findmore">
          More
        </Link>
      </h1>

      <main>
        {isLoading ? (
          <SkeletonLoader width="80vw" />
        ) : (
          data?.products.map((product) => (
            <ProductCard
              key={product._id}
              productId={product._id}
              name={product.name}
              photo={product.photo}
              price={product.price}
              stock={product.stock}
              handler={addToCartHandler}
            />
          ))
        )}
      </main>
    </div>
  );
}

export default Home;
