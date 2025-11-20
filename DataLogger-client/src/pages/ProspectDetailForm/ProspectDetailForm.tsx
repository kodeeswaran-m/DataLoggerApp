import React, { useEffect, useState } from "react";
import "./ProspectDetailForm.css";
import { monthToQuarter } from "../../services/quarter";
import type { DynamicFieldProps } from "../../components/DynamicFormField/DynamicFormField.types";
import CategoryField from "../../components/CategoryField/CategoryField";
import {
  createProspectDetail,
  getProspectById,
  updateProspect,
} from "../../services/ProspectDetailServices";
import DynamicFormField from "../../components/DynamicFormField/DynamicFormField";
import { useNavigate, useParams } from "react-router-dom";
 
type CallSection = { checked: boolean; notes: string };
 
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
 
  deck: string; // filename
  rag: string;
  remark: string;
};
 
const emptyCalls: CallSection = { checked: false, notes: "" };
 
const allowedFileTypes = [
  "application/pdf",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "image/jpeg",
  "image/png",
  "image/jpg",
  "application/zip",
  "application/x-zip-compressed",
];
 
const emptyValues: FormValues = {
  month: "",
  quarter: "",
  prospect: "",
  geo: "",
  lob: "",
  call1: { ...emptyCalls },
  call2: { ...emptyCalls },
  call3: { ...emptyCalls },
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
};
 
const ProspectDetailForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
 
  const [file, setFile] = useState<File | null>(null);
  const [deckPreview, setDeckPreview] = useState<string>(""); // existing deck URL if any
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState<FormValues>(emptyValues);
 
  // update helper (works with nested call objects)
  const updateValue = <K extends keyof FormValues>(name: K, value: FormValues[K]) => {
    setValues((prev) => {
      const next = { ...prev, [name]: value } as FormValues;
      if (name === "month") next.quarter = monthToQuarter(value as unknown as string);
      return next;
    });
  };
 
  // file select
  const handleFileSelect = (f: File) => {
    if (!allowedFileTypes.includes(f.type)) {
      alert("Unsupported file type. Allowed: PDF, PPT, images (jpg/png), zip.");
      return;
    }
    setFile(f);
    // show the filename in the deck field (preview URL kept separate)
    updateValue("deck", f.name);
    setDeckPreview("");
  };
 
  // load existing prospect when editing
  useEffect(() => {
    if (!isEdit) return;
    const load = async () => {
      setLoading(true);
      try {
        const doc = await getProspectById(id!);
        if (!doc) {
          alert("Record not found");
          return;
        }
 
        // Defensive: normalize category & categoryOther
        let categoryValue = "";
        if (Array.isArray(doc.category) && doc.category.length > 0) {
          // choose first element for the select control (your UI expects a single string)
          categoryValue = doc.category[0];
        } else if (typeof doc.category === "string") {
          categoryValue = doc.category;
        }
 
        let categoryOtherValue = "";
        if (Array.isArray(doc.categoryOther)) {
          // defensive: take first if backend accidentally stored array
          categoryOtherValue = String(doc.categoryOther[0] || "");
        } else if (doc.categoryOther) {
          categoryOtherValue = String(doc.categoryOther);
        }
 
        setValues({
          month: doc.month || "",
          quarter: doc.quarter || monthToQuarter(doc.month || ""),
          prospect: doc.prospect || "",
          geo: doc.geo || "",
          lob: doc.lob || "",
          call1: { checked: Boolean(doc.call1?.checked), notes: doc.call1?.notes || "" },
          call2: { checked: Boolean(doc.call2?.checked), notes: doc.call2?.notes || "" },
          call3: { checked: Boolean(doc.call3?.checked), notes: doc.call3?.notes || "" },
          coreOfferings: doc.coreOfferings || "",
          primaryNeed: doc.primaryNeed || "",
          secondaryNeed: doc.secondaryNeed || "",
          category: categoryValue || "",
          categoryOther: categoryOtherValue || "",
          trace: doc.trace || "",
          salesSpoc: doc.salesSpoc || "",
          oppId: doc.oppId || "AUTO-GENERATED",
          oppDetails: doc.oppDetails || "Generated automatically",
          deck: doc.deck ? (typeof doc.deck === "string" ? doc.deck.split("/").pop() || "" : "") : "",
          rag: doc.rag || "",
          remark: doc.remark || "",
        });
 
        if (doc.deck && typeof doc.deck === "string" && doc.deck.startsWith("http")) {
          setDeckPreview(doc.deck);
        } else {
          setDeckPreview("");
        }
      } catch (err) {
        console.error("Error loading prospect:", err);
        alert("Failed to load record.");
      } finally {
        setLoading(false);
      }
    };
 
    load();
  }, [isEdit, id]);
 
  // build fields
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
    { type: "text", name: "quarter", label: "Quarter", value: values.quarter, disabled: true },
    { type: "text", name: "prospect", label: "Prospect", value: values.prospect, onChange: (v) => updateValue("prospect", v) },
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
 
    // Calls (checkbox-with-text expects checked + textField)
    {
      type: "checkbox-with-text",
      name: "call1",
      label: "Call 1 - Discovery",
      checked: values.call1.checked,
      textField: { name: "call1.notes", value: values.call1.notes, placeholder: "Notes for Call 1" },
      onChange: (v) => updateValue("call1", { ...values.call1, checked: v }),
      onTextFieldChange: (v) => updateValue("call1", { ...values.call1, notes: v }),
    },
    {
      type: "checkbox-with-text",
      name: "call2",
      label: "Call 2 - Solutions",
      checked: values.call2.checked,
      textField: { name: "call2.notes", value: values.call2.notes, placeholder: "Notes for Call 2" },
      onChange: (v) => updateValue("call2", { ...values.call2, checked: v }),
      onTextFieldChange: (v) => updateValue("call2", { ...values.call2, notes: v }),
    },
    {
      type: "checkbox-with-text",
      name: "call3",
      label: "Call 3 - POC/Proposal",
      checked: values.call3.checked,
      textField: { name: "call3.notes", value: values.call3.notes, placeholder: "Notes for Call 3" },
      onChange: (v) => updateValue("call3", { ...values.call3, checked: v }),
      onTextFieldChange: (v) => updateValue("call3", { ...values.call3, notes: v }),
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
 
    { type: "text", name: "primaryNeed", label: "Primary Need", value: values.primaryNeed, onChange: (v) => updateValue("primaryNeed", v) },
    { type: "text", name: "secondaryNeed", label: "Secondary Need", value: values.secondaryNeed, onChange: (v) => updateValue("secondaryNeed", v) },
 
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
 
    {
      type: "file",
      name: "deck",
      label: "Deck",
      value: values.deck,
      onFileSelect: handleFileSelect,
      onChange: (v) => updateValue("deck", v),
    },
 
    {
      type: "select",
      name: "rag",
      label: "RAG",
      value: values.rag,
      options: [
        { label: "Red", value: "Red" },
        { label: "Amber", value: "Amber" },
        { label: "Green", value: "Green" },
      ],
      onChange: (v) => updateValue("rag", v),
    },
 
    { type: "text", name: "remark", label: "Remarks", value: values.remark, className: "full", onChange: (v) => updateValue("remark", v) },
  ];
 
  const handleSubmit = async () => {
    try {
      if (!values.month || !values.quarter || !values.prospect) {
        alert("Please fill Month, Quarter (auto), and Prospect before submitting.");
        return;
      }
 
      const fd = new FormData();
      if (file) fd.append("deck", file);
 
      // Append scalar string fields except nested calls and category (we handle calls & category specially)
      const skip = ["call1", "call2", "call3", "category", "categoryOther"] as (keyof FormValues)[];
      (Object.keys(values) as (keyof FormValues)[]).forEach((k) => {
        if (skip.includes(k)) return;
        const v = values[k];
        if (typeof v === "string") fd.append(k, v);
      });
 
      // Append nested calls as JSON strings (backend will parse)
      fd.append("call1", JSON.stringify(values.call1));
      fd.append("call2", JSON.stringify(values.call2));
      fd.append("call3", JSON.stringify(values.call3));
 
      // ===== CATEGORY handling (Option A: categoryOther is a single string) =====
      // Clean up any accidental arrays in categoryOther (defensive)
     // ===== FIXED CATEGORY HANDLING — NO DUPLICATES =====
// ===== FIXED CATEGORY HANDLING (NO DUPLICATES, ALWAYS STRING) =====
 
// Sanitize categoryOther (ensure it is a single string)
let categoryOther = "";
if (Array.isArray(values.categoryOther)) {
  categoryOther = values.categoryOther[0] || "";
} else {
  categoryOther = values.categoryOther || "";
}
 
// Determine final "category" that must be stored in DB
let finalCategory = "";
 
if (values.category === "other") {
  // User typed custom value → use categoryOther
  finalCategory = categoryOther;
} else {
  // Normal dropdown selection
  finalCategory = values.category || "";
  categoryOther = ""; // clear other
}
 
// Append exactly once – never duplicate
fd.append("category", finalCategory);
fd.append("categoryOther", categoryOther);
 
 
      if (isEdit) {
        await updateProspect(id!, fd);
        alert("Successfully Updated!");
      } else {
        await createProspectDetail(fd);
        alert("Successfully Submitted!");
      }
 
      navigate("/summary");
    } catch (err) {
      console.error("submit error:", err);
      alert("Error submitting form — check console for more info.");
    }
  };
 
  return (
    <div className="demo-wrapper">
      <main className="content-area">
        <h1 className="header">{isEdit ? "Edit Prospect" : "Prospect Entry Form"}</h1>
 
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="form-grid">
            {fields.map((f) =>
              f.type === "custom" ? (
                <div key={f.name}>{f.render}</div>
              ) : (
                <DynamicFormField key={f.name} {...(f as DynamicFieldProps)} />
              )
            )}
 
            {/* show existing deck preview (URL) */}
            {deckPreview ? (
              <div style={{ marginTop: 8 }}>
                <a href={deckPreview} target="_blank" rel="noreferrer">
                  Open existing deck
                </a>
              </div>
            ) : null}
 
            <div className="button-row full">
              <button className="submit-btn" onClick={handleSubmit}>
                {isEdit ? "Update Prospect" : "Submit Prospect"}
              </button>
              <button className="cancel-btn" onClick={() => navigate(-1)} style={{ marginLeft: 12 }}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
 
export default ProspectDetailForm;