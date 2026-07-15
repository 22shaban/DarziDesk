import { useState } from 'react'
import { createInventory } from '../../services/inventoryApi'
import './NewInventoryModal.css'

function NewInventoryModal({ onClose, onCreated }) {
  const [form, setForm] = useState({
    fabricName: '',
    category: '',
    unit: 'Meters',
    quantity: '',
    costPrice: '',
    sellingPrice: '',
    supplier: '',
  })

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  async function handleSave() {
    try {
      await createInventory({
        ...form,
        status: Number(form.quantity) <= 0
          ? 'Out of Stock'
          : Number(form.quantity) <= 10
          ? 'Low Stock'
          : 'In Stock',
      })

      alert('Inventory item created successfully!')

      await onCreated()

      onClose()
    } catch (error) {
      console.error(error)
      alert('Failed to create inventory item')
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h2>Add Fabric</h2>

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
              type="number"
              className="form-control"
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
              type="number"
              className="form-control"
              name="costPrice"
              value={form.costPrice}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Selling Price</label>
            <input
              type="number"
              className="form-control"
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
            onClick={handleSave}
          >
            Save Fabric
          </button>
        </div>
      </div>
    </div>
  )
}

export default NewInventoryModal