import { useEffect, useState } from "react";
import SettingsSection from "./SettingsSection";
import { getSettings, updateSettings } from "../../services/settingsApi";
import { uploadLogo } from "../../services/uploadApi";
import { useShop } from "../../context/ShopContext";
import "./SettingsForm.css";

function SettingsForm() {
  const { setShop } = useShop();

  const [formData, setFormData] = useState({
    shopName: "",
    ownerName: "",
    phone: "",
    email: "",
    address: "",
    logoUrl: "",
    logoBase64: "",
  });

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      const data = await getSettings();

      setFormData((previous) => ({
        ...previous,
        ...data,
      }));

      setShop((previous) => ({
        ...previous,
        ...data,
      }));
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

  async function handleLogoUpload(event) {
    const file = event.target.files[0];

    if (!file) return;

    try {
      // Convert to Base64 for PDF
      const base64 = await new Promise((resolve) => {
        const reader = new FileReader();

        reader.onloadend = () => resolve(reader.result);

        reader.readAsDataURL(file);
      });

      // Upload original image to S3
      const logoUrl = await uploadLogo(file);

      const updatedShop = {
        ...formData,
        logoUrl,
        logoBase64: base64,
      };

      setFormData(updatedShop);

      setShop(updatedShop);

      alert("Logo uploaded successfully.");
    } catch (error) {
      console.error(error);
      alert("Logo upload failed.");
    }
  }

  async function handleSave() {
    try {
      await updateSettings(formData);

      setShop(formData);

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

        <SettingsSection title="Shop Logo">

          {formData.logoUrl && (
            <div className="mb-3">
              <img
                src={formData.logoUrl}
                alt="Shop Logo"
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "contain",
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  padding: "10px",
                }}
              />
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            className="form-control"
            onChange={handleLogoUpload}
          />

        </SettingsSection>

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