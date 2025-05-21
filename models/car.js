// Car model for CWSMS
const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  plateNumber: { type: String, required: true, unique: true },
  carType: { type: String, required: true },
  carSize: { type: String, required: true },
  DriverName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
});

module.exports = mongoose.model('Car', carSchema);
