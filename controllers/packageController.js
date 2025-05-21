// Package controller for CWSMS
const Package = require('../models/package');

exports.createPackage = async (req, res) => {
  console.log('Received package POST:', req.body); // Log incoming data
  try {
    // Convert fields to correct types
    const data = {
      ...req.body,
      packageNumber: Number(req.body.packageNumber),
      packagePrice: Number(req.body.packagePrice)
    };
    const pkg = new Package(data);
    await pkg.save();
    console.log('Package saved to DB:', pkg); // Log after save
    res.status(201).json(pkg);
  } catch (err) {
    console.error('Error saving package:', err); // Log error
    res.status(400).json({ error: err.message });
  }
};

exports.getPackages = async (req, res) => {
  try {
    const pkgs = await Package.find();
    res.json(pkgs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPackageById = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);
    if (!pkg) return res.status(404).json({ error: 'Package not found' });
    res.json(pkg);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePackage = async (req, res) => {
  try {
    const pkg = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!pkg) return res.status(404).json({ error: 'Package not found' });
    res.json(pkg);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deletePackage = async (req, res) => {
  try {
    const pkg = await Package.findByIdAndDelete(req.params.id);
    if (!pkg) return res.status(404).json({ error: 'Package not found' });
    res.json({ message: 'Package deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
