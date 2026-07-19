const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5000";

const API_URL = `${API_BASE_URL}/measurements`;

export async function getMeasurements() {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error('Failed to fetch measurements')
  }

  const data = await response.json()

  return data.data
}

export async function createMeasurement(measurement) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(measurement),
  })

  if (!response.ok) {
    throw new Error('Failed to create measurement')
  }

  return await response.json()
}

export async function updateMeasurement(measurementId, measurement) {
  const response = await fetch(`${API_URL}/${measurementId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(measurement),
  })

  if (!response.ok) {
    throw new Error('Failed to update measurement')
  }

  return await response.json()
}

export async function deleteMeasurement(measurementId) {
  const response = await fetch(`${API_URL}/${measurementId}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Failed to delete measurement')
  }

  return await response.json()
}