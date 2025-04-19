import { ReactElement, useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { Column } from "react-table";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { SkeletonLoader } from "../../components/loader";

import { StoreRootState } from "../../redux/store";
import {
  useAllUsersQuery,
  useDeleteUserMutation,
} from "../../redux/api/userAPI";
import { CustomError } from "../../types/api-types";
import { responseToast } from "../../utils/features";

type DataType = {
  avatar: ReactElement;
  name: string;
  email: string;
  gender: string;
  role: string;
  action: ReactElement;
};

const columns: Column<DataType>[] = [
  {
    Header: "Avatar",
    accessor: "avatar",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Role",
    accessor: "role",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Customers = () => {
  const { user } = useSelector((state: StoreRootState) => state.userReducer);

  const { data, isLoading, isError, error } = useAllUsersQuery(user?._id || "");
  const [deleteUser] = useDeleteUserMutation();

  const [rows, setRows] = useState<DataType[]>([]);

  const deleteHandler = useCallback(
    async (userId: string) => {
      const res = await deleteUser({ userId, adminId: user?._id || "" });
      responseToast(res, null, "");
    },
    [deleteUser, user]
  );

  useEffect(() => {
    if (data) {
      setRows(
        data.users.map((user) => ({
          avatar: (
            <img
              style={{
                borderRadius: "50%",
              }}
              src={user.photo}
              alt={`${user.name} avatar`}
            />
          ),
          name: user.name,
          email: user.email,
          gender: user.gender,
          role: user.role,
          action: (
            <button>
              <FaTrash onClick={() => deleteHandler(user._id)} />
            </button>
          ),
        }))
      );
    }

    if (isError) {
      const err = error as CustomError;
      toast.error(err.data.message);
    }
  }, [data, isError, error, deleteHandler]);

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Customers",
    rows.length > 6
  )();

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{isLoading && rows ? <SkeletonLoader count={20} /> : Table}</main>
    </div>
  );
};

export default Customers;
