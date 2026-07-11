import './StatusBadge.css'

const statusClassMap = {
  New: 'status-new',
  Measurements: 'status-measurements',
  Cutting: 'status-cutting',
  Stitching: 'status-stitching',
  'Quality Check': 'status-quality-check',
  Ready: 'status-ready',
  Delivered: 'status-delivered',
}

function StatusBadge({ status }) {
  const badgeClassName = statusClassMap[status] ?? 'status-new'

  return <span className={`status-badge ${badgeClassName}`}>{status}</span>
}

export default StatusBadge
