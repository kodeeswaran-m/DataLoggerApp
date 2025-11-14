import React, { useState, type ChangeEvent } from "react";

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
  const [showOptions, setShowOptions] = useState(false);

  const groupClass = `form-group ${props.className ?? ""}`;

  // TEXT
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

  // TEXTAREA
  if (props.type === "textarea") {
    return (
      <div className={groupClass}>
        <label htmlFor={props.name}>{props.label}</label>
        <textarea
          id={props.name}
          name={props.name}
          value={props.value ?? ""}
          placeholder={props.placeholder}
          rows={(props as TextAreaFieldProps).rows ?? 4}
          disabled={props.disabled}
          onChange={(e) => props.onChange?.(e.target.value)}
        />
      </div>
    );
  }

  // SELECT
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
          {(props as SelectFieldProps).options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  // COMBOBOX
  if (props.type === "combobox") {
    const comboProps = props as ComboBoxFieldProps;
    return (
      <div className={groupClass} style={{ position: "relative" }}>
        <label htmlFor={props.name}>{props.label}</label>
        <input
          id={props.name}
          name={props.name}
          type="text"
          autoComplete="off"
          value={props.value ?? ""}
          disabled={props.disabled}
          onFocus={() => setShowOptions(true)}
          onBlur={() => setTimeout(() => setShowOptions(false), 200)}
          onChange={(e) => comboProps.onChange?.(e.target.value)}
        />
        {showOptions && (
          <div className="combo-options">
            {comboProps.options
              .filter((opt) =>
                opt.toLowerCase().includes((props.value ?? "").toLowerCase())
              )
              .map((opt) => (
                <div key={opt} className="combo-item" onMouseDown={() => comboProps.onChange?.(opt)}>
                  {opt}
                </div>
              ))}
          </div>
        )}
      </div>
    );
  }

  // FILE
  if (props.type === "file") {
    const fileProps = props as FileFieldProps;
    return (
      <div className={groupClass}>
        <label htmlFor={props.name}>{props.label}</label>
        <input
          id={props.name}
          name={props.name}
          type="file"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0] ?? null;
            fileProps.onChange?.(file ? file.name : "");
          }}
        />
      </div>
    );
  }

  // CHECKBOX WITH TEXT
  if (props.type === "checkbox-with-text") {
    const cbProps = props as CheckboxWithTextProps;
    return (
      <div className={groupClass}>
        <label>
          <input
            type="checkbox"
            checked={cbProps.checked}
            disabled={cbProps.disabled}
            onChange={(e) => cbProps.onChange?.(e.target.checked)}
          />{" "}
          {cbProps.label}
        </label>

        {cbProps.checked && (
          <div className="checkbox-text-wrapper">
            <label htmlFor={cbProps.textField.name}>{cbProps.textField.name}</label>
            <input
              id={cbProps.textField.name}
              name={cbProps.textField.name}
              type="text"
              placeholder={cbProps.textField.placeholder}
              value={cbProps.textField.value}
              onChange={(e) => cbProps.onTextFieldChange?.(cbProps.textField.name, e.target.value)}
            />
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default DynamicFormField;
