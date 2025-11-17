import React, { useState } from "react";
import DynamicFormField from "../components/DynamicFormField";
import type { DynamicFieldProps } from "../components/DynamicFormField.types";
import { monthToQuarter } from "../quarter";
import { createProspect } from "../services/ProspectDetailServices";
import "./Demo.css";

type CallKey = "call1" | "call2" | "call3";

type FormValues = {
  month: string;
  quarter: string;
  prospect: string;
  geo: string;
  lob: string;

  call1: { checked: boolean; notes: string };
  call2: { checked: boolean; notes: string };
  call3: { checked: boolean; notes: string };

  coreOfferings: string;
  primaryNeed: string;
  secondaryNeed: string;
  trace: string;
  salesSpoc: string;

  oppId: string;
  oppDetails: string;

  deck: string; // file name only
  rag: string;
  remark: string;
};

const Demo: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const [values, setValues] = useState<FormValues>({
    month: "",
    quarter: "",
    prospect: "",
    geo: "",
    lob: "",

    call1: { checked: false, notes: "" },
    call2: { checked: false, notes: "" },
    call3: { checked: false, notes: "" },

    coreOfferings: "",
    primaryNeed: "",
    secondaryNeed: "",
    trace: "",
    salesSpoc: "",

    oppId: "AUTO-GENERATED",
    oppDetails: "System generated details",

    deck: "",
    rag: "",
    remark: "",
  });

  const updateValue = (name: keyof FormValues, value: string) => {
    setValues((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "month" && { quarter: monthToQuarter(value) }),
    }));
  };

  const updateCheckbox = (call: CallKey, checked: boolean) => {
    setValues((prev) => ({
      ...prev,
      [call]: { ...prev[call], checked },
    }));
  };

  const updateCheckboxText = (call: CallKey, notes: string) => {
    setValues((prev) => ({
      ...prev,
      [call]: { ...prev[call], notes },
    }));
  };

  const callFields = [
    { name: "call1", label: "Call 1 - Discovery / Solutions" },
    { name: "call2", label: "Call 2 - Solutions / Offerings" },
    { name: "call3", label: "Call 3 - POC / Proposal" },
  ] as const;

  const fields: DynamicFieldProps[] = [
    {
      type: "select",
      name: "month",
      label: "Month",
      value: values.month,
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
      onChange: (v) => updateValue("month", v),
    },
    {
      type: "text",
      name: "quarter",
      label: "Quarter",
      value: values.quarter,
      disabled: true,
    },
    {
      type: "text",
      name: "prospect",
      label: "Prospect",
      value: values.prospect,
      placeholder: "Enter prospect name",
      onChange: (v) => updateValue("prospect", v),
    },
    {
      type: "select",
      name: "geo",
      label: "Geo",
      value: values.geo,
      options: [
        { label: "APAC", value: "apac" },
        { label: "EMEA", value: "emea" },
        { label: "USA", value: "usa" },
        { label: "India", value: "india" },
      ],
      onChange: (v) => updateValue("geo", v),
    },
    {
      type: "select",
      name: "lob",
      label: "LOB",
      value: values.lob,
      options: [
        { label: "Life Insurance", value: "life" },
        { label: "Health", value: "health" },
        { label: "General Insurance", value: "general" },
        { label: "Pension", value: "pension" },
      ],
      onChange: (v) => updateValue("lob", v),
    },
    {
      type: "select",
      name: "coreOfferings",
      label: "Core Offerings",
      value: values.coreOfferings,
      options: [
        { label: "Product Development", value: "productDev" },
        { label: "Testing", value: "testing" },
        { label: "Cloud Migration", value: "cloud" },
        { label: "Support", value: "support" },
        { label: "Consulting", value: "consulting" },
      ],
      onChange: (v) => updateValue("coreOfferings", v),
    },
    {
      type: "text",
      name: "primaryNeed",
      label: "Primary Need",
      value: values.primaryNeed,
      placeholder: "Enter primary need",
      onChange: (v) => updateValue("primaryNeed", v),
    },
    {
      type: "text",
      name: "secondaryNeed",
      label: "Secondary Need",
      value: values.secondaryNeed,
      placeholder: "Enter secondary need",
      onChange: (v) => updateValue("secondaryNeed", v),
    },
    {
      type: "textarea",
      name: "trace",
      label: "Trace",
      value: values.trace,
      placeholder: "Enter trace",
      onChange: (v) => updateValue("trace", v),
      className: "full",
    },
    {
      type: "select",
      name: "salesSpoc",
      label: "Sales SPOC",
      value: values.salesSpoc,
      options: [
        { label: "Sanjay", value: "sanjay" },
        { label: "Rahul", value: "rahul" },
        { label: "Priya", value: "priya" },
        { label: "Arun", value: "arun" },
      ],
      onChange: (v) => updateValue("salesSpoc", v),
    },
    { type: "text", name: "oppId", label: "Opportunity ID", value: values.oppId, disabled: true },
    {
      type: "textarea",
      name: "oppDetails",
      label: "Opportunity Details",
      value: values.oppDetails,
      disabled: true,
      className: "full",
    },
    {
      type: "file",
      name: "deck",
      label: "Deck",
      value: values.deck,
      onChange: (name) => updateValue("deck", name),
      onFileSelect: (selectedFile) => setFile(selectedFile),
    },
    {
      type: "select",
      name: "rag",
      label: "RAG",
      value: values.rag,
      options: [
        { label: "Red", value: "red" },
        { label: "Amber", value: "amber" },
        { label: "Green", value: "green" },
      ],
      onChange: (v) => updateValue("rag", v),
    },
    {
      type: "text",
      name: "remark",
      label: "Remarks",
      value: values.remark,
      placeholder: "Enter remarks",
      onChange: (v) => updateValue("remark", v),
      className: "full",
    },
  ];

  const handleSubmit = async () => {
    const formData = new FormData();
if (file) formData.append("deck", file);


    Object.entries(values).forEach(([key, val]) => {
      if (typeof val === "string") {
        formData.append(key, val);
      }
    });

    // Append call stages
    formData.append("call1_checked", String(values.call1.checked));
    formData.append("call1_notes", values.call1.notes);
    formData.append("call2_checked", String(values.call2.checked));
    formData.append("call2_notes", values.call2.notes);
    formData.append("call3_checked", String(values.call3.checked));
    formData.append("call3_notes", values.call3.notes);

    try {
      await createProspect(formData);
      alert("Form Submitted Successfully!");
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="demo-wrapper">
      <main className="content-area">
        <div className="header">
          <h1>Prospect Entry Form</h1>
        </div>

        <div className="form-grid">
          {fields.map((field) => (
            <DynamicFormField key={field.name} {...field} />
          ))}

          <div className="call-section full">
            <h3 className="call-title">Call Stages</h3>
            {callFields.map((c) => (
              <div className="call-row" key={c.name}>
                <label className="call-label">{c.label}</label>
                <input
                  type="checkbox"
                  checked={values[c.name].checked}
                  onChange={(e) => updateCheckbox(c.name, e.target.checked)}
                />
                <input
                  type="text"
                  className="call-notes"
                  placeholder="Enter notes"
                  value={values[c.name].notes}
                  onChange={(e) => updateCheckboxText(c.name, e.target.value)}
                />
              </div>
            ))}
          </div>

          <div className="button-row full">
            <button className="submit-btn" onClick={handleSubmit}>
              Submit Prospect
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Demo;
