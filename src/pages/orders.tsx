import { ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import toast from "react-hot-toast";

import { useMyOrdersQuery } from "../redux/api/orderAPI";
import TableHOC from "../components/admin/TableHOC";
import { SkeletonLoader } from "../components/loader";

import { RootState } from "../redux/store";
import { CustomError } from "../types/api-types";

type DataType = {
  _id: string;
  amount: number;
  quantity: number;
  discount: number;
  status: ReactElement;
  action: ReactElement;
};

const column: Column<DataType>[] = [
  {
    Header: "ID",
    accessor: "_id",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Status",
    accessor: "status",
  },
];

const Orders = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const { data, isLoading, isError, error } = useMyOrdersQuery(user?._id || "");

  const [rows, setRows] = useState<DataType[]>([]);

  useEffect(() => {
    if (data) {
      setRows(
        data.orders.map((order) => ({
          _id: order._id,
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
          action: <Link to={`/order/${order._id}`}>View</Link>,
        }))
      );
    }
    if (isError) {
      const err = error as CustomError;
      toast.error(err.data.message);
    }
  }, [data, isError, error]);

  const Table = TableHOC<DataType>(
    column,
    rows,
    "dashboard-product-box",
    "Orders",
    rows.length > 6
  )();
  return (
    <div className="container">
      <h1>My Orders</h1>
      {isLoading && rows ? <SkeletonLoader count={20} /> : Table}
    </div>
  );
};

export default Orders;
