import { useState } from 'react'
import EmptyState from '../orders/EmptyState'
import EditInventoryModal from './EditInventoryModal'
import {
  updateInventory,
  deleteInventory,
} from '../../services/inventoryApi'
import './InventoryTable.css'

const columns = [
  'Fabric',
  'Category',
  'Unit',
  'Quantity',
  'Cost',
  'Selling',
  'Supplier',
  'Status',
  'Actions',
]

function InventoryTable({ inventory, onRefresh }) {
  const [selectedItem, setSelectedItem] = useState(null)

  async function handleSave(updatedItem) {
    try {
      await updateInventory(
        updatedItem.inventoryId,
        updatedItem,
      )

      setSelectedItem(null)

      if (onRefresh) {
        await onRefresh()
      }
    } catch (error) {
      console.error(error)
      alert('Failed to update inventory.')
    }
  }
  async function handleDelete(inventoryId) {
  const confirmed = window.confirm(
    'Are you sure you want to delete this inventory item?'
  )

  if (!confirmed) return

  try {
    await deleteInventory(inventoryId)

    if (onRefresh) {
      await onRefresh()
    }
  } catch (error) {
    console.error(error)
    alert('Failed to delete inventory.')
  }
}

  return (
    <>
      <div className="inventory-table-card">
        <table className="table align-middle mb-0">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {inventory.length === 0 ? (
              <tr>
                <td colSpan="9">
                  <EmptyState
                    title="No inventory found."
                    message='Click "Add Fabric" to create your first inventory item.'
                  />
                </td>
              </tr>
            ) : (
              inventory.map((item) => (
                <tr key={item.inventoryId}>
                  <td>{item.fabricName}</td>

                  <td>{item.category}</td>

                  <td>{item.unit}</td>

                  <td>{item.quantity}</td>

                  <td>₹{item.costPrice}</td>

                  <td>₹{item.sellingPrice}</td>

                  <td>{item.supplier}</td>

                  <td>{item.status}</td>

                  <td>
                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => setSelectedItem(item)}
                    >
                      Edit
                    </button>

                    <button
  className="btn btn-sm btn-outline-danger"
  onClick={() => handleDelete(item.inventoryId)}
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

      {selectedItem && (
        <EditInventoryModal
          inventory={selectedItem}
          onClose={() => setSelectedItem(null)}
          onSave={handleSave}
        />
      )}
    </>
  )
}

export default InventoryTable