import './ReportCard.css'

function ReportCard({ title }) {
  return (
    <article className="report-card p-3">
      <h3 className="mb-0">{title}</h3>
    </article>
  )
}

export default ReportCard
