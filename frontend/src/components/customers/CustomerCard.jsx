import './CustomerCard.css'

function CustomerCard({ title, children }) {
  return (
    <article className="customer-card p-3 h-100">
      <h3 className="mb-3">{title}</h3>
      <div>{children}</div>
    </article>
  )
}

export default CustomerCard
