import EmptyState from "../orders/EmptyState";
import "./EmployeeTable.css";

const columns = [
  "Employee",
  "Phone",
  "Role",
  "Salary",
  "Status",
  "Actions",
];

function EmployeeTable({
  employees,
  onEdit,
  onDelete,
}) {
  return (
    <div className="employee-table-card">
      <table className="table align-middle mb-0">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan="6">
                <EmptyState
                  title="No employees found."
                  message='Click "Add Employee" to create your first employee.'
                />
              </td>
            </tr>
          ) : (
            employees.map((employee) => (
              <tr key={employee.employeeId}>
                <td>{employee.employeeName}</td>

                <td>{employee.phone}</td>

                <td>{employee.role}</td>

                <td>₹{employee.salary}</td>

                <td>{employee.status}</td>

                <td>
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => onEdit(employee)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => onDelete(employee)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeTable;