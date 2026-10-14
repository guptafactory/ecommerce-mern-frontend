import { ReactElement, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppColumnDef } from "../../components/admin/tableFeatures";
import toast from "react-hot-toast";

import { useAllOrdersQuery } from "../../redux/api/orderAPI";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { SkeletonLoader } from "../../components/loader";

import { CustomError } from "../../types/api-types";
import { StoreRootState } from "../../redux/store";

type DataType = {
  user: string;
  amount: number;
  discount: number;
  quantity: number;
  status: ReactElement;
  action: ReactElement;
};

const columns: AppColumnDef<DataType>[] = [
  {
    header: "Avatar",
    accessorKey: "user",
  },
  {
    header: "Amount",
    accessorKey: "amount",
  },
  {
    header: "Discount",
    accessorKey: "discount",
  },
  {
    header: "Quantity",
    accessorKey: "quantity",
  },
  {
    header: "Status",
    accessorKey: "status",
  },
  {
    header: "Action",
    accessorKey: "action",
  },
];

const Transactions = () => {
  const { user } = useSelector((state: StoreRootState) => state.userReducer);

  const { data, isLoading, isError, error } = useAllOrdersQuery(
    user?._id || "",
  );

  const rows = useMemo<DataType[]>(() => {
    if (!data) return [];
    return data.orders.map((order) => ({
      user: order.user.name,
      amount: order.total,
      discount: order.discount,
      status: (
        <span
          className={
            order.status === "Processing"
              ? "red"
              : order.status === "Shipped"
                ? "green"
                : "purple"
          }
        >
          {order.status}
        </span>
      ),
      quantity: order.orderItems.length,
      action: <Link to={`/admin/transaction/${order._id}`}>Manage</Link>,
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
    "Transactions",
    rows.length > 6,
  )();
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{isLoading && rows ? <SkeletonLoader count={20} /> : Table}</main>
    </div>
  );
};

export default Transactions;
