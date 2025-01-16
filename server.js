const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();
const path = require("path")
const pembalapRoutes = require('./routes/pembalapRoutes');
const sepakbola = require("./routes/sepakbolaRoutes");
const calendar = require("./routes/calendarRoutes");
const stats = require("./routes/statsRoutes");
const menu = require("./routes/menuRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use("/api/pembalap", pembalapRoutes);
app.use("/api/sepakbola", sepakbola);
app.use("/api/calendar", calendar);
app.use("/api/stats", stats);
app.use("/api/menu", menu);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
// Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
