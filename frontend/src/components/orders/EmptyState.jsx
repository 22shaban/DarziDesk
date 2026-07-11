import { FiInbox } from 'react-icons/fi'
import './EmptyState.css'

function EmptyState({ title, message }) {
  return (
    <div className="orders-empty-state py-5 text-center">
      <div className="orders-empty-icon mx-auto mb-3">
        <FiInbox />
      </div>
      <h3 className="mb-2">{title}</h3>
      <p className="mb-0">{message}</p>
    </div>
  )
}

export default EmptyState
