import SettingsForm from '../components/settings/SettingsForm'
import './SettingsPage.css'

function SettingsPage() {
  return (
    <section className="settings-page">
      <div className="mb-4">
        <h1 className="mb-1">Settings</h1>
      </div>

      <SettingsForm />
    </section>
  )
}

export default SettingsPage
