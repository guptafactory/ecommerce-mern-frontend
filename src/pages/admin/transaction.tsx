import { ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import toast from "react-hot-toast";

import { useAllOrdersQuery } from "../../redux/api/orderAPI";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { SkeletonLoader } from "../../components/loader";

import { CustomError } from "../../types/api-types";
import { RootState } from "../../redux/store";

type DataType = {
  user: string;
  amount: number;
  discount: number;
  quantity: number;
  status: ReactElement;
  action: ReactElement;
};

const columns: Column<DataType>[] = [
  {
    Header: "Avatar",
    accessor: "user",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Transaction = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const { data, isLoading, isError, error } = useAllOrdersQuery(
    user?._id || ""
  );

  const [rows, setRows] = useState<DataType[]>([]);

  useEffect(() => {
    if (data) {
      setRows(
        data.orders.map((order) => ({
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
        }))
      );
    }
    if (isError) {
      const err = error as CustomError;
      toast.error(err.data.message);
    }
  }, [data, isError, error]);

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Transactions",
    rows.length > 6
  )();
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{isLoading && rows ? <SkeletonLoader count={20} /> : Table}</main>
    </div>
  );
};

export default Transaction;
