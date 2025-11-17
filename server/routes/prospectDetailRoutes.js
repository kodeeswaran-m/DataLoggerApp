const express = require("express");
const router = express.Router();
const controller = require("../controllers/prospectDetailController");
const upload = require("../middleware/upload");

// POST /api/prospectDetail → with file upload (field name: deck)
router.post("/", upload.single("deck"), controller.createProspectDetail);

// GET /api/prospectDetail → list (supports ?page=&limit=&prospect=&geo=&rag=)
router.get("/", controller.getProspectDetails);

// GET /api/prospectDetail/:id → get single
router.get("/:id", controller.getProspectDetailById);

// PUT /api/prospectDetail/:id → update
router.put("/:id", controller.updateProspectDetail);

// DELETE /api/prospectDetail/:id → delete
router.delete("/:id", controller.deleteProspectDetail);

module.exports = router;
