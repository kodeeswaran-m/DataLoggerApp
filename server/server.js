require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const prospectDetailRoutes = require('./routes/prospectDetailRoutes');

const app = express();

// Connect to DB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json({ limit: '5mb' })); // supports large payloads if needed
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Routes
app.use('/api/prospectDetail', prospectDetailRoutes);

// Health-check
app.get('/', (req, res) => res.send({ status: 'ok', timestamp: new Date().toISOString() }));

// Global error handler (simple)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Server Error'
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
