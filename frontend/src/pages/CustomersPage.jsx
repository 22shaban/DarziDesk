import { useEffect, useMemo, useState } from 'react'
import { getCustomers } from '../services/customersApi'

import CustomerTable from '../components/customers/CustomerTable'
import CustomerSearchBar from '../components/customers/CustomerSearchBar'

import './CustomersPage.css'

function CustomersPage() {
  const [customers, setCustomers] = useState([])
  const [search, setSearch] = useState('')

  async function loadCustomers() {
    const data = await getCustomers()
    setCustomers(data)
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
        customer.email.toLowerCase().includes(term)
      )
    })
  }, [customers, search])

  return (
    <section className="orders-page">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h1>Customers</h1>
          <p>Manage your tailor shop customers.</p>
        </div>
      </div>

      <div className="orders-toolbar card p-3 mb-4">
        <CustomerSearchBar
          value={search}
          onChange={setSearch}
        />
      </div>

      <CustomerTable customers={filteredCustomers} />
    </section>
  )
}

export default CustomersPage