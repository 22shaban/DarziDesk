import { useEffect, useState } from 'react'
import { FiPlus } from 'react-icons/fi'

import { getInventory } from '../services/inventoryApi'

import InventoryTable from '../components/inventory/InventoryTable'
import NewInventoryModal from '../components/inventory/NewInventoryModal'

import './InventoryPage.css'

function InventoryPage() {
  const [inventory, setInventory] = useState([])
  const [showModal, setShowModal] = useState(false)

  async function loadInventory() {
    try {
      const data = await getInventory()
      setInventory(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    loadInventory()
  }, [])

  return (
    <section className="inventory-page">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1>Fabric & Inventory</h1>

          <p className="mb-0">
            Manage fabrics, accessories and stock.
          </p>
        </div>

        <button
          className="btn inventory-new-btn"
          onClick={() => setShowModal(true)}
        >
          <FiPlus className="me-2" />
          Add Fabric
        </button>
      </div>

      <InventoryTable
        inventory={inventory}
        refresh={loadInventory}
      />

      <div className="orders-pagination-placeholder mt-4">
        Page 1 of 1
      </div>

      {showModal && (
        <NewInventoryModal
          onClose={() => setShowModal(false)}
          onCreated={loadInventory}
        />
      )}
    </section>
  )
}

export default InventoryPage