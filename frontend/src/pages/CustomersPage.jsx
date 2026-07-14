import { useEffect, useMemo, useState } from 'react'
import { FiPlus } from 'react-icons/fi'

import { getCustomers } from '../services/customersApi'

import CustomerTable from '../components/customers/CustomerTable'
import CustomerSearchBar from '../components/customers/CustomerSearchBar'
import AddCustomerModal from '../components/customers/AddCustomerModal'

import './CustomersPage.css'

function CustomersPage() {
  const [customers, setCustomers] = useState([])
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)

  async function loadCustomers() {
    try {
      const data = await getCustomers()
      setCustomers(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    loadCustomers()
  }, [])

  const filteredCustomers = useMemo(() => {
    const term = search.toLowerCase()

    return customers.filter((customer) => {
      return (
        customer.customerName.toLowerCase().includes(term) ||
        customer.phone.toLowerCase().includes(term) ||
        customer.email.toLowerCase().includes(term) ||
        customer.address.toLowerCase().includes(term)
      )
    })
  }, [customers, search])

  return (
    <section className="orders-page">
      <div className="d-flex align-items-center justify-content-between gap-3 mb-4">
        <div>
          <h1 className="mb-1">Customers</h1>

          <p className="mb-0">
            Manage your customer database.
          </p>
        </div>

        <button
          className="btn orders-new-order-btn"
          onClick={() => setShowModal(true)}
        >
          <FiPlus className="me-2" />
          Add Customer
        </button>
      </div>

      <div className="orders-toolbar card p-3 mb-4">
        <CustomerSearchBar
          value={search}
          onChange={setSearch}
        />
      </div>

      <CustomerTable
        customers={filteredCustomers}
        refresh={loadCustomers}
      />

      <div className="orders-pagination-placeholder mt-4">
        Page 1 of 1
      </div>

      {showModal && (
        <AddCustomerModal
          onClose={() => setShowModal(false)}
          onCreated={loadCustomers}
        />
      )}
    </section>
  )
}

export default CustomersPage