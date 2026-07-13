const API_URL = 'http://127.0.0.1:5000/orders'

export async function getOrders() {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error('Failed to fetch orders')
  }

  const data = await response.json()

  return data.data
}
export async function createOrder(order) {
  const response = await fetch('http://127.0.0.1:5000/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  })

  if (!response.ok) {
    throw new Error('Failed to create order')
  }

  return await response.json()
}