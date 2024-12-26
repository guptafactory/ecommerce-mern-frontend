import { Link } from 'react-router-dom';
import ProductCard from '../components/productCard';

function Home() {
  const addToCartHandler = () => {};

  return (
    <div className="home">
      <section>Good</section>

      <h1>
        Latest products
        <Link to={'/search'} className="findmore">
          More
        </Link>
      </h1>

      <main>
        <ProductCard
          productId="abc"
          name="abc"
          photo="https://m.media-amazon.com/images/I/71an9eiBxpL._SX250_.jpg"
          price={123}
          stock={123}
          handler={addToCartHandler}
        />
      </main>
    </div>
  );
}

export default Home;
