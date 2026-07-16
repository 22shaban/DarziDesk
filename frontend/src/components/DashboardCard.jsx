import './DashboardCard.css'

function DashboardCard({
  title,
  value = '-',
}) {
  return (
    <article className="dashboard-card p-3">

      <p className="dashboard-card-title mb-2">
        {title}
      </p>

      <h2 className="dashboard-card-value mb-0">
        {value}
      </h2>

    </article>
  )
}

export default DashboardCard