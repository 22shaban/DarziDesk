import { useState } from "react";

const initialForm = {
  employeeName: "",
  phone: "",
  role: "",
  salary: "",
  status: "Active",
};

function NewEmployeeModal({ onClose, onSave }) {
  const [form, setForm] = useState(initialForm);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    await onSave({
      ...form,
      salary: Number(form.salary),
    });

    setForm(initialForm);
  }

  return (
    <div className="modal d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">Add Employee</h5>

            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            />
          </div>

          <form onSubmit={handleSubmit}>

            <div className="modal-body">

              <div className="mb-3">
                <label className="form-label">Employee Name</label>

                <input
                  className="form-control"
                  name="employeeName"
                  value={form.employeeName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Phone</label>

                <input
                  className="form-control"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Role</label>

                <input
                  className="form-control"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Salary</label>

                <input
                  type="number"
                  className="form-control"
                  name="salary"
                  value={form.salary}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Status</label>

                <select
                  className="form-select"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>

            </div>

            <div className="modal-footer">

              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-primary"
              >
                Save Employee
              </button>

            </div>

          </form>

        </div>
      </div>
    </div>
  );
}

export default NewEmployeeModal;