import { useEffect, useState } from 'react'

import ReportCard from '../components/reports/ReportCard'
import ReportEmptyState from '../components/reports/ReportEmptyState'
import ReportFilters from '../components/reports/ReportFilters'

import { getOrders } from '../services/ordersApi'
import { getCustomers } from '../services/customersApi'
import { getInvoices } from '../services/invoiceApi'
import { getInventory } from '../services/inventoryApi'

import './ReportsPage.css'

function ReportsPage() {
  const [stats, setStats] = useState({
    revenue: 0,
    orders: 0,
    customers: 0,
    inventory: 0,
  })

  useEffect(() => {
    loadReportData()
  }, [])

  async function loadReportData() {
    try {
      const [
        orders,
        customers,
        invoices,
        inventory,
      ] = await Promise.all([
        getOrders(),
        getCustomers(),
        getInvoices(),
        getInventory(),
      ])

      const revenue = invoices.reduce(
        (sum, invoice) =>
          sum + Number(invoice.totalAmount || 0),
        0
      )

      setStats({
        revenue,
        orders: orders.length,
        customers: customers.length,
        inventory: inventory.length,
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <section className="reports-page">

      <div className="mb-4">
        <h1 className="mb-1">Reports</h1>

        <p className="text-muted">
          View your tailor shop business insights.
        </p>
      </div>

      <ReportFilters />

      <div className="row g-3 mb-4">

        <div className="col-md-3">
          <ReportCard
            title="Revenue"
            value={`₹${stats.revenue.toLocaleString()}`}
          />
        </div>

        <div className="col-md-3">
          <ReportCard
            title="Orders"
            value={stats.orders}
          />
        </div>

        <div className="col-md-3">
          <ReportCard
            title="Customers"
            value={stats.customers}
          />
        </div>

        <div className="col-md-3">
          <ReportCard
            title="Inventory"
            value={stats.inventory}
          />
        </div>

      </div>

      <div className="reports-preview-card p-4">

        <h4 className="mb-3">
          Business Summary
        </h4>

        {stats.orders === 0 ? (
          <ReportEmptyState
            title="No reports available."
            message="Start adding orders to generate analytics."
          />
        ) : (
          <div className="row">

            <div className="col-md-6">

              <ul className="list-group">

                <li className="list-group-item d-flex justify-content-between">
                  <strong>Total Revenue</strong>
                  <span>
                    ₹{stats.revenue.toLocaleString()}
                  </span>
                </li>

                <li className="list-group-item d-flex justify-content-between">
                  <strong>Total Orders</strong>
                  <span>{stats.orders}</span>
                </li>

                <li className="list-group-item d-flex justify-content-between">
                  <strong>Total Customers</strong>
                  <span>{stats.customers}</span>
                </li>

                <li className="list-group-item d-flex justify-content-between">
                  <strong>Inventory Items</strong>
                  <span>{stats.inventory}</span>
                </li>

              </ul>

            </div>

            <div className="col-md-6">

              <div className="alert alert-primary">

                <h5>Shop Performance</h5>

                <p className="mb-0">
                  Your shop currently has{" "}
                  <strong>{stats.orders}</strong> orders,
                  <strong> {stats.customers}</strong> customers
                  and total revenue of
                  <strong> ₹{stats.revenue.toLocaleString()}</strong>.
                </p>

              </div>

            </div>

          </div>
        )}

      </div>

    </section>
  )
}

export default ReportsPage