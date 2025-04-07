import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import {
  useCategoriesQuery,
  useSearchProductsQuery,
} from "../redux/api/productAPI";
import { addToCart } from "../redux/reducer/cartReducer";

import ProductCard from "../components/productCard";
import { SkeletonLoader } from "../components/loader";
import { CustomError } from "../types/api-types";
import { CartItem } from "../types/types";

function Search() {
  const {
    data: categoriesResponse,
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
    error: errorCategories,
  } = useCategoriesQuery("");

  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number>(1000);
  const [maxPrice, setMaxPrice] = useState<number>(200000);
  const [category, setCategory] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const dispatch = useDispatch();

  const {
    data: searchedData,
    isLoading: isLoadingSearchedData,
    isError: isErrorSearchedData,
    error: errorSearchedData,
  } = useSearchProductsQuery({
    search,
    minPrice: minPrice.toString(),
    maxPrice: maxPrice.toString(),
    category,
    sort,
    page: page.toString(),
  });

  const hasPrevPage = page > 1;
  const hasNextPage = page < (searchedData ? searchedData?.totalPages : 1);

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock === 0) {
      toast.error("Product is out of stock");
      return;
    }

    dispatch(addToCart(cartItem));
    toast.success("Product added to cart");
  };

  useEffect(() => {
    if (isErrorCategories) {
      const err = errorCategories as CustomError;
      toast.error(err.data.message);
    }

    if (isErrorSearchedData) {
      const err = errorSearchedData as CustomError;
      toast.error(err.data.message);
    }
  }, [
    isErrorCategories,
    isErrorSearchedData,
    errorCategories,
    errorSearchedData,
  ]);

  const handleMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) > maxPrice) {
      setMinPrice(maxPrice);
      return;
    }
    setMinPrice(Number(e.target.value));
  };

  const handleMaxPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) < minPrice) {
      setMaxPrice(minPrice);
      return;
    }
    setMaxPrice(Number(e.target.value));
  };

  return (
    <div className="product-search-range">
      <aside>
        <h2>Filters</h2>

        <div>
          <h4>Sort</h4>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">None</option>
            <option value="asc">Price (Low to High)</option>
            <option value="dsc">Price (High to Low)</option>
          </select>
        </div>

        <div>
          <h4>Min Price: {minPrice || ""}</h4>
          <input
            type="range"
            min={100}
            max={500000}
            value={minPrice}
            onChange={(e) => handleMinPrice(e)}
          />
        </div>

        <div>
          <h4>Max Price: {maxPrice || ""}</h4>
          <input
            type="range"
            min={100}
            max={500000}
            value={maxPrice}
            onChange={(e) => handleMaxPrice(e)}
          />
        </div>

        <div>
          <h4>Category</h4>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">ALL</option>
            {!isLoadingCategories &&
              categoriesResponse?.categories.map((catg) => (
                <option key={catg} value={catg}>
                  {catg.toUpperCase()}
                </option>
              ))}
          </select>
        </div>
      </aside>

      <main>
        <h1>Products</h1>
        <input
          type="text"
          placeholder="Search by name.."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {isLoadingSearchedData ? (
          <SkeletonLoader count={5} />
        ) : (
          <div className="search-product-list">
            {searchedData?.products.map((prod) => (
              <ProductCard
                key={prod._id}
                productId={prod._id}
                name={prod.name}
                photo={prod.photo}
                price={prod.price}
                stock={prod.stock}
                handler={addToCartHandler}
              />
            ))}
          </div>
        )}

        {searchedData && searchedData.totalPages > 1 && (
          <article>
            <button
              onClick={() => setPage((prev) => prev - 1)}
              disabled={!hasPrevPage}
            >
              Prev
            </button>
            <span>
              {page} of {searchedData.totalPages}
            </span>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={!hasNextPage}
            >
              Next
            </button>
          </article>
        )}
      </main>
    </div>
  );
}

export default Search;
