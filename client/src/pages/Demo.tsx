// frontend/src/pages/Demo.tsx
import React, { useState } from "react";
import DynamicFormField from "../components/DynamicFormField";
import CategoryField from "../components/CategoryField";
import type { DynamicFieldProps } from "../components/DynamicFormField.types";
import { monthToQuarter } from "../quarter";
import { createProspect } from "../services/ProspectDetailServices";
import "./Demo.css";

type CallKey = "call1" | "call2" | "call3";

type CallSection = {
  checked: boolean;
  notes: string;
};

type FormValues = {
  month: string;
  quarter: string;
  prospect: string;
  geo: string;
  lob: string;

  call1: CallSection;
  call2: CallSection;
  call3: CallSection;

  coreOfferings: string;
  primaryNeed: string;
  secondaryNeed: string;

  category: string;
  categoryOther?: string;

  trace: string;
  salesSpoc: string;
  oppId: string;
  oppDetails: string;

  deck: string;
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

    category: "",
    categoryOther: "",

    trace: "",
    salesSpoc: "",
    oppId: "AUTO-GENERATED",
    oppDetails: "Generated automatically",

    deck: "",
    rag: "",
    remark: "",
  });

  // ----------------- Helpers -----------------
  const updateValue = (name: keyof FormValues, value: string | CallSection) => {
    setValues((prev) => ({
      ...prev,
      [name]: name === "category" && Array.isArray(value) ? value[0] : value,
      ...(name === "month" && { quarter: monthToQuarter(value as string) }),
    }));
  };

  const updateCheckbox = (key: CallKey, checked: boolean) => {
    setValues((prev) => ({ ...prev, [key]: { ...prev[key], checked } }));
  };

  const updateNotes = (key: CallKey, notes: string) => {
    setValues((prev) => ({ ...prev, [key]: { ...prev[key], notes } }));
  };

  // ----------------- Dynamic Fields -----------------
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
    { type: "text", name: "quarter", label: "Quarter", value: values.quarter, disabled: true },
    { type: "text", name: "prospect", label: "Prospect", value: values.prospect, onChange: (v) => updateValue("prospect", v) },
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
    // Calls
    {
      type: "checkbox-with-text",
      name: "call1",
      label: "Call 1 - Discovery",
      checked: values.call1.checked,
      textField: { name: "call1_notes", value: values.call1.notes },
      onChange: (v) => updateCheckbox("call1", v),
      onTextFieldChange: (v) => updateNotes("call1", v),
    },
    {
      type: "checkbox-with-text",
      name: "call2",
      label: "Call 2 - Solutions",
      checked: values.call2.checked,
      textField: { name: "call2_notes", value: values.call2.notes },
      onChange: (v) => updateCheckbox("call2", v),
      onTextFieldChange: (v) => updateNotes("call2", v),
    },
    {
      type: "checkbox-with-text",
      name: "call3",
      label: "Call 3 - POC/Proposal",
      checked: values.call3.checked,
      textField: { name: "call3_notes", value: values.call3.notes },
      onChange: (v) => updateCheckbox("call3", v),
      onTextFieldChange: (v) => updateNotes("call3", v),
    },
    // Offerings
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
    { type: "text", name: "primaryNeed", label: "Primary Need", value: values.primaryNeed, onChange: (v) => updateValue("primaryNeed", v) },
    { type: "text", name: "secondaryNeed", label: "Secondary Need", value: values.secondaryNeed, onChange: (v) => updateValue("secondaryNeed", v) },
    { type: "empty", name: "space1" },
    { type: "textarea", name: "trace", label: "Trace", value: values.trace, className: "full", onChange: (v) => updateValue("trace", v) },
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
    { type: "textarea", name: "oppDetails", label: "Opportunity Details", value: values.oppDetails, disabled: true, className: "full" },
    { type: "file", name: "deck", label: "Deck", value: values.deck, onChange: (v) => updateValue("deck", v), onFileSelect: (f) => setFile(f) },
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
    { type: "empty", name: "space2" },
    { type: "empty", name: "space3" },
    { type: "text", name: "remark", label: "Remarks", value: values.remark, className: "full", onChange: (v) => updateValue("remark", v) },
  ];

  // ----------------- Submit -----------------
  const handleSubmit = async () => {
    const fd = new FormData();

    if (file) fd.append("deck", file);

    // Append all string fields
    Object.entries(values).forEach(([k, v]) => {
      if (typeof v === "string") fd.append(k, v);
    });

    // Append calls
    ["call1", "call2", "call3"].forEach((c) => {
      const key = c as CallKey;
      fd.append(`${c}_checked`, String(values[key].checked));
      fd.append(`${c}_notes`, values[key].notes);
    });

    // Append category as string only
    fd.append(
      "category",
      values.category === "other" ? values.categoryOther ?? "" : values.category
    );

    try {
      await createProspect(fd);
      alert("Successfully Submitted!");
      setValues((prev) => ({
        ...prev,
        prospect: "",
        remark: "",
        category: "",
        categoryOther: "",
      }));
      setFile(null);
    } catch (err) {
      console.error(err);
      alert("Error submitting form");
    }
  };

  return (
    <div className="demo-wrapper">
      <main className="content-area">
        <h1 className="header">Prospect Entry Form</h1>

        <div className="form-grid">
          {fields.map((f) => (
            <DynamicFormField key={f.name} {...f} />
          ))}

          {/* Category Field */}
          <CategoryField
            value={values.category}
            otherValue={values.categoryOther}
            onChange={(v: string) => updateValue("category", v)}
            onOtherChange={(v: string) => updateValue("categoryOther", v)}
          />

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
