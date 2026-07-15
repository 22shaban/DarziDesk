import { useState } from "react";
import "./NewInventoryModal.css";

function EditInventoryModal({
  inventory,
  onClose,
  onSave,
}) {
  const [form, setForm] = useState({ ...inventory });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit() {
    onSave(form);
  }

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h2>Edit Fabric</h2>

        <div className="row g-3">

          <div className="col-md-6">
            <label className="form-label">Fabric Name</label>
            <input
              className="form-control"
              name="fabricName"
              value={form.fabricName}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Category</label>
            <input
              className="form-control"
              name="category"
              value={form.category}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Unit</label>

            <select
              className="form-select"
              name="unit"
              value={form.unit}
              onChange={handleChange}
            >
              <option>Meters</option>
              <option>Pieces</option>
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label">Quantity</label>

            <input
              className="form-control"
              type="number"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Supplier</label>

            <input
              className="form-control"
              name="supplier"
              value={form.supplier}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Cost Price</label>

            <input
              className="form-control"
              type="number"
              name="costPrice"
              value={form.costPrice}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Selling Price</label>

            <input
              className="form-control"
              type="number"
              name="sellingPrice"
              value={form.sellingPrice}
              onChange={handleChange}
            />
          </div>

        </div>

        <div className="d-flex justify-content-end gap-2 mt-4">

          <button
            className="btn btn-secondary"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Save Changes
          </button>

        </div>

      </div>
    </div>
  );
}

export default EditInventoryModal;