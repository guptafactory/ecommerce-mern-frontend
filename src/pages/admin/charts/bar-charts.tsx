import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import AdminSidebar from "../../../components/admin/AdminSidebar";
import { BarChart } from "../../../components/admin/Charts";
import { SkeletonLoader } from "../../../components/loader";

import { StoreRootState } from "../../../redux/store";
import { useBarChartQuery } from "../../../redux/api/dashboardAPI";
import { getLastMonths } from "../../../utils/features";

const defaultBarChart = {
  users: [0, 0, 0, 0, 0, 0],
  products: [0, 0, 0, 0, 0, 0],
  orders: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
};

const Barcharts = () => {
  const { user } = useSelector((state: StoreRootState) => state.userReducer);

  const { data, isLoading, isError } = useBarChartQuery(user?._id || "");

  if (isError) return <Navigate to={"/admin/dashboard"} />;

  const charts = data?.charts || defaultBarChart;

  const { users, products, orders } = charts;
  const last12months = getLastMonths({
    count: 12,
    reverse: true,
  });
  const last6months = getLastMonths({
    count: 6,
    reverse: true,
  });

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="chart-container">
        {isLoading ? (
          <SkeletonLoader count={20} />
        ) : (
          <>
            <h1>Bar Charts</h1>
            <section>
              <BarChart
                data_1={products}
                data_2={users}
                title_1="Products"
                title_2="Users"
                bgColor_1={`hsl(260, 50%, 30%)`}
                bgColor_2={`hsl(360, 90%, 90%)`}
                labels={last6months}
              />
              <h2>Top Products & Top Customers</h2>
            </section>

            <section>
              <BarChart
                horizontal={true}
                data_1={orders}
                data_2={[]}
                title_1="Orders"
                title_2=""
                bgColor_1={`hsl(180, 40%, 50%)`}
                bgColor_2=""
                labels={last12months}
              />
              <h2>Orders throughout the year</h2>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default Barcharts;
