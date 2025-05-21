// Payment model for CWSMS
const mongoose = require('mongoose');
const paymentSchema = new mongoose.Schema({
  car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  method: { type: String, required: true }
});

module.exports = mongoose.model('Payment', paymentSchema);
