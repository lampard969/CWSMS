// Package model for CWSMS
const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  packageNumber: { type: Number, required: true, unique: true },
  packageName: { type: String },
  PackageDiscription: { type: String, required: true },
  packagePrice: { type: Number, required: true },
});

module.exports = mongoose.model('Package', packageSchema);
