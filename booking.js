const bookingSchema = new mongoose.Schema({
  name: String,
  phone: String,
  time: String,
  branch: String,
  date: String,
  people: Number,
  message: String,
});
