import { Link } from "react-router-dom";
import ProductCard from "../components/productCard";
import { useLatestProductsQuery } from "../redux/api/productAPI";
import toast from "react-hot-toast";
import { SkeletonLoader } from "../components/loader";

function Home() {
  const { data, isError, isLoading } = useLatestProductsQuery("");

  const addToCartHandler = () => {};
  if (isError) {
    toast.error("Failed to fetch products");
  }

  return (
    <div className="home">
      <section>Good</section>

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
