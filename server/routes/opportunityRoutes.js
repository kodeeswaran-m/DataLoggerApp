const express = require('express');
const router = express.Router();
const controller = require('../controllers/opportunityController');
const upload = require('../middleware/upload');

// POST /api/opportunities → with file upload
router.post('/', upload.single('deck'), controller.createOpportunity);

// GET    /api/opportunities         -> list (supports ?page=&limit=&prospect=&geo=&rag=)
router.get('/', controller.getOpportunities);

// GET    /api/opportunities/:id     -> get single
router.get('/:id', controller.getOpportunityById);

// PUT    /api/opportunities/:id     -> update
router.put('/:id', controller.updateOpportunity);

// DELETE /api/opportunities/:id     -> delete
router.delete('/:id', controller.deleteOpportunity);

module.exports = router;
