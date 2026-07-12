import MeasurementEmptyState from './MeasurementEmptyState'
import './MeasurementTable.css'

const tableColumns = ['Customer', 'Garment', 'Last Updated', 'Actions']

function MeasurementTable() {
  return (
    <div className="measurements-table-card">
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
              <td colSpan={tableColumns.length} className="measurements-table-empty-cell">
                <MeasurementEmptyState
                  title="No measurements yet"
                  message="Click New Measurement to create your first measurement."
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MeasurementTable
