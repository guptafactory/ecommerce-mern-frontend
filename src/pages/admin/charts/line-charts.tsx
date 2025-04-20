import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import AdminSidebar from "../../../components/admin/AdminSidebar";
import { LineChart } from "../../../components/admin/Charts";
import { SkeletonLoader } from "../../../components/loader";

import { StoreRootState } from "../../../redux/store";
import { useLineChartQuery } from "../../../redux/api/dashboardAPI";

import { getLastMonths } from "../../../utils/features";

const Linecharts = () => {
  const { user } = useSelector((state: StoreRootState) => state.userReducer);

  const { data, isLoading, isError } = useLineChartQuery(user?._id || "");

  const charts = data?.charts;

  if (isError) return <Navigate to={"/admin/dashboard"} />;
  if (!charts) return <div>No chart data available.</div>;

  const last12months = getLastMonths({
    count: 12,
    reverse: true,
  });

  const { users, products, discounts, revenues } = charts;

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="chart-container">
        {isLoading ? (
          <SkeletonLoader count={20} />
        ) : (
          <>
            <h1>Line Charts</h1>
            <section>
              <LineChart
                data={users}
                label="Users"
                borderColor="rgb(53, 162, 255)"
                labels={last12months}
                backgroundColor="rgba(53, 162, 255, 0.5)"
              />
              <h2>Active Users</h2>
            </section>

            <section>
              <LineChart
                data={products}
                backgroundColor={"hsla(269,80%,40%,0.4)"}
                borderColor={"hsl(269,80%,40%)"}
                labels={last12months}
                label="Products"
              />
              <h2>Total Products (SKU)</h2>
            </section>

            <section>
              <LineChart
                data={revenues}
                backgroundColor={"hsla(129,80%,40%,0.4)"}
                borderColor={"hsl(129,80%,40%)"}
                label="Revenues"
                labels={last12months}
              />
              <h2>Total Revenue </h2>
            </section>

            <section>
              <LineChart
                data={discounts}
                backgroundColor={"hsla(29,80%,40%,0.4)"}
                borderColor={"hsl(29,80%,40%)"}
                label="Discounts"
                labels={last12months}
              />
              <h2>Discount Allotted </h2>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default Linecharts;
