const express = require("express");
const connectToMongodb = require("./config/db.js");
const authRoutes = require("./routes/authRoutes.js");
const blogRoutes = require("./routes/blogRoutes.js");
require("dotenv").config();

const app = express();
app.use(express.json());

// Connect to MongoDB
 connectToMongodb()


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
