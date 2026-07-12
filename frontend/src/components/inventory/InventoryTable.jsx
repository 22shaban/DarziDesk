import InventoryEmptyState from './InventoryEmptyState'
import './InventoryTable.css'

const tableColumns = [
  'Fabric Name',
  'Color',
  'Available Quantity',
  'Inventory Value',
  'Low Stock',
  'Actions',
]

function InventoryTable() {
  return (
    <div className="inventory-table-card">
      <div className="table-responsive">
        <table className="table align-middle mb-0">
          <thead>
            <tr>
              {tableColumns.map((column) => (
                <th key={column} scope="col">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={tableColumns.length} className="inventory-table-empty-cell">
                <InventoryEmptyState
                  title="No fabrics in inventory"
                  message='Click "Add Fabric" to create your first inventory item.'
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default InventoryTable
