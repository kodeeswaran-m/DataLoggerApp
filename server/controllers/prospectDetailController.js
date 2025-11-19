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
<<<<<<< HEAD
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
=======
    const payload = { ...(req.body || {}) };
    console.log("payload", payload);

    if (!payload.month || !payload.quarter || !payload.prospect) {
      return res.status(400).json({
        success: false,
        message: "month, quarter, and prospect are required",
      });
>>>>>>> edcc113ceb9efe23fd06c2534e3c67c5378efc78
    }

    const body = req.body || {};

    const call1 = safeParseJSON(body.call1) || { checked: Boolean(body.call1_checked === "true" || body.call1_checked === true), notes: body.call1_notes || "" };
    const call2 = safeParseJSON(body.call2) || { checked: Boolean(body.call2_checked === "true" || body.call2_checked === true), notes: body.call2_notes || "" };
    const call3 = safeParseJSON(body.call3) || { checked: Boolean(body.call3_checked === "true" || body.call3_checked === true), notes: body.call3_notes || "" };

<<<<<<< HEAD
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
=======
    // Normalize call fields
    ["call1", "call2", "call3"].forEach((call) => {
      const checkedKey = `${call}_checked`;
      const notesKey = `${call}_notes`;
      if (payload[checkedKey] !== undefined) {
        payload[call] = {
          checked:
            payload[checkedKey] === "true" ||
            payload[checkedKey] === true ||
            payload[checkedKey] === "on",
          notes: payload[notesKey] || "",
        };
      }
      if (payload[call] && typeof payload[call] === "string") {
        try {
          payload[call] = JSON.parse(payload[call]);
        } catch (e) {
          /* ignore */
        }
      }
    });

    // If the client sent category = 'other' and categoryOther, keep categoryOther value
    if (payload.category === "other" && payload.categoryOther) {
      payload.category = payload.categoryOther;
      delete payload.categoryOther;
    }
    const prospect = await ProspectDetail.create(payload);
    res.status(201).json({ success: true, data: prospect });
>>>>>>> edcc113ceb9efe23fd06c2534e3c67c5378efc78
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

<<<<<<< HEAD
exports.getProspectById = async (req, res) => {
  try {
    const doc = await ProspectDetail.findById(req.params.id);
    if (!doc) return res.status(404).json({ success: false, message: "Not found" });
    return res.json({ success: true, data: doc });
=======
exports.getCategoryGeoChartData = async (req, res, next) => {
  try {
    const result = await ProspectDetail.aggregate([
      // 1. Only needed fields
      {
        $project: {
          geo: 1,
          category: 1,
        },
      },

      // 2. Remove empty/null fields
      {
        $match: {
          geo: { $exists: true, $ne: "" },
          category: { $exists: true, $ne: "" },
        },
      },

      // 3. Count records by geo + category
      {
        $group: {
          _id: { geo: "$geo", category: "$category" },
          count: { $sum: 1 },
        },
      },

      // 4. Group again by geo, collecting all category-count pairs
      {
        $group: {
          _id: "$_id.geo",
          categoryCounts: {
            $push: {
              category: "$_id.category",
              count: "$count",
            },
          },
        },
      },

      // 5. Final clean object
      {
        $project: {
          geo: "$_id",
          categoryCounts: 1,
          _id: 0,
        },
      },
    ]);

    // Handle empty DB safely
    if (!result || result.length === 0) {
      return res.json({
        success: true,
        xAxis: [],
        seriesLabels: [],
        data: {},
      });
    }

    // Unique geo labels → these will become seriesLabels
    const seriesLabels = result.map((r) => r.geo);

    // Unique categories → these will become xAxis
    const xAxis = [
      ...new Set(
        result.flatMap((r) => (r.categoryCounts || []).map((c) => c.category))
      ),
    ].sort(); // optional: sort for consistency

    // Build data object
    const data = {};
    seriesLabels.forEach((geo) => {
      const geoRecord = result.find((r) => r.geo === geo);
      const categoryCounts = geoRecord?.categoryCounts || [];
      data[geo] = xAxis.map((cat) => {
        const found = categoryCounts.find((c) => c.category === cat);
        return found ? found.count : 0;
      });
    });

    // Send response
    return res.json({
      success: true,
      xAxis,
      seriesLabels,
      data,
      filterNames: ["Categories", "Geo"],
    });
  } catch (err) {
    console.error("Category-Geo Chart Error:", err);
    next(err);
  }
};

exports.getCategoryMonthChartData = async (req, res, next) => {
  try {
    const result = await ProspectDetail.aggregate([
      // 1. Only required fields
      {
        $project: {
          category: 1,
          month: 1,
        },
      },

      // 2. Remove empty values
      {
        $match: {
          category: { $exists: true, $ne: "" },
          month: { $exists: true, $ne: "" },
        },
      },

      // 3. Group by category + month
      {
        $group: {
          _id: { category: "$category", month: "$month" },
          count: { $sum: 1 },
        },
      },

      // 4. Group again by category → collect all month-count pairs
      {
        $group: {
          _id: "$_id.category",
          monthCounts: {
            $push: {
              month: "$_id.month",
              count: "$count",
            },
          },
        },
      },

      // 5. Final formatting
      {
        $project: {
          category: "$_id",
          monthCounts: 1,
          _id: 0,
        },
      },
    ]);

    // Handle empty DB
    if (!result || result.length === 0) {
      return res.json({
        success: true,
        xAxis: [],
        seriesLabels: [],
        data: {},
      });
    }

    // Unique categories
    const seriesLabels = result.map((r) => r.category);

    // Unique months (sorted)
    const xAxis = [
      ...new Set(result.flatMap((r) => r.monthCounts.map((m) => m.month))),
    ].sort((a, b) => {
      const monthOrder = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      return monthOrder.indexOf(a) - monthOrder.indexOf(b);
    });

    // Build final data object
    const data = {};
    seriesLabels.forEach((category) => {
      const record = result.find((r) => r.category === category);
      const monthCounts = record?.monthCounts || [];
      data[category] = xAxis.map((month) => {
        const found = monthCounts.find((m) => m.month === month);
        return found ? found.count : 0;
      });
    });

    // Return response with renamed keys
    return res.json({
      success: true,
      xAxis,
      seriesLabels,
      data,
      filterNames: ["Month","Categories"],
    });
  } catch (err) {
    console.error("Category-Month Chart Error:", err);
    next(err);
  }
};

exports.getProspectById = async (req, res, next) => {
  try {
    const prospect = await ProspectDetail.findById(req.params.id);
    if (!prospect)
      return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: prospect });
>>>>>>> edcc113ceb9efe23fd06c2534e3c67c5378efc78
  } catch (err) {
    console.error("getProspectById error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.updateProspect = async (req, res) => {
  try {
<<<<<<< HEAD
    const id = req.params.id;
    const existing = await ProspectDetail.findById(id);
    if (!existing) return res.status(404).json({ success: false, message: "Not found" });

    const body = req.body || {};
    let deckUrl = existing.deck;
    let deckPublicId = existing.deckPublicId;
=======
    const prospect = await ProspectDetail.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!prospect)
      return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: prospect });
  } catch (err) {
    next(err);
  }
};

exports.deleteProspect = async (req, res, next) => {
  try {
    const prospect = await ProspectDetail.findById(req.params.id);
    if (!prospect)
      return res.status(404).json({ success: false, message: "Not found" });
>>>>>>> edcc113ceb9efe23fd06c2534e3c67c5378efc78

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
