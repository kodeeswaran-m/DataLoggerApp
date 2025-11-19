// frontend/src/pages/ProspectDetailForm.tsx
import React, { useState } from "react";
import "./ProspectDetailForm.css";
import { monthToQuarter } from "../../services/quarter";
import type { DynamicFieldProps } from "../../components/DynamicFormField/DynamicFormField.types";
import CategoryField from "../../components/CategoryField/CategoryField";
import { createProspectDetail } from "../../services/ProspectDetailServices";
import DynamicFormField from "../../components/DynamicFormField/DynamicFormField";

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

const ProspectDetailForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const [values, setValues] = useState<FormValues>({
    month: "January",
    quarter: "Q1",
    prospect: "aaaaaaa",
    geo: "Europe",
    lob: "life",

    call1: { checked: false, notes: "aaaaaaaaaaaaaaa" },
    call2: { checked: false, notes: "" },
    call3: { checked: false, notes: "" },

    coreOfferings: "productDev",
    primaryNeed: "aaaaaaaaaaaaa",
    secondaryNeed: "aaaaaaaaaaaa",

    category: "Generic AI",
    categoryOther: "",

    trace: "aaaaaaaaaaaa",
    salesSpoc: "sanjay",
    oppId: "AUTO-GENERATED",
    oppDetails: "Generated automatically",

    deck: "",
    rag: "",
    remark: "nulllll",
  });

  // ----------------- Helpers -----------------
  const updateValue = (name: keyof FormValues, value: string) => {
    setValues((prev) => {
      const next = { ...prev, [name]: value } as FormValues;
      // if month updated, auto fill quarter
      if (name === "month") {
        next.quarter = monthToQuarter(value);
      }
      return next;
    });
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
        { label: "January", value: "January" },
        { label: "February", value: "February" },
        { label: "March", value: "March" },
        { label: "April", value: "April" },
        { label: "May", value: "May" },
        { label: "June", value: "June" },
        { label: "July", value: "July" },
        { label: "August", value: "August" },
        { label: "September", value: "September" },
        { label: "October", value: "October" },
        { label: "November", value: "November" },
        { label: "December", value: "December" },
      ],
      onChange: (v) => updateValue("month", v),
    },

    // quarter is auto-filled when month changes
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
      onChange: (v) => updateValue("prospect", v),
    },

    {
      type: "select",
      name: "geo",
      label: "Geo",
      value: values.geo,
      options: [
        { label: "APAC", value: "APAC" },
        { label: "Europe", value: "Europe" },
        { label: "USA", value: "USA" },
        { label: "India", value: "India" },
        { label: "South Africa", value: "South Africa" },
        { label: "Oceania", value: "Oceania" },
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

    // Calls — Option A: checkbox toggles notes input visibility
    {
      type: "checkbox-with-text",
      name: "call1",
      label: "Call 1 - Discovery",
      textField: {
        name: "call1_notes",
        value: values.call1.notes,
        placeholder: "Notes for Call 1",
      },
      checked: values.call1.checked,
      onChange: (v) => updateCheckbox("call1", v),
      onTextFieldChange: (v) => updateNotes("call1", v),
    },

    {
      type: "checkbox-with-text",
      name: "call2",
      label: "Call 2 - Solutions",
      textField: {
        name: "call2_notes",
        value: values.call2.notes,
        placeholder: "Notes for Call 2",
      },
      checked: values.call2.checked,
      onChange: (v) => updateCheckbox("call2", v),
      onTextFieldChange: (v) => updateNotes("call2", v),
    },

    {
      type: "checkbox-with-text",
      name: "call3",
      label: "Call 3 - POC/Proposal",
      textField: {
        name: "call3_notes",
        value: values.call3.notes,
        placeholder: "Notes for Call 3",
      },
      checked: values.call3.checked,
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

    {
      type: "text",
      name: "primaryNeed",
      label: "Primary Need",
      value: values.primaryNeed,
      onChange: (v) => updateValue("primaryNeed", v),
    },
    {
      type: "text",
      name: "secondaryNeed",
      label: "Secondary Need",
      value: values.secondaryNeed,
      onChange: (v) => updateValue("secondaryNeed", v),
    },

    // Category inserted immediately after Secondary Need using a `custom` field
    {
      type: "custom",
      name: "categoryField",
      render: (
        <CategoryField
          value={values.category}
          otherValue={values.categoryOther}
          onChange={(v) => updateValue("category", v)}
          onOtherChange={(v) => updateValue("categoryOther", v)}
        />
      ),
    },

    { type: "empty", name: "space1" },
    {
      type: "textarea",
      name: "trace",
      label: "Trace",
      value: values.trace,
      className: "full",
      onChange: (v) => updateValue("trace", v),
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

    // Auto/readonly fields
    {
      type: "text",
      name: "oppId",
      label: "Opportunity ID",
      value: values.oppId,
      disabled: true,
    },
    {
      type: "textarea",
      name: "oppDetails",
      label: "Opportunity Details",
      value: values.oppDetails,
      disabled: true,
      className: "full",
    },

    // Deck upload
    {
      type: "file",
      name: "deck",
      label: "Deck",
      value: values.deck,
      onChange: (v) => updateValue("deck", v),
      onFileSelect: (f) => setFile(f),
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

    { type: "empty", name: "space2" },
    { type: "empty", name: "space3" },
    {
      type: "text",
      name: "remark",
      label: "Remarks",
      value: values.remark,
      className: "full",
      onChange: (v) => updateValue("remark", v),
    },
  ];

  // ----------------- Submit -----------------
  const handleSubmit = async () => {
    try {
      // Basic client-side validation for required fields
      if (!values.month || !values.quarter || !values.prospect) {
        alert(
          "Please fill Month, Quarter (auto), and Prospect before submitting."
        );
        return;
      }

      const fd = new FormData();

      if (file) fd.append("deck", file);

      // Append string fields
      (Object.keys(values) as (keyof FormValues)[]).forEach((k) => {
        const v = values[k];
        // For call sections, we handle separately below
        if (k === "call1" || k === "call2" || k === "call3") return;
        if (typeof v === "string") {
          fd.append(k, v);
        }
      });

      // Append calls individually as backend expects call1_checked and call1_notes
      (["call1", "call2", "call3"] as CallKey[]).forEach((c) => {
        fd.append(`${c}_checked`, String(values[c].checked));
        fd.append(`${c}_notes`, values[c].notes);
      });

      // Category should be a single string — if "other", send the other text
      fd.set(
        "category",
        values.category === "other"
          ? values.categoryOther ?? ""
          : values.category
      );
      console.log("FDDDDDDDDDDD", fd);
      await createProspectDetail(fd);

      alert("Successfully Submitted!");

      // reset a few fields while preserving others (like oppId)
      setValues((prev) => ({
        ...prev,
        prospect: "",
        remark: "",
        category: "",
        categoryOther: "",
        call1: { checked: false, notes: "" },
        call2: { checked: false, notes: "" },
        call3: { checked: false, notes: "" },
      }));

      setFile(null);
    } catch (err) {
      // createProspect should throw AxiosError on 400/500 — log and notify
      // user to check server console for details
      console.error("submit error:", err);
      alert("Error submitting form — see browser console for details.");
    }
  };

  return (
    <div className="demo-wrapper">
      <main className="content-area">
        <h1 className="header">Prospect Entry Form</h1>

        <div className="form-grid">
          {fields.map((f) =>
            f.type === "custom" ? (
              // custom render must have a key
              <div key={f.name}>{f.render}</div>
            ) : (
              // other fields use DynamicFormField; key guaranteed via name
              <DynamicFormField key={f.name} {...(f as DynamicFieldProps)} />
            )
          )}

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

export default ProspectDetailForm;
