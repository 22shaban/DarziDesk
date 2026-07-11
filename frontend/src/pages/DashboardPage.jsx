import DashboardCard from '../components/DashboardCard'
import './DashboardPage.css'

const kpiTitles = [
  'Active Orders',
  'Monthly Revenue',
  'Inventory Value',
  'Low Stock Items',
]

function DashboardPage() {
  return (
    <section className="dashboard-page">
      <div className="row g-3 mb-4">
        {kpiTitles.map((title) => (
          <div key={title} className="col-3">
            <DashboardCard title={title} />
          </div>
        ))}
      </div>

      <div className="row g-3">
        <div className="col-7">
          <article className="dashboard-block p-3">
            <h2 className="mb-2">Recent Activity</h2>
            <p className="mb-0">Activity feed placeholder.</p>
          </article>
        </div>

        <div className="col-5">
          <article className="dashboard-block p-3">
            <h2 className="mb-3">Ready for Pickup</h2>
            <p className="mb-1">Ahmed Khan</p>
            <p className="mb-0">Suit</p>
          </article>
        </div>
      </div>
    </section>
  )
}

export default DashboardPage
