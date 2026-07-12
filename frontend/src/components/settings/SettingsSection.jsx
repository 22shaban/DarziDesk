import './SettingsSection.css'

function SettingsSection({ title, children }) {
  return (
    <section className="settings-section-card p-3">
      <h2 className="mb-3">{title}</h2>
      {children}
    </section>
  )
}

export default SettingsSection
