const express = require('express');
const router = express.Router();
const servicePackageController = require('../controllers/servicePackageController');

router.post('/', servicePackageController.createServicePackage);
router.get('/', servicePackageController.getServicePackages);
router.get('/:id', servicePackageController.getServicePackageById);
router.put('/:id', servicePackageController.updateServicePackage);
router.delete('/:id', servicePackageController.deleteServicePackage);

module.exports = router;
