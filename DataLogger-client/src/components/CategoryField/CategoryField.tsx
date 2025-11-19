// src/components/CategoryField/CategoryField.tsx
import React from "react";
import "./CategoryField.css";

type CategoryFieldProps = {
  value: string;
  otherValue?: string;
  onChange: (v: string) => void;
  onOtherChange?: (v: string) => void;
};

const CategoryField: React.FC<CategoryFieldProps> = ({ value, otherValue, onChange, onOtherChange }) => {
  return (
    <div className="form-group category-group">
      <label>Category</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="" disabled hidden>
          Choose category
        </option>
        <option value="">-- Select Category --</option>
        <option value="Generic AI">Generic AI</option>
        <option value="Gen AI , Agentic AI">Gen AI , Agentic AI</option>
        <option value="COTS and Integration">COTS and Integration</option>
        <option value="Insurance Core Offerings">Insurance Core Offerings</option>
        <option value="Tech Needs">Tech Needs</option>
        <option value="NA">NA</option>
        <option value="other">Other (type manually)</option>
      </select>

      {value === "other" && (
        <input
          type="text"
          className="other-input"
          placeholder="Type category…"
          value={otherValue ?? ""}
          onChange={(e) => onOtherChange?.(e.target.value)}
        />
      )}
    </div>
  );
};

export default CategoryField;
