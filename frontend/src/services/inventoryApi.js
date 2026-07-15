const API_URL = "http://127.0.0.1:5000/inventory";

export async function getInventory() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch inventory");
  }

  const result = await response.json();

  return result.data;
}

export async function createInventory(data) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create inventory");
  }

  return response.json();
}