const mongoose = require('mongoose');

// Schema for tours
// describing schema:(Blueprint of logical layout of database)
const tourSchema = new mongoose.Schema({
  // field : data-type,
  // Schema Type Options

  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
  rating: {
    type: Number,
    default: 4.5,
  },
});

// modle
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
