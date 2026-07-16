import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function PaymentStatusChart({
  paid,
  partial,
  pending,
}) {
  const data = {
    labels: [
      "Paid",
      "Partially Paid",
      "Pending",
    ],
    datasets: [
      {
        data: [
          paid,
          partial,
          pending,
        ],
        backgroundColor: [
          "#198754",
          "#ffc107",
          "#dc3545",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div className="card shadow-sm p-3">
      <h5 className="mb-3">
        Payment Status
      </h5>

      <Pie
        data={data}
        options={options}
      />
    </div>
  );
}

export default PaymentStatusChart;