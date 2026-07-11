import './DashboardCard.css'

function DashboardCard({ title }) {
  return (
    <article className="dashboard-card p-3">
      <h3 className="mb-0">{title}</h3>
    </article>
  )
}

export default DashboardCard
