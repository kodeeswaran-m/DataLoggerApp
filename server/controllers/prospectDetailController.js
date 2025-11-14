// exports.createProspectDetail = async (req, res, next) => {
//   try {
//     const payload = req.body;

//     // Basic required fields check (you can enhance with express-validator)
//     if (!payload.month || !payload.quarter || !payload.prospect) {
//       return res.status(400).json({ success: false, message: 'month, quarter and prospect are required' });
//     }

//     const opp = new ProspectDetail(payload);
//     await opp.save();

//     res.status(201).json({ success: true, data: opp });
//   } catch (err) {
//     next(err);
//   }
// };
// exports.deleteProspectDetail = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const deleted = await ProspectDetail.findByIdAndDelete(id);
//     if (!deleted)
//       return res
//         .status(404)
//         .json({ success: false, message: "ProspectDetail not found" });
//     res.json({ success: true, message: "Deleted successfully" });
//   } catch (err) {
//     next(err);
//   }
// };


const ProspectDetail = require("../models/prospectDetail");
const cloudinary = require("../config/cloudinary");

exports.createProspectDetail = async (req, res, next) => {
  try {
    const payload = req.body;

    // Basic validation
    if (!payload.month || !payload.quarter || !payload.prospect) {
      return res.status(400).json({
        success: false,
        message: "month, quarter and prospect are required",
      });
    }

    // Upload DECK File to Cloudinary
    if (req.file) {
      const uploaded = await cloudinary.uploader.upload_stream(
        { folder: "prospectDetail_decks" },
        async (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            return res.status(500).json({
              success: false,
              message: "File upload failed",
            });
          }

          // Save Cloudinary URL into payload
          // payload.deck = result.secure_url;
          payload.deck = result.secure_url;
          payload.deckPublicId = result.public_id;

          const opp = new ProspectDetail(payload);
          await opp.save();

          return res.status(201).json({ success: true, data: opp });
        }
      );

      // pipe multer buffer to cloudinary upload
      uploaded.end(req.file.buffer);
    } else {
      // No file uploaded — save normally
      const opp = new ProspectDetail(payload);
      await opp.save();
      return res.status(201).json({ success: true, data: opp });
    }
  } catch (err) {
    next(err);
  }
};

exports.getProspectDetails = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, prospect, geo, rag } = req.query;
    const query = {};

    if (prospect) query.prospect = { $regex: prospect, $options: "i" };
    if (geo) query.geo = geo;
    if (rag) query.rag = rag;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [items, total] = await Promise.all([
      ProspectDetail.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      ProspectDetail.countDocuments(query),
    ]);

    res.json({
      success: true,
      data: items,
      meta: { page: parseInt(page), limit: parseInt(limit), total },
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteProspectDetail = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Fetch the ProspectDetail 
    const opp = await ProspectDetail.findById(id);
    if (!opp) {
      return res.status(404).json({ success: false, message: 'ProspectDetail not found' });
    }

    // Delete file from Cloudinary if exists
    if (opp.deckPublicId) {
      try {
        await cloudinary.uploader.destroy(opp.deckPublicId);
        console.log("Cloudinary file deleted:", opp.deckPublicId);
      } catch (error) {
        console.error("Cloudinary delete error:", error);
      }
    }

    // Delete document from MongoDB
    await ProspectDetail.findByIdAndDelete(id);

    res.json({ success: true, message: 'Deleted successfully' });

  } catch (err) {
    next(err);
  }
};


exports.getProspectDetailById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const opp = await ProspectDetail.findById(id);
    if (!opp)
      return res
        .status(404)
        .json({ success: false, message: "ProspectDetail not found" });
    res.json({ success: true, data: opp });
  } catch (err) {
    next(err);
  }
};

exports.updateProspectDetail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const opp = await ProspectDetail.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });
    if (!opp)
      return res
        .status(404)
        .json({ success: false, message: "ProspectDetail not found" });
    res.json({ success: true, data: opp });
  } catch (err) {
    next(err);
  }
};


