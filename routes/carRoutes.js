const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');

// Create a new car
router.post('/', carController.createCar);
// Get all cars
router.get('/', carController.getCars);
// Get a single car by ID
router.get('/:id', carController.getCarById);
// Update a car by ID
router.put('/:id', carController.updateCar);
// Delete a car by ID
router.delete('/:id', carController.deleteCar);

module.exports = router;
