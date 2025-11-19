// src/components/DynamicFormField/DynamicFormField.types.ts
import React from "react";

export type BaseFieldProps<T> = {
  label?: string;
  name: string;
  value?: T;
  required?: boolean;
  disabled?: boolean;
  className?: string;
};

/* --------------------- TEXT FIELD --------------------- */
export type TextFieldProps = BaseFieldProps<string> & {
  type: "text";
  placeholder?: string;
  onChange?: (value: string) => void;
};

/* --------------------- TEXTAREA FIELD --------------------- */
export type TextAreaFieldProps = BaseFieldProps<string> & {
  type: "textarea";
  rows?: number;
  onChange?: (value: string) => void;
};

/* --------------------- SELECT FIELD --------------------- */
export type SelectFieldProps = BaseFieldProps<string> & {
  type: "select";
  options: { label: string; value: string }[];
  onChange?: (value: string) => void;
};

/* --------------------- COMBOBOX FIELD --------------------- */
export type ComboBoxFieldProps = BaseFieldProps<string> & {
  type: "combobox";
  options: string[];
  onChange?: (value: string) => void;
};

/* --------------------- FILE FIELD --------------------- */
export type FileFieldProps = BaseFieldProps<string> & {
  type: "file";
  onChange?: (fileName: string) => void;
  onFileSelect?: (file: File) => void;
};

/* --------------------- CHECKBOX WITH TEXT FIELD --------------------- */
export type CheckboxWithTextProps = BaseFieldProps<boolean> & {
  type: "checkbox-with-text";
  checked: boolean;
  textField: {
    name: string;
    value: string;
    placeholder?: string;
  };
  onChange?: (checked: boolean) => void;
  onTextFieldChange?: (value: string) => void;
};

/* --------------------- EMPTY FIELD --------------------- */
export type EmptyFieldProps = {
  type: "empty";
  name: string;
  className?: string;
};

/* --------------------- CUSTOM FIELD --------------------- */
export type CustomFieldProps = {
  type: "custom";
  name: string;
  className?: string;
  render: React.ReactNode;
};

/* --------------------- UNION OF ALL FIELD TYPES --------------------- */
export type DynamicFieldProps =
  | TextFieldProps
  | TextAreaFieldProps
  | SelectFieldProps
  | ComboBoxFieldProps
  | FileFieldProps
  | CheckboxWithTextProps
  | EmptyFieldProps
  | CustomFieldProps;
