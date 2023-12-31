const express = require('express');
// const fs = require('fs');
// const tourController = require('./../controllers/tourController');
const tourController = require('../controllers/tourController');

const router = express.Router();

// Middleware function with custom parameter.
// router.param('id', tourController.checkID);

router.route('/tour-stats').get(tourController.getTourStats);

// /monthly-plan/:year -> :year is url parameter
router.route('/monthly-plan/:year').get(tourController.getMonthyPlan);

router
  .route('/top-5-tours')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router
  .route('/')
  .get(tourController.getAllTours)
  // chaning multiple middlewares
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
