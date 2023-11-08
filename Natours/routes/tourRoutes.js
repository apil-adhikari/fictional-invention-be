const express = require('express');
const fs = require('fs');
// const tourController = require('./../controllers/tourController');
const tourController = require('./../controllers/tourController');

const router = express.Router();

// Middleware function with custom parameter.
router.param('id', tourController.checkID);

router
  .route('/')
  .get(tourController.getAllTours)
  // chaning multiple middlewares
  .post(tourController.checkBody, tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.createTour)
  .delete(tourController.deleteTour);

module.exports = router;
