export type BaseFieldProps<T> = {
  label?: string;
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
  onFileSelect?: (file: File) => void;
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
  onTextFieldChange?: (value: string) => void;
};

export type EmptyFieldProps = {
  type: "empty";
  name: string;
  className?: string;
};

export type DynamicFieldProps =
  | TextFieldProps
  | TextAreaFieldProps
  | SelectFieldProps
  | ComboBoxFieldProps
  | FileFieldProps
  | CheckboxWithTextProps
  | EmptyFieldProps;
