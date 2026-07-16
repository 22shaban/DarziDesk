import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

function RevenueChart({
  revenue,
  orders,
  customers,
  inventory,
}) {
  const data = {
    labels: [
      "Revenue",
      "Orders",
      "Customers",
      "Inventory",
    ],
    datasets: [
      {
        label: "Business Overview",
        data: [
          revenue,
          orders,
          customers,
          inventory,
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="card shadow-sm p-3">
      <h5 className="mb-3">
        Business Overview
      </h5>

      <Bar
        data={data}
        options={options}
      />
    </div>
  );
}

export default RevenueChart;