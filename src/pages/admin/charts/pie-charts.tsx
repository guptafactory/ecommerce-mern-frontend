import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import AdminSidebar from "../../../components/admin/AdminSidebar";
import { DoughnutChart, PieChart } from "../../../components/admin/Charts";
import { SkeletonLoader } from "../../../components/loader";

import { usePieChartQuery } from "../../../redux/api/dashboardAPI";
import { StoreRootState } from "../../../redux/store";

const PieCharts = () => {
  const { user } = useSelector((state: StoreRootState) => state.userReducer);

  const { data, isLoading, isError } = usePieChartQuery(user?._id || "");

  const charts = data?.charts;

  if (isError || !charts) return <Navigate to={"/admin/dashboard"} />;

  const {
    orderFulfillment,
    productCategories,
    revenueDistribution,
    stockAvailability,
    usersAgeGroup,
    adminCustomer,
  } = charts;

  // const productCategories2 = categories;

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="chart-container">
        {isLoading ? (
          <SkeletonLoader count={20} />
        ) : (
          <>
            <h1>Pie & Doughnut Charts</h1>
            <section>
              <div>
                <PieChart
                  labels={["Processing", "Shipped", "Delivered"]}
                  data={[
                    orderFulfillment.processing,
                    orderFulfillment.shipped,
                    orderFulfillment.delivered,
                  ]}
                  backgroundColor={[
                    `hsl(110,80%, 80%)`,
                    `hsl(110,80%, 50%)`,
                    `hsl(110,40%, 50%)`,
                  ]}
                  offset={[0, 0, 50]}
                />
              </div>
              <h2>Order Fulfillment Ratio</h2>
            </section>

            <section>
              <div>
                <DoughnutChart
                  labels={productCategories.map((i) => Object.keys(i)[0])}
                  data={productCategories.map((i) => Object.values(i)[0])}
                  backgroundColor={productCategories.map(
                    (_, index) => `hsl(${(index * 60) % 360}, 60%, 50%)`
                  )}
                  legends={false}
                  offset={[0, 0, 0, 80]}
                />
              </div>
              <h2>Product Categories Ratio</h2>
            </section>

            <section>
              <div>
                <DoughnutChart
                  labels={["In Stock", "Out Of Stock"]}
                  data={[
                    stockAvailability.inStock,
                    stockAvailability.outOfStock,
                  ]}
                  backgroundColor={["hsl(269,80%,40%)", "rgb(53, 162, 255)"]}
                  legends={false}
                  offset={[0, 80]}
                  cutout={"70%"}
                />
              </div>
              <h2> Stock Availability</h2>
            </section>

            <section>
              <div>
                <DoughnutChart
                  labels={[
                    "Marketing Cost",
                    "Discount",
                    "Burn",
                    "Production Cost",
                    "Net Margin",
                  ]}
                  data={[
                    revenueDistribution.marketingCost,
                    revenueDistribution.discount,
                    revenueDistribution.burn,
                    revenueDistribution.productionCost,
                    revenueDistribution.netMargin,
                  ]}
                  backgroundColor={[
                    "hsl(110,80%,40%)",
                    "hsl(19,80%,40%)",
                    "hsl(69,80%,40%)",
                    "hsl(300,80%,40%)",
                    "rgb(53, 162, 255)",
                  ]}
                  legends={false}
                  offset={[20, 30, 20, 30, 80]}
                />
              </div>
              <h2>Revenue Distribution</h2>
            </section>

            <section>
              <div>
                <PieChart
                  labels={[
                    "Teenager(Below 20)",
                    "Adult (20-40)",
                    "Older (above 40)",
                  ]}
                  data={[
                    usersAgeGroup.teen,
                    usersAgeGroup.adult,
                    usersAgeGroup.old,
                  ]}
                  backgroundColor={[
                    `hsl(10, ${80}%, 80%)`,
                    `hsl(10, ${80}%, 50%)`,
                    `hsl(10, ${40}%, 50%)`,
                  ]}
                  offset={[0, 0, 50]}
                />
              </div>
              <h2>Users Age Group</h2>
            </section>

            <section>
              <div>
                <DoughnutChart
                  labels={["Admin", "Customers"]}
                  data={[adminCustomer.admin, adminCustomer.customer]}
                  backgroundColor={[`hsl(335, 100%, 38%)`, "hsl(44, 98%, 50%)"]}
                  offset={[0, 50]}
                />
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default PieCharts;
