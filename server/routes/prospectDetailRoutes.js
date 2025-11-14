const express = require('express');
const router = express.Router();
const controller = require('../controllers/prospectDetailController');
const upload = require('../middleware/upload');

// POST /api/ProspectDetail → with file upload
router.post('/', upload.single('deck'), controller.createProspectDetail);

// GET    /api/ProspectDetail         -> list (supports ?page=&limit=&prospect=&geo=&rag=)
router.get('/', controller.getProspectDetails);

// GET    /api/ProspectDetail/:id     -> get single
router.get('/:id', controller.getProspectDetailById);

// PUT    /api/ProspectDetail/:id     -> update
router.put('/:id', controller.updateProspectDetail);

// DELETE /api/ProspectDetail/:id     -> delete
router.delete('/:id', controller.deleteProspectDetail);

module.exports = router;
