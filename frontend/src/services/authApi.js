const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5000";

const API_URL = `${API_BASE_URL}/login`;

export async function login(username, password) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Login failed");
  }

  return result.data;
}