import { ReactElement, useEffect, useMemo } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppColumnDef } from "../../components/admin/tableFeatures";
import toast from "react-hot-toast";

import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { SkeletonLoader } from "../../components/loader";

import { useAllProductsQuery } from "../../redux/api/productAPI";
import { StoreRootState, server } from "../../redux/store";

import { CustomError } from "../../types/api-types";

type DataType = {
  name: string;
  price: number;
  stock: number;
  photo: ReactElement;
  action: ReactElement;
};

const columns: AppColumnDef<DataType>[] = [
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Price",
    accessorKey: "price",
  },
  {
    header: "Stock",
    accessorKey: "stock",
  },
  {
    header: "Photo",
    accessorKey: "photo",
  },
  {
    header: "Action",
    accessorKey: "action",
  },
];

const Products = () => {
  const { user } = useSelector((state: StoreRootState) => state.userReducer);

  const { data, isError, error, isLoading } = useAllProductsQuery(
    user?._id || "",
  );
  const rows = useMemo<DataType[]>(() => {
    if (!data) return [];
    return data.products.map((product) => ({
      key: product._id,
      name: product.name,
      price: product.price,
      stock: product.stock,
      photo: <img src={`${server}/${product.photo}`} alt="Shoes" />,
      action: <Link to={`/admin/product/${product._id}`}>Manage</Link>,
    }));
  }, [data]);

  useEffect(() => {
    if (isError) {
      const err = error as CustomError;
      toast.error(err.data.message);
    }
  }, [isError, error]);

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Products",
    rows.length > 6,
  )();

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{isLoading && rows ? <SkeletonLoader count={20} /> : Table}</main>
      <Link to="/admin/product/new" className="create-product-btn">
        <FaPlus />
      </Link>
    </div>
  );
};

export default Products;
