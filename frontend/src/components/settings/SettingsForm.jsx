import { useEffect, useState } from 'react'
import SettingsSection from './SettingsSection'
import './SettingsForm.css'

const defaultSettings = {
  shopName: 'DarziDesk',
  ownerName: '',
  phone: '',
  email: '',
  address: '',
}

function SettingsForm() {
  const [settings, setSettings] = useState(defaultSettings)

  useEffect(() => {
    const saved = localStorage.getItem('darzidesk-settings')

    if (saved) {
      setSettings(JSON.parse(saved))
    }
  }, [])

  function handleChange(e) {
    const { name, value } = e.target

    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  function handleSave() {
    localStorage.setItem(
      'darzidesk-settings',
      JSON.stringify(settings)
    )

    alert('Settings saved successfully!')
  }

  return (
    <div className="settings-form-stack">

      <SettingsSection title="Shop Information">

        <div className="row g-3">

          <div className="col-md-6">
            <label className="form-label">
              Shop Name
            </label>

            <input
              className="form-control"
              name="shopName"
              value={settings.shopName}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">
              Owner Name
            </label>

            <input
              className="form-control"
              name="ownerName"
              value={settings.ownerName}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">
              Phone Number
            </label>

            <input
              className="form-control"
              name="phone"
              value={settings.phone}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">
              Email Address
            </label>

            <input
              className="form-control"
              name="email"
              value={settings.email}
              onChange={handleChange}
            />
          </div>

          <div className="col-12">
            <label className="form-label">
              Shop Address
            </label>

            <textarea
              rows="3"
              className="form-control"
              name="address"
              value={settings.address}
              onChange={handleChange}
            />
          </div>

        </div>

      </SettingsSection>

      <div className="text-end mt-4">

        <button
          className="btn settings-save-btn"
          onClick={handleSave}
        >
          Save Settings
        </button>

      </div>

    </div>
  )
}

export default SettingsForm