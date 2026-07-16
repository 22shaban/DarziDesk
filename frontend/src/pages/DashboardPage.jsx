import { useEffect, useState } from 'react'

import DashboardCard from '../components/DashboardCard'

import { getOrders } from '../services/ordersApi'
import { getInvoices } from '../services/invoiceApi'
import { getInventory } from '../services/inventoryApi'

import './DashboardPage.css'

function DashboardPage() {
  const [stats, setStats] = useState({
    activeOrders: 0,
    revenue: 0,
    inventory: 0,
    lowStock: 0,
    recentOrders: [],
    readyOrders: [],
  })

  useEffect(() => {
    loadDashboard()
  }, [])

  async function loadDashboard() {
    try {
      const [
        orders,
        customers,
        invoices,
        inventory,
      ] = await Promise.all([
        getOrders(),
        getInvoices(),
        getInventory(),
      ])

      const revenue = invoices.reduce(
        (sum, invoice) =>
          sum + Number(invoice.totalAmount || 0),
        0
      )

      const activeOrders = orders.filter(
        (order) => order.status === 'Pending'
      ).length

      const lowStock = inventory.filter(
        (item) => Number(item.quantity || 0) <= 5
      ).length

      const recentOrders = [...orders]
        .slice(-5)
        .reverse()

      const readyOrders = orders.filter(
        (order) => order.status === 'Completed'
      )

      setStats({
        activeOrders,
        revenue,
        inventory: inventory.length,
        lowStock,
        recentOrders,
        readyOrders,
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <section className="dashboard-page">

      <div className="row g-3 mb-4">

        <div className="col-md-3">
          <DashboardCard
            title="Active Orders"
            value={stats.activeOrders}
          />
        </div>

        <div className="col-md-3">
          <DashboardCard
            title="Revenue"
            value={`Rs. ${stats.revenue.toLocaleString()}`}
          />
        </div>

        <div className="col-md-3">
          <DashboardCard
            title="Inventory Items"
            value={stats.inventory}
          />
        </div>

        <div className="col-md-3">
          <DashboardCard
            title="Low Stock Items"
            value={stats.lowStock}
          />
        </div>

      </div>

      <div className="row g-3">

        <div className="col-md-7">

          <article className="dashboard-block p-3">

            <h2 className="mb-3">
              Recent Orders
            </h2>

            {stats.recentOrders.length === 0 ? (

              <p>No recent orders.</p>

            ) : (

              <ul className="list-group">

                {stats.recentOrders.map((order) => (

                  <li
                    key={order.orderId}
                    className="list-group-item d-flex justify-content-between"
                  >

                    <span>
                      {order.customerName}
                    </span>

                    <span>
                      {order.garmentType}
                    </span>

                  </li>

                ))}

              </ul>

            )}

          </article>

        </div>

        <div className="col-md-5">

          <article className="dashboard-block p-3">

            <h2 className="mb-3">
              Ready for Pickup
            </h2>

            {stats.readyOrders.length === 0 ? (

              <p>No completed orders.</p>

            ) : (

              <ul className="list-group">

                {stats.readyOrders.map((order) => (

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

                ))}

              </ul>

            )}

          </article>

        </div>

      </div>

    </section>
  )
}

export default DashboardPage