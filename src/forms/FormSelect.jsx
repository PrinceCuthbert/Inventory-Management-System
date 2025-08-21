// src/components/forms/FormSelect.jsx
import { Select } from "antd";

export default function FormSelect({ label, value, onChange, options }) {
  return (
    <div className="form-control">
      <label className="form-label">{label}</label>
      <Select
        value={value}
        style={{ width: "100%" }}
        onChange={onChange}
        options={options} // ✅ don’t re-map
      />
    </div>
  );
}
