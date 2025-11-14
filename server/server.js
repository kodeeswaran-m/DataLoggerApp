const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
// const userRoutes = require("./routes/user.routes");

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// DB Connection
connectDB();

// Routes
// app.use("/api/users", userRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Node.js server is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
