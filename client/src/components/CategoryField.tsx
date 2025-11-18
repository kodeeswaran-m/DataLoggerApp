// CategoryField.tsx
import React from "react";
import "./CategoryField.css";

type CategoryFieldProps = {
  value: string;
  otherValue?: string;
  onChange: (v: string) => void;
  onOtherChange?: (v: string) => void;
};

const CategoryField: React.FC<CategoryFieldProps> = ({
  value,
  otherValue,
  onChange,
  onOtherChange,
}) => {
  return (
    <div className="form-group category-group">
      <label>Category</label>

      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="" disabled hidden>
          Choose category
        </option>

        <option value="">-- Select Category --</option>

        <optgroup label="Claims & Ops">
          <option value="Claims">Claims</option>
          <option value="Underwriting">Underwriting (UW)</option>
          <option value="Customer Experience">Customer Experience (CX)</option>
          <option value="Fraud Detection">Fraud Detection</option>
          <option value="FNOL Automation">FNOL Automation</option>
          <option value="Product Comparison">Product Comparison</option>
          <option value="Account Management">Account Management</option>
          <option value="Rulebook Development">Rulebook Development</option>
          <option value="NA">NA</option>
        </optgroup>

        <optgroup label="Guidewire / COTS / Platform">
          <option value="Guidewire - Capabilities">Guidewire (Capabilities)</option>
          <option value="Guidewire - Testing">Guidewire (Testing)</option>
          <option value="Guidewire - Platform Offering">Guidewire (Platform Offering)</option>
          <option value="Guidewire - Customer Engage">Guidewire (Customer Engage)</option>
          <option value="COTS - Adaptive Pricing">COTS (Adaptive Pricing)</option>
          <option value="COTS - Medical Document Parsing">COTS (Medical Document Parsing)</option>
          <option value="CloudOps">CloudOps</option>
          <option value="Core Modernization">Core Modernization</option>
          <option value="API Integration">API Integration</option>
          <option value="Cyber Security">Cyber Security</option>
          <option value="Software Engineering">Software Engineering Capabilities</option>
          <option value="NA">NA</option>
        </optgroup>

        <optgroup label="AI / Data">
          <option value="Agentic AI">Agentic AI</option>
          <option value="AI Accelerators">AI Accelerators</option>
          <option value="AI Capabilities">AI Capabilities</option>
          <option value="AI Solutions">AI Solutions</option>
          <option value="AI Use Cases">AI Use Cases</option>
          <option value="GenAI">GenAI</option>
          <option value="Data & Analytics">Data & Analytics (D&A)</option>
          <option value="NA">NA</option>
        </optgroup>

        <optgroup label="Insurance Specific / Other">
          <option value="Claims Workflow Orchestration">Claims Workflow Orchestration</option>
          <option value="Reinsurance">Reinsurance</option>
          <option value="UBI">UBI</option>
          <option value="Cross-Sell/Upsell">Cross-Sell / Upsell</option>
          <option value="Insurance Capabilities">Insurance Capabilities</option>
          <option value="NA">NA</option>
        </optgroup>

        <option value="other">Other (type manually)</option>
      </select>

      {value === "other" && (
        <input
          type="text"
          className="other-input"
          placeholder="Type category…"
          value={otherValue ?? ""}
          onChange={(e) => onOtherChange?.(e.target.value)}
        />
      )}
    </div>
  );
};

export default CategoryField;
