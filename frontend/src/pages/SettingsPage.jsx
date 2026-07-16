import SettingsForm from '../components/settings/SettingsForm'
import './SettingsPage.css'

function SettingsPage() {
  return (
    <section className="settings-page">

      <div className="mb-4">
        <h1 className="mb-1">Settings</h1>

        <p className="text-muted mb-0">
          Configure your tailor shop information and application preferences.
        </p>
      </div>

      <SettingsForm />

    </section>
  )
}

export default SettingsPage