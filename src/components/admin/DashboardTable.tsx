import { AppColumnDef } from "./tableFeatures";
import TableHOC from "./TableHOC";

type DataType = {
  _id: string;
  quantity: number;
  discount: number;
  amount: number;
  status: string;
};

const columns: AppColumnDef<DataType>[] = [
  {
    header: "Id",
    accessorKey: "_id",
  },
  {
    header: "Quantity",
    accessorKey: "quantity",
  },
  {
    header: "Discount",
    accessorKey: "discount",
  },
  {
    header: "Amount",
    accessorKey: "amount",
  },
  {
    header: "Status",
    accessorKey: "status",
  },
];

const DashboardTable = ({ data = [] }: { data: DataType[] }) => {
  return TableHOC<DataType>(
    columns,
    data,
    "transaction-box",
    "Top Transaction",
  )();
};

export default DashboardTable;
