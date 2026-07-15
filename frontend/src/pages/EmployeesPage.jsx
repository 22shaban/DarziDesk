import { useEffect, useState } from "react";
import {
  createEmployee,
  deleteEmployee,
  getEmployees,
  updateEmployee,
} from "../services/employeeApi";
import EmployeeTable from "../components/employees/EmployeeTable";
import NewEmployeeModal from "../components/employees/NewEmployeeModal";
import EditEmployeeModal from "../components/employees/EditEmployeeModal";
import "./EmployeesPage.css";

function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [showNewModal, setShowNewModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  async function loadEmployees() {
    try {
      const data = await getEmployees();
      setEmployees(data || []);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadEmployees();
  }, []);

  async function handleCreate(data) {
    try {
      await createEmployee(data);
      setShowNewModal(false);
      loadEmployees();
    } catch {
      alert("Failed to create employee.");
    }
  }

  async function handleUpdate(data) {
    try {
      await updateEmployee(data.employeeId, data);
      setEditingEmployee(null);
      loadEmployees();
    } catch {
      alert("Failed to update employee.");
    }
  }

  async function handleDelete(employee) {
    if (
      !window.confirm(
        `Delete ${employee.employeeName}?`
      )
    ) {
      return;
    }

    try {
      await deleteEmployee(employee.employeeId);
      loadEmployees();
    } catch {
      alert("Failed to delete employee.");
    }
  }

  return (
    <div className="employees-page">

      <div className="page-header">

        <div>
          <h2>Employees</h2>

          <p>
            Manage tailor shop employees.
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => setShowNewModal(true)}
        >
          + Add Employee
        </button>

      </div>

      <EmployeeTable
        employees={employees}
        onEdit={setEditingEmployee}
        onDelete={handleDelete}
      />

      {showNewModal && (
        <NewEmployeeModal
          onClose={() => setShowNewModal(false)}
          onSave={handleCreate}
        />
      )}

      {editingEmployee && (
        <EditEmployeeModal
          employee={editingEmployee}
          onClose={() => setEditingEmployee(null)}
          onSave={handleUpdate}
        />
      )}

    </div>
  );
}

export default EmployeesPage;