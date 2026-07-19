const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5000";

const API_URL = `${API_BASE_URL}/settings`;

export async function getSettings() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch settings");
  }

  const result = await response.json();

  return result.data;
}

export async function updateSettings(data) {
  const response = await fetch(API_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update settings");
  }

  return response.json();
}