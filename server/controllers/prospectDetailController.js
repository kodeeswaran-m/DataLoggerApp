const ProspectDetail = require("../models/prospectDetailModel");
const cloudinary = require("../config/cloudinary");

// CREATE PROSPECT DETAIL
exports.createProspectDetail = async (req, res, next) => {
  try {
    const payload = req.body || {};

    // Basic required fields validation
    if (!payload.month || !payload.quarter || !payload.prospect) {
      return res.status(400).json({
        success: false,
        message: "month, quarter, and prospect are required",
      });
    }

    // Handle file upload
  // Upload file to Cloudinary
if (req.file && req.file.buffer) {
  const uploaded = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "prospectDetail_decks", resource_type: "raw" }, // important
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
    ["call1", "call2", "call3"].forEach((call, idx) => {
      const checkedKey = `${call}_checked`;
      const notesKey = `${call}_notes`;
      if (payload[checkedKey] !== undefined) {
        payload[call] = {
          checked: payload[checkedKey] === "true" || payload[checkedKey] === true,
          notes: payload[notesKey] || "",
        };
      }
    });

    // Save to MongoDB
    const prospect = await ProspectDetail.create(payload);
    res.status(201).json({ success: true, data: prospect });
  } catch (err) {
    console.error("createProspectDetail error:", err);
    next(err);
  }
};

// GET WITH PAGINATION + FILTERS
exports.getProspectDetails = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, prospect, geo, rag } = req.query;
    const query = {};

    if (prospect) query.prospect = { $regex: prospect, $options: "i" };
    if (geo) query.geo = geo;
    if (rag) query.rag = rag;

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 20;
    const skip = (pageNum - 1) * limitNum;

    const [items, total] = await Promise.all([
      ProspectDetail.find(query).sort({ createdAt: -1 }).skip(skip).limit(limitNum),
      ProspectDetail.countDocuments(query),
    ]);

    res.json({
      success: true,
      data: items,
      meta: { page: pageNum, limit: limitNum, total },
    });
  } catch (err) {
    next(err);
  }
};

// GET BY ID
exports.getProspectDetailById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const prospect = await ProspectDetail.findById(id);
    if (!prospect)
      return res.status(404).json({ success: false, message: "Not found" });

    res.json({ success: true, data: prospect });
  } catch (err) {
    next(err);
  }
};

// UPDATE
exports.updateProspectDetail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const payload = req.body;

    const prospect = await ProspectDetail.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });

    if (!prospect)
      return res.status(404).json({ success: false, message: "Not found" });

    res.json({ success: true, data: prospect });
  } catch (err) {
    next(err);
  }
};

// DELETE
exports.deleteProspectDetail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const prospect = await ProspectDetail.findById(id);

    if (!prospect)
      return res.status(404).json({ success: false, message: "Not found" });

    if (prospect.deckPublicId) {
      try {
        await cloudinary.uploader.destroy(prospect.deckPublicId);
      } catch (err) {
        console.error("Cloudinary destroy error:", err);
      }
    }

    await ProspectDetail.findByIdAndDelete(id);
    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};
