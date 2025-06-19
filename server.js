const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Serve static files from public
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Mongoose schema
const bookingSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  date: String,
  time: String,
  branch: String,
  people: Number,
  message: String
});

const Booking = mongoose.model("Booking", bookingSchema);

// POST /api/book
app.post('/api/book', async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json({ message: 'Booking saved' });
  } catch (err) {
    res.status(500).json({ error: 'Error saving booking' });
  }
});

// ✅ Fallback route (ONLY if index.html exists)
app.get('*', (req, res) => {
  const indexPath = path.join(publicPath, 'index.html');
  res.sendFile(indexPath, function (err) {
    if (err) {
      res.status(500).send('Something went wrong!');
    }
  });
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
