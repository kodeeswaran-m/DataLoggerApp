import React, {  type ChangeEvent } from "react";

export type BaseFieldProps<T> = {
  label: string;
  name: string;
  value?: T;
  required?: boolean;
  disabled?: boolean;
  className?: string;
};

export type TextFieldProps = BaseFieldProps<string> & {
  type: "text";
  placeholder?: string;
  onChange?: (value: string) => void;
};

export type TextAreaFieldProps = BaseFieldProps<string> & {
  type: "textarea";
  placeholder?: string;
  rows?: number;
  onChange?: (value: string) => void;
};

export type SelectFieldProps = BaseFieldProps<string> & {
  type: "select";
  options: { label: string; value: string }[];
  onChange?: (value: string) => void;
};

export type ComboBoxFieldProps = BaseFieldProps<string> & {
  type: "combobox";
  options: string[];
  onChange?: (value: string) => void;
};

export type FileFieldProps = BaseFieldProps<string> & {
  type: "file";
  onChange?: (fileName: string) => void;
};

export type CheckboxWithTextProps = BaseFieldProps<boolean> & {
  type: "checkbox-with-text";
  checked: boolean;
  textField: {
    name: string;
    value: string;
    placeholder?: string;
  };
  onChange?: (checked: boolean) => void;
  onTextFieldChange?: (name: string, value: string) => void;
};

export type DynamicFieldProps =
  | TextFieldProps
  | TextAreaFieldProps
  | SelectFieldProps
  | ComboBoxFieldProps
  | FileFieldProps
  | CheckboxWithTextProps;

const DynamicFormField: React.FC<DynamicFieldProps> = (props) => {
  const groupClass = `form-group ${props.className ?? ""}`;

  if (props.type === "text") {
    return (
      <div className={groupClass}>
        <label htmlFor={props.name}>{props.label}</label>
        <input
          id={props.name}
          name={props.name}
          type="text"
          value={props.value ?? ""}
          placeholder={props.placeholder}
          disabled={props.disabled}
          required={props.required}
          onChange={(e) => props.onChange?.(e.target.value)}
        />
      </div>
    );
  }

  if (props.type === "textarea") {
    return (
      <div className={groupClass}>
        <label htmlFor={props.name}>{props.label}</label>
        <textarea
          id={props.name}
          name={props.name}
          value={props.value ?? ""}
          placeholder={props.placeholder}
          rows={props.rows ?? 4}
          disabled={props.disabled}
          onChange={(e) => props.onChange?.(e.target.value)}
        />
      </div>
    );
  }

  if (props.type === "select") {
    return (
      <div className={groupClass}>
        <label htmlFor={props.name}>{props.label}</label>
        <select
          id={props.name}
          name={props.name}
          value={props.value ?? ""}
          disabled={props.disabled}
          onChange={(e) => props.onChange?.(e.target.value)}
        >
          <option value="">-- Select --</option>
          {props.options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (props.type === "file") {
    return (
      <div className={groupClass}>
        <label htmlFor={props.name}>{props.label}</label>
        <input
          id={props.name}
          name={props.name}
          type="file"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0] ?? null;
            props.onChange?.(file ? file.name : "");
          }}
        />
      </div>
    );
  }

  if (props.type === "checkbox-with-text") {
    return (
      <div className={`checkbox-row ${props.className ?? ""}`}>
        <input
          type="checkbox"
          checked={props.checked}
          disabled={props.disabled}
          onChange={(e) => props.onChange?.(e.target.checked)}
        />
        <label>{props.label}</label>
        {props.checked && (
          <input
            type="text"
            placeholder={props.textField.placeholder}
            value={props.textField.value}
            onChange={(e) =>
              props.onTextFieldChange?.(props.textField.name, e.target.value)
            }
            className="checkbox-note"
          />
        )}
      </div>
    );
  }

  return null;
};

export default DynamicFormField;
