import React, { useState } from "react";
import DynamicFormField from "../components/DynamicFormField";
import type { DynamicFieldProps } from "../components/DynamicFormField";
import { monthToQuarter } from "../quarter";
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

  deck: string;
  rag: string;
  remark: string;
};

const Demo: React.FC = () => {
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

  const callFields: { name: CallKey; label: string; checked: boolean; notes: string }[] = [
    { name: "call1", label: "Call 1 - Discovery / Solutions", checked: values.call1.checked, notes: values.call1.notes },
    { name: "call2", label: "Call 2 - Solutions / Offerings", checked: values.call2.checked, notes: values.call2.notes },
    { name: "call3", label: "Call 3 - POC/Proposal", checked: values.call3.checked, notes: values.call3.notes },
  ];

  const fields: DynamicFieldProps[] = [
    { type: "select", name: "month", label: "Month", value: values.month,
      options: [
        { label: "January", value: "jan" }, { label: "February", value: "feb" },
        { label: "March", value: "mar" }, { label: "April", value: "apr" },
        { label: "May", value: "may" }, { label: "June", value: "jun" },
        { label: "July", value: "jul" }, { label: "August", value: "aug" },
        { label: "September", value: "sep" }, { label: "October", value: "oct" },
        { label: "November", value: "nov" }, { label: "December", value: "dec" },
      ],
      onChange: (v) => updateValue("month", v)
    },
    { type: "text", name: "quarter", label: "Quarter", value: values.quarter, disabled: true },
    { type: "text", name: "prospect", label: "Prospect", value: values.prospect, placeholder: "Enter prospect name", onChange: (v) => updateValue("prospect", v) },
    { type: "select", name: "geo", label: "Geo", value: values.geo,
      options: [
        { label: "APAC", value: "apac" },
        { label: "EMEA", value: "emea" },
        { label: "USA", value: "usa" },
        { label: "India", value: "india" },
      ],
      onChange: (v) => updateValue("geo", v)
    },
    { type: "select", name: "lob", label: "LOB", value: values.lob,
      options: [
        { label: "Life Insurance", value: "life" },
        { label: "Health", value: "health" },
        { label: "General Insurance", value: "general" },
        { label: "Pension", value: "pension" },
      ],
      onChange: (v) => updateValue("lob", v)
    },
    { type: "select", name: "coreOfferings", label: "Core Offerings", value: values.coreOfferings,
      options: [
        { label: "Product Development", value: "productDev" },
        { label: "Testing", value: "testing" },
        { label: "Cloud Migration", value: "cloud" },
        { label: "Support", value: "support" },
        { label: "Consulting", value: "consulting" },
      ],
      onChange: (v) => updateValue("coreOfferings", v)
    },
    { type: "text", name: "primaryNeed", label: "Primary Need", value: values.primaryNeed, placeholder: "Enter primary need", onChange: (v) => updateValue("primaryNeed", v) },
    { type: "text", name: "secondaryNeed", label: "Secondary Need", value: values.secondaryNeed, placeholder: "Enter secondary need", onChange: (v) => updateValue("secondaryNeed", v) },
{ 
  type: "textarea",  // changed from "text" to "textarea"
  name: "trace", 
  label: "Trace",
  value: values.trace, 
  placeholder: "Enter trace", 
  onChange: (v) => updateValue("trace", v),
  className: "full"   // make it span full width
},
    { type: "select", name: "salesSpoc", label: "Sales SPOC", value: values.salesSpoc,
      options: [
        { label: "Sanjay", value: "sanjay" },
        { label: "Rahul", value: "rahul" },
        { label: "Priya", value: "priya" },
        { label: "Arun", value: "arun" },
      ],
      onChange: (v) => updateValue("salesSpoc", v)
    },
    { type: "text", name: "oppId", label: "Opportunity ID", value: values.oppId, disabled: true },
    { type: "textarea", name: "oppDetails", label: "Opportunity Status", value: values.oppDetails, disabled: true },
    { type: "file", name: "deck", label: "Deck", value: values.deck, onChange: (v) => updateValue("deck", v) },
    { type: "select", name: "rag", label: "RAG", value: values.rag,
      options: [
        { label: "Red", value: "red" },
        { label: "Amber", value: "amber" },
        { label: "Green", value: "green" },
      ],
      onChange: (v) => updateValue("rag", v)
    },
    { type: "text", name: "remark", label: "Remarks", value: values.remark, placeholder: "Enter remarks", onChange: (v) => updateValue("remark", v) }
  ];

  return (
    <div className="app-container">
      <div className="demo-card">
        <h1>Basic Data</h1>
        <div className="form-grid">
          {fields.slice(0,5).map(f => <DynamicFormField key={f.name} {...f} />)}
          
          {/* Calls Section */}
          <div className="section-card">
            {callFields.map(c => (
              <DynamicFormField
                key={c.name}
                type="checkbox-with-text"
                label={c.label}
                name={c.name}
                checked={c.checked}
                textField={{
                  name: `${c.name}-notes`,
                  value: c.notes,
                  placeholder: `Notes for ${c.label.split(" -")[0]}`
                }}
                onChange={(checked) => updateCheckbox(c.name, checked)}
                onTextFieldChange={(_, value) => updateCheckboxText(c.name, value)}
              />
            ))}
          </div>

          {fields.slice(5).map(f => {
            if(f.name === "oppDetails" || f.name === "remark") return <DynamicFormField key={f.name} {...f} className="full" />;
            return <DynamicFormField key={f.name} {...f} />
          })}
        </div>
        <div className="form-actions">
          <button className="primary">Submit</button>
          <button className="ghost">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Demo;
