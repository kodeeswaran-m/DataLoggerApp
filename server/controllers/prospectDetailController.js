// controllers/prospectDetailController.js
const ProspectDetail = require("../models/prospectDetailModel");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

// helper to build filters
const buildFilters = (query) => {
  const filters = {};
  if (query.search) filters.prospect = { $regex: query.search, $options: "i" };
  if (query.prospect) filters.prospect = { $regex: query.prospect, $options: "i" };
  if (query.geo) filters.geo = query.geo;
  if (query.month) filters.month = query.month;
  if (query.quarter) filters.quarter = query.quarter;
  if (query.lob) filters.lob = query.lob;
  if (query.rag) filters.rag = query.rag;
  return filters;
};

const safeParseJSON = (maybe) => {
  if (!maybe) return null;
  if (typeof maybe === "object") return maybe;
  try {
    return JSON.parse(maybe);
  } catch (e) {
    return null;
  }
};

// Always force single string (defensive against FormData arrays)
const normalizeField = (v) => {
  if (v === undefined || v === null) return "";
  if (Array.isArray(v)) return String(v[0] || "");
  return String(v);
};

exports.createProspectDetail = async (req, res) => {
  try {
    let deckUrl = "";
    let deckPublicId = "";

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, { folder: "decks", resource_type: "raw" });
      deckUrl = result.secure_url;
      deckPublicId = result.public_id;
      try { fs.unlinkSync(req.file.path); } catch (e) {}
    }

    const body = req.body || {};

    const call1 = safeParseJSON(body.call1) || { checked: Boolean(body.call1_checked === "true" || body.call1_checked === true), notes: body.call1_notes || "" };
    const call2 = safeParseJSON(body.call2) || { checked: Boolean(body.call2_checked === "true" || body.call2_checked === true), notes: body.call2_notes || "" };
    const call3 = safeParseJSON(body.call3) || { checked: Boolean(body.call3_checked === "true" || body.call3_checked === true), notes: body.call3_notes || "" };

    // normalize category inputs (force single string)
    const categoryRaw = normalizeField(body.category);
    const categoryOtherRaw = normalizeField(body.categoryOther);

    // decide saved category (if dropdown = 'other' then use categoryOther)
    const savedCategory = categoryRaw === "other" ? (categoryOtherRaw || "") : categoryRaw || "";
    const savedCategoryOther = categoryRaw === "other" ? (categoryOtherRaw || "") : "";

    const doc = new ProspectDetail({
      month: normalizeField(body.month),
      quarter: normalizeField(body.quarter),
      prospect: normalizeField(body.prospect),
      geo: normalizeField(body.geo),
      lob: normalizeField(body.lob),

      call1,
      call2,
      call3,

      coreOfferings: normalizeField(body.coreOfferings),
      primaryNeed: normalizeField(body.primaryNeed),
      secondaryNeed: normalizeField(body.secondaryNeed),

      category: savedCategory,
      categoryOther: savedCategoryOther,

      trace: normalizeField(body.trace),
      salesSpoc: normalizeField(body.salesSpoc),
      oppId: body.oppId || `OPP-${Date.now()}`,
      oppDetails: normalizeField(body.oppDetails),

      deck: deckUrl,
      deckPublicId,
      rag: normalizeField(body.rag),
      remark: normalizeField(body.remark),
    });

    await doc.save();
    return res.status(201).json({ success: true, data: doc });
  } catch (err) {
    console.error("createProspectDetail error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getProspectDetails = async (req, res) => {
  try {
    const page = parseInt(req.query.page || "1");
    const limit = parseInt(req.query.limit || "30");
    const skip = (page - 1) * limit;

    const filters = buildFilters(req.query);

    const [data, total] = await Promise.all([
      ProspectDetail.find(filters).sort({ createdAt: -1 }).skip(skip).limit(limit),
      ProspectDetail.countDocuments(filters),
    ]);

    return res.json({ success: true, data, total });
  } catch (err) {
    console.error("getProspectDetails error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getProspectById = async (req, res) => {
  try {
    const doc = await ProspectDetail.findById(req.params.id);
    if (!doc) return res.status(404).json({ success: false, message: "Not found" });
    return res.json({ success: true, data: doc });
  } catch (err) {
    console.error("getProspectById error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.updateProspect = async (req, res) => {
  try {
    const id = req.params.id;
    const existing = await ProspectDetail.findById(id);
    if (!existing) return res.status(404).json({ success: false, message: "Not found" });

    const body = req.body || {};
    let deckUrl = existing.deck;
    let deckPublicId = existing.deckPublicId;

    if (req.file) {
      if (deckPublicId) {
        try { await cloudinary.uploader.destroy(deckPublicId, { resource_type: "raw" }); } catch(e){/*ignore*/}
      }
      const result = await cloudinary.uploader.upload(req.file.path, { folder: "decks", resource_type: "raw" });
      deckUrl = result.secure_url;
      deckPublicId = result.public_id;
      try { fs.unlinkSync(req.file.path); } catch (e) {}
    }

    const call1 = safeParseJSON(body.call1) || { checked: Boolean(body.call1_checked === "true" || body.call1_checked === true), notes: body.call1_notes ?? existing.call1?.notes ?? "" };
    const call2 = safeParseJSON(body.call2) || { checked: Boolean(body.call2_checked === "true" || body.call2_checked === true), notes: body.call2_notes ?? existing.call2?.notes ?? "" };
    const call3 = safeParseJSON(body.call3) || { checked: Boolean(body.call3_checked === "true" || body.call3_checked === true), notes: body.call3_notes ?? existing.call3?.notes ?? "" };

    // normalize category inputs
    const categoryRaw = normalizeField(body.category);
    const categoryOtherRaw = normalizeField(body.categoryOther);

    // compute category to save: if new category provided in request use that; else keep existing
    let updatedCategory = existing.category || "";
    let updatedCategoryOther = existing.categoryOther || "";

    if (categoryRaw) {
      updatedCategory = categoryRaw === "other" ? (categoryOtherRaw || "") : categoryRaw;
      updatedCategoryOther = categoryRaw === "other" ? (categoryOtherRaw || "") : "";
    }

    const update = {
      month: normalizeField(body.month) || existing.month,
      quarter: normalizeField(body.quarter) || existing.quarter,
      prospect: normalizeField(body.prospect) || existing.prospect,
      geo: normalizeField(body.geo) || existing.geo,
      lob: normalizeField(body.lob) || existing.lob,

      call1,
      call2,
      call3,

      coreOfferings: normalizeField(body.coreOfferings) || existing.coreOfferings,
      primaryNeed: normalizeField(body.primaryNeed) || existing.primaryNeed,
      secondaryNeed: normalizeField(body.secondaryNeed) || existing.secondaryNeed,

      category: updatedCategory,
      categoryOther: updatedCategoryOther,

      trace: normalizeField(body.trace) || existing.trace,
      salesSpoc: normalizeField(body.salesSpoc) || existing.salesSpoc,
      oppId: existing.oppId,
      oppDetails: normalizeField(body.oppDetails) || existing.oppDetails,

      deck: deckUrl,
      deckPublicId,
      rag: normalizeField(body.rag) || existing.rag,
      remark: normalizeField(body.remark) || existing.remark,
      updatedAt: new Date(),
    };

    const updated = await ProspectDetail.findByIdAndUpdate(id, update, { new: true });
    return res.json({ success: true, data: updated });
  } catch (err) {
    console.error("updateProspect error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.deleteProspect = async (req, res) => {
  try {
    const doc = await ProspectDetail.findById(req.params.id);
    if (!doc) return res.status(404).json({ success: false, message: "Not found" });

    if (doc.deckPublicId) {
      try { await cloudinary.uploader.destroy(doc.deckPublicId, { resource_type: "raw" }); } catch(e) { /* ignore */ }
    }

    await ProspectDetail.findByIdAndDelete(req.params.id);
    return res.json({ success: true });
  } catch (err) {
    console.error("deleteProspect error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
