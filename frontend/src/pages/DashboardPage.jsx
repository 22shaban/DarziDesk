import { useEffect, useState } from "react";
import {
  FiPackage,
  FiDollarSign,
  FiArchive,
  FiAlertTriangle,
} from "react-icons/fi";

import DashboardCard from "../components/DashboardCard";

import { getOrders } from "../services/ordersApi";
import { getInvoices } from "../services/invoiceApi";
import { getInventory } from "../services/inventoryApi";

import "./DashboardPage.css";

function DashboardPage() {
  const [stats, setStats] = useState({
    activeOrders: 0,
    revenue: 0,
    inventory: 0,
    lowStock: 0,
    recentOrders: [],
    readyOrders: [],
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const [orders, invoices, inventory] =
        await Promise.all([
          getOrders(),
          getInvoices(),
          getInventory(),
        ]);

      const revenue = invoices.reduce(
        (sum, invoice) =>
          sum + Number(invoice.totalAmount || 0),
        0
      );

      const activeOrders = orders.filter(
        (order) =>
          order.status !== "Completed" &&
          order.status !== "Delivered"
      ).length;

      const lowStock = inventory.filter(
        (item) =>
          Number(item.quantity || 0) <= 5
      ).length;

      const recentOrders = [...orders]
        .reverse()
        .slice(0, 5);

      const readyOrders = orders.filter(
        (order) =>
          order.status === "Completed" ||
          order.status === "Ready"
      );

      setStats({
        activeOrders,
        revenue,
        inventory: inventory.length,
        lowStock,
        recentOrders,
        readyOrders,
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section className="dashboard-page">

      <div className="mb-4">
        <h1 className="mb-1">
          Dashboard
        </h1>

        <p className="text-muted">
          Welcome back! Here's your shop overview.
        </p>
      </div>

      <div className="row g-3 mb-4">

        <div className="col-md-3">
          <DashboardCard
            title="Active Orders"
            value={stats.activeOrders}
            color="primary"
            icon={<FiPackage />}
          />
        </div>

        <div className="col-md-3">
          <DashboardCard
            title="Revenue"
            value={`₹${stats.revenue.toLocaleString()}`}
            color="success"
            icon={<FiDollarSign />}
          />
        </div>

        <div className="col-md-3">
          <DashboardCard
            title="Inventory"
            value={stats.inventory}
            color="info"
            icon={<FiArchive />}
          />
        </div>

        <div className="col-md-3">
          <DashboardCard
            title="Low Stock"
            value={stats.lowStock}
            color="danger"
            icon={<FiAlertTriangle />}
          />
        </div>

      </div>

      <div className="row g-3">

        <div className="col-lg-7">

          <div className="card shadow-sm h-100">

            <div className="card-body">

              <h5 className="mb-3">
                Recent Orders
              </h5>

              {stats.recentOrders.length === 0 ? (

                <p className="text-muted">
                  No recent orders.
                </p>

              ) : (

                <table className="table">

                  <thead>

                    <tr>
                      <th>Customer</th>
                      <th>Garment</th>
                      <th>Status</th>
                    </tr>

                  </thead>

                  <tbody>

                    {stats.recentOrders.map(
                      (order) => (

                        <tr key={order.orderId}>
                          <td>{order.customerName}</td>
                          <td>{order.garmentType}</td>
                          <td>{order.status}</td>
                        </tr>

                      )
                    )}

                  </tbody>

                </table>

              )}

            </div>

          </div>

        </div>

        <div className="col-lg-5">

          <div className="card shadow-sm">

            <div className="card-body">

              <h5 className="mb-3">
                Ready for Pickup
              </h5>

              {stats.readyOrders.length === 0 ? (

                <p className="text-muted">
                  No ready orders.
                </p>

              ) : (

                <ul className="list-group">

                  {stats.readyOrders.map(
                    (order) => (

                      <li
                        key={order.orderId}
                        className="list-group-item"
                      >

                        <strong>
                          {order.customerName}
                        </strong>

                        <br />

                        <small>
                          {order.garmentType}
                        </small>

                      </li>

                    )
                  )}

                </ul>

              )}

            </div>

          </div>

          <div className="card shadow-sm mt-3">

            <div className="card-body">

              <h5>
                Inventory Alert
              </h5>

              <h2 className="text-danger">
                {stats.lowStock}
              </h2>

              <p className="mb-0">
                item(s) are running low.
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default DashboardPage;