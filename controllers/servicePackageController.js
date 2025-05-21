// ServicePackage controller for CWSMS
const ServicePackage = require('../models/servicepackage');

exports.createServicePackage = async (req, res) => {
  try {
    const sp = new ServicePackage(req.body);
    await sp.save();
    res.status(201).json(sp);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getServicePackages = async (req, res) => {
  try {
    const sps = await ServicePackage.find();
    res.json(sps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getServicePackageById = async (req, res) => {
  try {
    const sp = await ServicePackage.findById(req.params.id);
    if (!sp) return res.status(404).json({ error: 'ServicePackage not found' });
    res.json(sp);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateServicePackage = async (req, res) => {
  try {
    const sp = await ServicePackage.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!sp) return res.status(404).json({ error: 'ServicePackage not found' });
    res.json(sp);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteServicePackage = async (req, res) => {
  try {
    const sp = await ServicePackage.findByIdAndDelete(req.params.id);
    if (!sp) return res.status(404).json({ error: 'ServicePackage not found' });
    res.json({ message: 'ServicePackage deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
