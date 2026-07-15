const API = "http://127.0.0.1:5000/employees";

export async function getEmployees() {
  const response = await fetch(API);

  if (!response.ok) {
    throw new Error("Failed to fetch employees");
  }

  const json = await response.json();

  return json.data;
}

export async function createEmployee(data) {
  const response = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create employee");
  }

  return response.json();
}

export async function updateEmployee(id, data) {
  const response = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update employee");
  }

  return response.json();
}

export async function deleteEmployee(id) {
  const response = await fetch(`${API}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete employee");
  }

  return response.json();
}