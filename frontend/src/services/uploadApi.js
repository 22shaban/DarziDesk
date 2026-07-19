const API_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5000";

export async function uploadLogo(file) {
  const formData = new FormData();

  formData.append("logo", file);

  const response = await fetch(`${API_URL}/upload-logo`, {
    method: "POST",
    body: formData,
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result.data.logoUrl;
}