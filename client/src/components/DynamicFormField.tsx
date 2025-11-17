// frontend/src/components/DynamicFormField.tsx
import React from "react";
import type { ChangeEvent } from "react";
import type { DynamicFieldProps } from "./DynamicFormField.types";
import "./DynamicFormField.css";

const DynamicFormField: React.FC<DynamicFieldProps> = (props) => {
  const groupClass = `form-group ${props.className ?? ""}`;

  // EMPTY CELL
  if (props.type === "empty") {
    return <div className="form-group empty-cell" />;
  }

  // TEXT FIELD
  if (props.type === "text") {
    return (
      <div className={groupClass}>
        <label>{props.label}</label>
        <input
          type="text"
          value={props.value ?? ""}
          placeholder={props.placeholder}
          disabled={props.disabled}
          onChange={(e) => props.onChange?.(e.target.value)}
        />
      </div>
    );
  }

  // TEXTAREA
  if (props.type === "textarea") {
    return (
      <div className={groupClass}>
        <label>{props.label}</label>
        <textarea
          rows={props.rows ?? 4}
          value={props.value ?? ""}
          placeholder={props.placeholder}
          disabled={props.disabled}
          onChange={(e) => props.onChange?.(e.target.value)}
        />
      </div>
    );
  }

  // SELECT DROPDOWN
  if (props.type === "select") {
    return (
      <div className={groupClass}>
        <label>{props.label}</label>
        <select
          value={props.value ?? ""}
          disabled={props.disabled}
          onChange={(e) => props.onChange?.(e.target.value)}
        >
          <option value="">-- Select --</option>
          {props.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  // COMBOBOX
  if (props.type === "combobox") {
    return (
      <div className={groupClass}>
        <label>{props.label}</label>
        <input
          list={`${props.name}-list`}
          value={props.value ?? ""}
          placeholder="Select or type"
          disabled={props.disabled}
          onChange={(e) => props.onChange?.(e.target.value)}
        />
        <datalist id={`${props.name}-list`}>
          {props.options?.map((o) => (
            <option key={o} value={o} />
          ))}
        </datalist>
      </div>
    );
  }

  // FILE UPLOAD
  if (props.type === "file") {
    return (
      <div className={groupClass}>
        <label>{props.label}</label>
        <input
          type="file"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) {
              props.onChange?.(file.name);
              props.onFileSelect?.(file);
            }
          }}
        />
      </div>
    );
  }

  // CHECKBOX WITH TEXT
  if (props.type === "checkbox-with-text") {
    return (
      <div className={`checkbox-row ${props.className ?? ""}`}>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={props.checked}
            onChange={(e) => props.onChange?.(e.target.checked)}
            className="thick-checkbox"
          />
          <span>{props.label}</span>
        </label>

        {props.checked && (
          <input
            type="text"
            value={props.textField.value}
            className="checkbox-note"
            placeholder={props.textField.placeholder}
            onChange={(e) => props.onTextFieldChange?.(e.target.value)}
          />
        )}
      </div>
    );
  }

  return null;
};

export default DynamicFormField;
