// models/prospectDetailModel.js
const mongoose = require("mongoose");

const CallSchema = new mongoose.Schema(
  {
    checked: { type: Boolean, default: false },
    notes: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

const ProspectDetailSchema = new mongoose.Schema(
  {
    month: { type: String, trim: true, default: "" },
    quarter: { type: String, trim: true, default: "" },
    prospect: { type: String, trim: true, default: "" },
    geo: { type: String, trim: true, default: "" },
    lob: { type: String, trim: true, default: "" },

<<<<<<< HEAD
    call1: { type: CallSchema, default: () => ({}) },
    call2: { type: CallSchema, default: () => ({}) },
    call3: { type: CallSchema, default: () => ({}) },
=======
  // Category fields
 category: { type: String, trim: true }, // now it's an array of strings
categoryOther: { type: String, trim: true },
>>>>>>> edcc113ceb9efe23fd06c2534e3c67c5378efc78

    coreOfferings: { type: String, trim: true, default: "" },
    primaryNeed: { type: String, trim: true, default: "" },
    secondaryNeed: { type: String, trim: true, default: "" },

    // SINGLE string category (Option B)
    category: { type: String, trim: true, default: "" },

    categoryOther: { type: String, trim: true, default: "" },

    trace: { type: String, trim: true, default: "" },
    salesSpoc: { type: String, trim: true, default: "" },
    oppId: { type: String, trim: true, default: "" },
    oppDetails: { type: String, trim: true, default: "" },

    deck: { type: String, trim: true, default: "" },
    deckPublicId: { type: String, trim: true, default: "" },

    rag: { type: String, trim: true, default: "" },
    remark: { type: String, trim: true, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProspectDetail", ProspectDetailSchema);
