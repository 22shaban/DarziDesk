import SettingsSection from './SettingsSection'
import './SettingsForm.css'

const settingsSections = [
  {
    title: 'Shop Information',
    fields: [
      { label: 'Shop Name', type: 'text', placeholder: 'DarziDesk' },
      { label: 'Business Phone', type: 'text', placeholder: '+92 300 1234567' },
    ],
  },
  {
    title: 'Owner Profile',
    fields: [
      { label: 'Owner Name', type: 'text', placeholder: 'Owner Name' },
      { label: 'Email Address', type: 'email', placeholder: 'owner@example.com' },
    ],
  },
  {
    title: 'Notification Preferences',
    fields: [
      { label: 'Order Alerts', type: 'text', placeholder: 'Enabled' },
      { label: 'Invoice Alerts', type: 'text', placeholder: 'Enabled' },
    ],
  },
  {
    title: 'Email Settings',
    fields: [
      { label: 'SMTP Host', type: 'text', placeholder: 'smtp.example.com' },
      { label: 'SMTP Port', type: 'text', placeholder: '587' },
    ],
  },
  {
    title: 'SMS Settings',
    fields: [
      { label: 'Provider', type: 'text', placeholder: 'SMS Provider' },
      { label: 'Sender ID', type: 'text', placeholder: 'DarziDesk' },
    ],
  },
  {
    title: 'Backup & Restore',
    fields: [
      { label: 'Backup Frequency', type: 'text', placeholder: 'Daily' },
      { label: 'Restore Point', type: 'text', placeholder: 'Select restore point' },
    ],
  },
]

function SettingsForm() {
  return (
    <div className="settings-form-stack">
      {settingsSections.map((section) => (
        <SettingsSection key={section.title} title={section.title}>
          <div className="row g-3">
            {section.fields.map((field) => (
              <div key={field.label} className="col-6">
                <label className="form-label settings-field-label">{field.label}</label>
                <input
                  type={field.type}
                  className="form-control settings-field-input"
                  placeholder={field.placeholder}
                />
              </div>
            ))}
          </div>
        </SettingsSection>
      ))}

      <div className="text-end mt-4">
        <button type="button" className="btn settings-save-btn">
          Save Changes
        </button>
      </div>
    </div>
  )
}

export default SettingsForm
