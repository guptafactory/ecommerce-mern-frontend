import { ReactElement, useMemo, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { AppColumnDef } from "../../components/admin/tableFeatures";
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

const columns: AppColumnDef<DataType>[] = [
  {
    header: "Avatar",
    accessorKey: "avatar",
  },
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Gender",
    accessorKey: "gender",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Role",
    accessorKey: "role",
  },
  {
    header: "Action",
    accessorKey: "action",
  },
];

const Customers = () => {
  const { user } = useSelector((state: StoreRootState) => state.userReducer);

  const { data, isLoading, isError, error } = useAllUsersQuery(user?._id || "");
  const [deleteUser] = useDeleteUserMutation();

  const deleteHandler = useCallback(
    async (userId: string) => {
      const res = await deleteUser({ userId, adminId: user?._id || "" });
      responseToast(res, null, "");
    },
    [deleteUser, user],
  );

  const rows = useMemo<DataType[]>(() => {
    if (!data) return [];
    return data.users.map((user) => ({
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
    }));
  }, [data, deleteHandler]);

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
    "Customers",
    rows.length > 6,
  )();

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{isLoading && rows ? <SkeletonLoader count={20} /> : Table}</main>
    </div>
  );
};

export default Customers;
