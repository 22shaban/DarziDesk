import { useEffect, useState } from "react";
import SettingsSection from "./SettingsSection";
import { getSettings, updateSettings } from "../../services/settingsApi";
import "./SettingsForm.css";

function SettingsForm() {
  const [formData, setFormData] = useState({
    shopName: "",
    ownerName: "",
    phone: "",
    email: "",
    address: "",
    logoUrl: "",
  });

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      const data = await getSettings();
      setFormData(data);
    } catch (error) {
      console.error(error);
    }
  }

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSave() {
    try {
      await updateSettings(formData);
      alert("Settings saved successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to save settings.");
    }
  }

  return (
    <div className="settings-form-stack">

      <SettingsSection title="Shop Information">

        <div className="row g-3">

          <div className="col-md-6">
            <label className="form-label">Shop Name</label>

            <input
              className="form-control"
              name="shopName"
              value={formData.shopName}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Business Phone</label>

            <input
              className="form-control"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

        </div>

      </SettingsSection>

      <SettingsSection title="Owner Profile">

        <div className="row g-3">

          <div className="col-md-6">
            <label className="form-label">Owner Name</label>

            <input
              className="form-control"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Email</label>

            <input
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

        </div>

      </SettingsSection>

      <SettingsSection title="Business Address">

        <label className="form-label">Address</label>

        <textarea
          className="form-control"
          rows="3"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />

      </SettingsSection>

      <div className="text-end mt-4">

        <button
          className="btn settings-save-btn"
          onClick={handleSave}
        >
          Save Changes
        </button>

      </div>

    </div>
  );
}

export default SettingsForm;