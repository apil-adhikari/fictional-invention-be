const mongoose = require('mongoose');

// Schema for tours
// describing schema:(Blueprint of logical layout of database)
const tourSchema = new mongoose.Schema({
  // field : data-type,
  // Schema Type Options

  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: [true, 'A tour name must be unique'],
    trim: true,
  },
  duration: {
    type: Number,
    require: [true, 'A tour must have a duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A group must have a group size'],
  },
  difficulty: {
    type: String,
    require: [true, 'A group must have diffuculty'],
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    required: [true, 'A tour must have a description'],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have cover image'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDates: [Date],
});

// modle
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
