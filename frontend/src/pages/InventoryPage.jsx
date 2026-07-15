import { useEffect, useState } from "react";
import InventoryTable from "../components/inventory/InventoryTable";
import NewInventoryModal from "../components/inventory/NewInventoryModal";
import { getInventory } from "../services/inventoryApi";
import "./InventoryPage.css";

function InventoryPage() {
  const [inventory, setInventory] = useState([]);
  const [showModal, setShowModal] = useState(false);

  async function loadInventory() {
    try {
      const data = await getInventory();
      setInventory(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadInventory();
  }, []);

  return (
    <>
      <div className="page-header d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Fabric & Inventory</h2>
          <p className="text-muted">
            Manage fabrics and stock levels.
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          + Add Fabric
        </button>
      </div>

      <InventoryTable inventory={inventory} />

      {showModal && (
        <NewInventoryModal
          onClose={() => setShowModal(false)}
          onCreated={loadInventory}
        />
      )}
    </>
  );
}

export default InventoryPage;