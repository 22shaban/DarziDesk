const API_URL = 'http://127.0.0.1:5000/customers'

export async function getCustomers() {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error('Failed to fetch customers')
  }

  const data = await response.json()

  return data.data
}

export async function createCustomer(customer) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(customer),
  })

  if (!response.ok) {
    throw new Error('Failed to create customer')
  }

  return await response.json()
}

export async function updateCustomer(customerId, customer) {
  const response = await fetch(`${API_URL}/${customerId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(customer),
  })

  if (!response.ok) {
    throw new Error('Failed to update customer')
  }

  return await response.json()
}

export async function deleteCustomer(customerId) {
  const response = await fetch(`${API_URL}/${customerId}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Failed to delete customer')
  }

  return await response.json()
}