import React from "react";
import type { ChangeEvent } from "react";
import type { DynamicFieldProps } from "./DynamicFormField.types";

const DynamicFormField: React.FC<DynamicFieldProps> = (props) => {
  const groupClass = `form-group ${props.className ?? ""}`;

  /* ---------------- TEXT INPUT ---------------- */
  if (props.type === "text") {
    return (
      <div className={groupClass}>
        <label htmlFor={props.name}>{props.label}</label>
        <input
          id={props.name}
          type="text"
          value={props.value ?? ""}
          placeholder={props.placeholder}
          disabled={props.disabled}
          onChange={(e) => props.onChange?.(e.target.value)}
        />
      </div>
    );
  }

  /* ---------------- TEXTAREA ---------------- */
  if (props.type === "textarea") {
    return (
      <div className={groupClass}>
        <label>{props.label}</label>
        <textarea
          value={props.value ?? ""}
          rows={props.rows ?? 4}
          placeholder={props.placeholder}
          disabled={props.disabled}
          onChange={(e) => props.onChange?.(e.target.value)}
        />
      </div>
    );
  }

  /* ---------------- SELECT ---------------- */
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
          {props.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  /* ---------------- FILE UPLOAD ---------------- */
  if (props.type === "file") {
    return (
      <div className={groupClass}>
        <label>{props.label}</label>
        <input
          type="file"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0] ?? null;
            if (file) {
              props.onChange?.(file.name);
              props.onFileSelect?.(file);
            }
          }}
        />
      </div>
    );
  }

  /* ---------------- CHECKBOX + TEXT ---------------- */
  if (props.type === "checkbox-with-text") {
    return (
      <div className={`checkbox-row ${props.className ?? ""}`}>
        <input
          type="checkbox"
          checked={props.checked}
          onChange={(e) => props.onChange?.(e.target.checked)}
        />
        <label>{props.label}</label>

        {props.checked && (
          <input
            type="text"
            placeholder={props.textField.placeholder}
            value={props.textField.value}
            className="checkbox-note"
            onChange={(e) => props.onTextFieldChange?.(e.target.value)}
          />
        )}
      </div>
    );
  }

  return null;
};

export default DynamicFormField;
