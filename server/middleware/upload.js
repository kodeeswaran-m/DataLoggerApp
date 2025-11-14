const multer = require("multer");

const storage = multer.memoryStorage(); // file kept in memory buffer
const upload = multer({ storage });

module.exports = upload;
