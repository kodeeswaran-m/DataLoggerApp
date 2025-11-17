import type { DynamicFieldProps } from "./DynamicFormField.types";


/**
 * Extended form fields. This is a plain configuration list.
 * Handlers are provided by the consumer (Demo).
 *
 * Note: onChange is optional here (the consumer wires handlers).
 */

export const extendedFormFields: DynamicFieldProps[] = [
  {
    type: "select",
    name: "month",
    label: "Month",
    value: "",
    required: true,
    options: [
      { label: "January", value: "jan" },
      { label: "February", value: "feb" },
      { label: "March", value: "mar" },
      { label: "April", value: "apr" },
      { label: "May", value: "may" },
      { label: "June", value: "jun" },
      { label: "July", value: "jul" },
      { label: "August", value: "aug" },
      { label: "September", value: "sep" },
      { label: "October", value: "oct" },
      { label: "November", value: "nov" },
      { label: "December", value: "dec" },
    ],
  },

  {
    type: "text",
    name: "quarter",
    label: "Quarter",
    placeholder: "Auto-filled",
    disabled: true,
    value: "",
  },

  {
    type: "text",
    name: "prospect",
    label: "Prospect",
    placeholder: "Enter prospect name",
    value: "",
  },

  {
    type: "select",
    name: "geo",
    label: "Geo Location",
    value: "",
    options: [
      { label: "APAC", value: "apac" },
      { label: "EMEA", value: "emea" },
      { label: "USA", value: "usa" },
      { label: "India", value: "india" },
    ],
  },

  {
    type: "select",
    name: "lob",
    label: "LOB",
    value: "",
    options: [
      { label: "Life Insurance", value: "life" },
      { label: "Health", value: "health" },
      { label: "General Insurance", value: "general" },
      { label: "Pension", value: "pension" },
    ],
  },

  {
    type: "checkbox-with-text",
    name: "call1",
    label: "Call 1",
    checked: false,
    textField: { name: "call1Notes", placeholder: "Notes for Call 1", value: "" },
  },

  {
    type: "checkbox-with-text",
    name: "call2",
    label: "Call 2",
    checked: false,
    textField: { name: "call2Notes", placeholder: "Notes for Call 2", value: "" },
  },

  {
    type: "checkbox-with-text",
    name: "call3",
    label: "Call 3",
    checked: false,
    textField: { name: "call3Notes", placeholder: "Notes for Call 3", value: "" },
  },

  {
    type: "select",
    name: "coreOfferings",
    label: "Core Offerings",
    value: "",
    options: [
      { label: "Product Development", value: "productDev" },
      { label: "Testing", value: "testing" },
      { label: "Cloud Migration", value: "cloud" },
      { label: "Support", value: "support" },
      { label: "Consulting", value: "consulting" },
    ],
  },

  {
    type: "text",
    name: "primaryNeed",
    label: "Primary Need",
    placeholder: "Enter primary need",
    value: "",
  },

  {
    type: "text",
    name: "secondaryNeed",
    label: "Secondary Need",
    placeholder: "Enter secondary need",
    value: "",
  },

  {
    type: "select",
    name: "category",
    label: "Category",
    value: "",
    options: [
      { label: "New", value: "new" },
      { label: "Existing", value: "existing" },
      { label: "Upgrade", value: "upgrade" },
    ],
  },

  {
    type: "text",
    name: "trace",
    label: "Trace",
    placeholder: "Enter trace",
    value: "",
  },

  {
    type: "select",
    name: "salesSpoc",
    label: "Sales SPOC",
    value: "",
    options: [
      { label: "Sanjay", value: "sanjay" },
      { label: "Rahul", value: "rahul" },
      { label: "Priya", value: "priya" },
      { label: "Arun", value: "arun" },
    ],
  },

  {
    type: "text",
    name: "oppId",
    label: "Opportunity ID",
    disabled: true,
    value: "AUTO-GENERATED",
  },

  {
    type: "textarea",
    name: "oppDetails",
    label: "Opportunity Details",
    disabled: true,
    value: "System generated details",
  },

  // deck is handled as a file input in Demo
  {
    type: "file",
    name: "deck",
    label: "Upload Deck (file input shown in UI)",
    value: "",
  },

  {
    type: "select",
    name: "rag",
    label: "RAG Status",
    value: "",
    options: [
      { label: "Red", value: "red" },
      { label: "Amber", value: "amber" },
      { label: "Green", value: "green" },
    ],
  },

  {
    type: "text",
    name: "remark",
    label: "Remark",
    placeholder: "Enter remark",
    value: "",
  },
];
