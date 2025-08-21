// src/components/forms/FormInput.jsx
import { Input } from "antd";

export default function FormInput({
  label,
  value,
  onChange,
  type = "text",
  ...props
}) {
  return (
    <div className="form-control">
      <label className="form-label">{label}</label>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        {...props}
      />
    </div>
  );
}
