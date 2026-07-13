const API_URL = 'http://127.0.0.1:5000/orders'

export async function getOrders() {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error('Failed to fetch orders')
  }

  const data = await response.json()

  return data.data
}