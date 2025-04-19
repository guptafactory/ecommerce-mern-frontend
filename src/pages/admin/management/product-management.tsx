import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

import AdminSidebar from "../../../components/admin/AdminSidebar";
import { SkeletonLoader } from "../../../components/loader";

import {
  useDeleteProductMutation,
  useProductDetailsQuery,
  useUpdateProductMutation,
} from "../../../redux/api/productAPI";
import { StoreRootState, server } from "../../../redux/store";
import { responseToast } from "../../../utils/features";

const defaultProduct = {
  name: "",
  category: "",
  price: 0,
  stock: 0,
  photo: "",
};

const ProductManagement = () => {
  const { user } = useSelector((state: StoreRootState) => state.userReducer);
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  const { data, isLoading, isError, error } = useProductDetailsQuery(id || "");

  const { name, category, price, stock, photo } =
    data?.product || defaultProduct;

  const [nameUpdate, setNameUpdate] = useState<string>(name);
  const [categoryUpdate, setCategoryUpdate] = useState<string>(category);
  const [priceUpdate, setPriceUpdate] = useState<number>(price);
  const [stockUpdate, setStockUpdate] = useState<number>(stock);
  const [photoUpdate, setPhotoUpdate] = useState<string>();
  const [photoFile, setPhotoFile] = useState<File>();

  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];

    const reader: FileReader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPhotoUpdate(reader.result);
          setPhotoFile(file);
        }
      };
    }
  };

  const submitHandler = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (error) return;

    const formData = new FormData();
    if (nameUpdate) formData.set("name", nameUpdate);
    if (categoryUpdate) formData.set("category", categoryUpdate);
    if (priceUpdate) formData.set("price", priceUpdate.toString());
    formData.set("stock", stockUpdate.toString());
    if (stockUpdate !== undefined)
      formData.set("stock", stockUpdate.toString());
    if (photoFile) formData.set("photo", photoFile);

    const res = await updateProduct({
      userId: user?._id || "",
      productId: id || "",
      formData,
    });

    responseToast(res, navigate, "/admin/products");
  };

  const deleteHandler = async (): Promise<void> => {
    if (error) return;

    const res = await deleteProduct({
      userId: user?._id || "",
      productId: id || "",
    });

    responseToast(res, navigate, "/admin/products");
  };

  useEffect(() => {
    if (data) {
      setNameUpdate(data.product.name);
      setCategoryUpdate(data.product.category);
      setPriceUpdate(data.product.price);
      setStockUpdate(data.product.stock);
    }
  }, [data]);

  if (isError) return <Navigate to={"/404"} />;

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        {isLoading ? (
          <SkeletonLoader count={20} />
        ) : (
          <>
            <section>
              <strong>ID - {id}</strong>
              <img src={`${server}/${photo}`} alt={name} />
              <p>{name}</p>
              {stock > 0 ? (
                <span className="green">{stock} Available</span>
              ) : (
                <span className="red"> Not Available</span>
              )}
              <h3>₹{price}</h3>
            </section>

            <article>
              <button className="product-delete-btn" onClick={deleteHandler}>
                <FaTrash />
              </button>

              <form onSubmit={submitHandler}>
                <h2>Manage</h2>
                <div>
                  <label>Name</label>
                  <input
                    type="text"
                    placeholder="Name"
                    value={nameUpdate}
                    onChange={(e) => setNameUpdate(e.target.value)}
                  />
                </div>

                <div>
                  <label>Price</label>
                  <input
                    type="number"
                    placeholder="Price"
                    value={priceUpdate}
                    onChange={(e) => setPriceUpdate(Number(e.target.value))}
                  />
                </div>

                <div>
                  <label>Stock</label>
                  <input
                    type="number"
                    placeholder="Stock"
                    value={stockUpdate}
                    onChange={(e) => setStockUpdate(Number(e.target.value))}
                  />
                </div>

                <div>
                  <label>Category</label>
                  <input
                    type="text"
                    placeholder="eg. laptop, camera etc"
                    value={categoryUpdate}
                    onChange={(e) => setCategoryUpdate(e.target.value)}
                  />
                </div>

                <div>
                  <label>Photo</label>
                  <input type="file" onChange={changeImageHandler} />
                </div>

                {photoUpdate && <img src={photoUpdate} alt="New Image" />}
                <button type="submit">Update</button>
              </form>
            </article>
          </>
        )}
      </main>
    </div>
  );
};

export default ProductManagement;
