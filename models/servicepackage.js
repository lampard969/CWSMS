// ServicePackage model for CWSMS
const mongoose = require('mongoose');

const servicePackageSchema = new mongoose.Schema({
  car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
  package: { type: mongoose.Schema.Types.ObjectId, ref: 'Package', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  status: { type: String, enum: ['active', 'completed', 'cancelled'], default: 'active' }
});

module.exports = mongoose.model('ServicePackage', servicePackageSchema);
