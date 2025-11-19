// src/components/DynamicFormField/DynamicFormField.tsx
import React from "react";
import type { DynamicFieldProps } from "./DynamicFormField.types";
import "./DynamicFormField.css";

const DynamicFormField: React.FC<DynamicFieldProps> = (props) => {
  switch (props.type) {
    case "text": {
      return (
        <div className={`form-group ${props.className || ""}`}>
          {props.label && <label>{props.label}</label>}
          <input
            type="text"
            value={props.value ?? ""}
            onChange={(e) => props.onChange?.(e.target.value)}
            disabled={props.disabled}
            placeholder={props.placeholder ?? ""}
          />
        </div>
      );
    }

    case "textarea": {
      return (
        <div className={`form-group ${props.className || ""}`}>
          {props.label && <label>{props.label}</label>}
          <textarea
            rows={props.rows ?? 3}
            value={props.value ?? ""}
            onChange={(e) => props.onChange?.(e.target.value)}
            disabled={props.disabled}
          />
        </div>
      );
    }

    case "select": {
      return (
        <div className={`form-group ${props.className || ""}`}>
          {props.label && <label>{props.label}</label>}
          <select
            value={props.value ?? ""}
            onChange={(e) => props.onChange?.(e.target.value)}
            disabled={props.disabled}
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

    case "combobox": {
      return (
        <div className={`form-group ${props.className || ""}`}>
          {props.label && <label>{props.label}</label>}

          <input
            list={`${props.name}-list`}
            value={props.value ?? ""}
            disabled={props.disabled}
            placeholder="Select or type"
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

    case "file": {
      return (
        <div className={`form-group ${props.className || ""}`}>
          {props.label && <label>{props.label}</label>}
          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                props.onFileSelect?.(file);
                props.onChange?.(file.name);
              }
            }}
          />
        </div>
      );
    }

    case "checkbox-with-text": {
      return (
        <div className={`form-group ${props.className || ""}`}>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={props.checked}
              onChange={(e) => props.onChange?.(e.target.checked)}
            />
            <span>{props.label}</span>
          </label>

          {props.checked && (
            <input
              type="text"
              value={props.textField.value}
              onChange={(e) => props.onTextFieldChange?.(e.target.value)}
              placeholder={props.textField.placeholder ?? ""}
            />
          )}
        </div>
      );
    }

    case "empty":
      return <div className={`form-group ${props.className || ""}`} />;

    case "custom":
      return <div className={`form-group custom-field`}>{props.render}</div>;

    default:
      return null;
  }
};

export default DynamicFormField;
