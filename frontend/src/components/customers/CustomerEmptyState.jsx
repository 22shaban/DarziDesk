import { FiInbox } from 'react-icons/fi'
import './CustomerEmptyState.css'

function CustomerEmptyState({ title, message }) {
  return (
    <div className="customer-empty-state py-5 text-center">
      <div className="customer-empty-icon mx-auto mb-3">
        <FiInbox />
      </div>
      <h3 className="mb-2">{title}</h3>
      <p className="mb-0">{message}</p>
    </div>
  )
}

export default CustomerEmptyState
