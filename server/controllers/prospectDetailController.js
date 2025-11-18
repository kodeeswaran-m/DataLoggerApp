const ProspectDetail = require("../models/prospectDetailModel");
const cloudinary = require("../config/cloudinary");

// CREATE PROSPECT DETAIL
exports.createProspectDetail = async (req, res, next) => {
  try {
    const payload = { ...(req.body || {}) };

    if (!payload.month || !payload.quarter || !payload.prospect) {
      return res.status(400).json({ success: false, message: "month, quarter, and prospect are required" });
    }

    if (req.file && req.file.buffer) {
      const uploaded = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "prospectDetail_decks", resource_type: "raw" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

      payload.deck = uploaded.secure_url;
      payload.deckPublicId = uploaded.public_id;
    }

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
        } catch (e) { /* ignore */ }
      }
    });

    // If the client sent category = 'other' and categoryOther, keep categoryOther value
    if (payload.category === "other" && payload.categoryOther) {
      payload.category = payload.categoryOther;
      delete payload.categoryOther;
    }

    const prospect = await ProspectDetail.create(payload);
    res.status(201).json({ success: true, data: prospect });
  } catch (err) {
    console.error("createProspectDetail error:", err);
    next(err);
  }
};

exports.getProspectDetails = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 20,
      search = "",
      geo,
      month,
      quarter,
      lob,
      rag,
    } = req.query;

    const query = {};

    // -----------------------------
    // Text Search (Prospect name)
    // -----------------------------
    if (search) {
      query.prospect = { $regex: search, $options: "i" };
    }

    // -----------------------------
    // Filters
    // -----------------------------
    if (geo) query.geo = geo;
    if (month) query.month = month;
    if (quarter) query.quarter = quarter;
    if (lob) query.lob = lob;
    if (rag) query.rag = rag;

    // -----------------------------
    // Pagination
    // -----------------------------
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 20;
    const skip = (pageNum - 1) * limitNum;

    // -----------------------------
    // Fetch Data
    // -----------------------------
    const [items, total] = await Promise.all([
      ProspectDetail.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum),

      ProspectDetail.countDocuments(query),
    ]);

    return res.json({
      success: true,
      data: items,
      meta: {
        page: pageNum,
        limit: limitNum,
        total,
      },
    });
  } catch (err) {
    next(err);
  }
};


exports.getProspectById = async (req, res, next) => {
  try {
    const prospect = await ProspectDetail.findById(req.params.id);
    if (!prospect) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: prospect });
  } catch (err) {
    next(err);
  }
};

exports.updateProspect = async (req, res, next) => {
  try {
    const prospect = await ProspectDetail.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!prospect) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: prospect });
  } catch (err) {
    next(err);
  }
};

exports.deleteProspect = async (req, res, next) => {
  try {
    const prospect = await ProspectDetail.findById(req.params.id);
    if (!prospect) return res.status(404).json({ success: false, message: "Not found" });

    if (prospect.deckPublicId) {
      try {
        await cloudinary.uploader.destroy(prospect.deckPublicId);
      } catch (err) {
        console.error("Cloudinary destroy error:", err);
      }
    }

    await ProspectDetail.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};
