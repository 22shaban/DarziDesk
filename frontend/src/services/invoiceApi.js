const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5000";

const API = `${API_BASE_URL}/invoices`;

export async function getInvoices() {
  const response = await fetch(API);

  if (!response.ok) {
    throw new Error("Failed to fetch invoices");
  }

  const json = await response.json();

  return json.data;
}

export async function createInvoice(data) {
  const response = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create invoice");
  }

  return response.json();
}

export async function updateInvoice(id, data) {
  const response = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update invoice");
  }

  return response.json();
}

export async function deleteInvoice(id) {
  const response = await fetch(`${API}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete invoice");
  }

  return response.json();
}