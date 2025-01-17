const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const jurusanRoutes = require("./routes/jurusanRoutes")
require('dotenv').config();
const path = require("path")

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routing
app.use("/api/auth", authRoutes);
app.use("/api/jurusan", jurusanRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
// Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
