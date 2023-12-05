const Tour = require('../models/tourModel');
const APIFeatures = require('../utils/apiFeatures');

// const fs = require('fs');

// Reading data from local file
// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
// );

// checking if the requested id exists [for all cases getTour,updateTour..]
// exports.checkID = (req, res, next, val) => {
//   console.log(`Tour id is : ${val}`);
//   const id = req.params.id * 1;
//   if (id > tours.length) {
//     // if (!tour) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'ID not found',
//     });
//   }
//   next();
// };
// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(400).json({
//       status: 'fail',
//       message: 'Missing name or price',
//     });
//   }
//   next();
// };

// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(400).json({
//       status: 'fail',
//       message: 'Missing name or price',
//     });
//   }
//   next();
// };

// aliasTopTours() is a middleware function to be called for specific route(ex: /top-5-tours) before getAllTours so the query can be manipulated
exports.aliasTopTours = async (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,difficulty,price,ratingsAverage, summary';
  next();
};

exports.getAllTours = async (req, res) => {
  try {
    // BUILD QUERY

    // 1A) Filtering
    // making copy of query object(a hard copy of the query object, because if we update the querry object without making it solid copy, it will result the changes in the original object)
    // const queryObj = { ...req.query };

    // // we should exclude field such as: page, sort, limit, fields etc.
    // const excludedFields = ['page', 'sort', 'limit', 'fields'];

    // excludedFields.forEach((el) => delete queryObj[el]);

    // console.log(req.query, queryObj);

    // // 1B) Advance Filtering

    // // {difficulty:'easy', duration: {$gte : 5}}
    // //Querry Params: {difficulty:'easy', duration: {gte : 5}}

    // let queryString = JSON.stringify(queryObj);

    // // TO REPLACE WITH: gte, gt, lte, lt
    // queryString = queryString.replace(
    //   /\b(gte|gt|lte|lt)\b/g,
    //   (match) => `$${match}`,
    // );
    // // console.log(JSON.parse(queryString));

    // let query = Tour.find(JSON.parse(queryString));

    // 2) Sorting
    // if (req.query.sort) {
    //   //if results are same second parameter is used to sort as: sort('price ratingsAverage ')
    //   const sortBy = req.query.sort.split(',').join(' ');
    //   // console.log(sortBy);

    //   // SORTING IN ASCENDING ORDER
    //   query = query.sort(sortBy);
    // } else {
    //   query = query.sort('-createdAt');
    // }

    // 3) Field limiting
    // if (req.query.fields) {
    //   const fields = req.query.fields.split(',').join(' ');
    //   // query = query.select('name duration difficulty price')
    //   query = query.select(fields);
    // } else {
    //   query = query.select('-__v');
    // }

    // const query =Tour.find()
    //   .where('duration')
    //   .equals(5)
    //   .where('difficulty')
    //   .equals('easy');

    // using JSEND specification for the response
    /*
      {
        status : "success",
        // Enveloping
        data : {
          ---Original Object--
          
        }
      }
      */

    //4) Pagination
    //page=3&limit=10:1-10 page 1, 11-20 page 2, 21-30 page 3
    // const page = req.query.page * 1 || 1;
    // const limit = req.query.limit * 1 || 1;
    // const skip = (page - 1) * limit;

    // if (req.query.page) {
    //   const numTours = await Tour.countDocuments();
    //   if (skip >= numTours) throw new Error("This page doesn't exits");
    // }
    // query = query.skip(skip).limit(limit);

    // EXECUTE QUERY---------------------------------------------------------------
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const tours = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      result: tours.length,
      data: {
        // url-endpoint(eg:/tours):actual-object
        tours: tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
// ----------------------------------------------------------------------------
exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    // Tour.findOne({_id : req.params.id})

    res.status(200).json({
      status: 'success',
      data: {
        tour: tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  // console.log(req.params);
  // const id = req.params.id * 1;
  // finding the the spcecific object that has id on the request parameter.
  // .find() method returns true if the condition is met otherwise undefined
  // const tour = tours.find((el) => el.id === id);
  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     tours: tour,
  //   },
  // });
};

exports.createTour = async (req, res) => {
  try {
    // const newTour = new Tour({name : "The Forest Hiker",price: 493});
    // newTour.save();
    const newTour = await Tour.create(req.body);

    res.status(201).json({ status: 'success', data: { newTour } });

    // res.status(201).json({
    //.status(201)-The request has been fulfilled and resulted in a new resource being created
    // status: 'success',
    // data: {
    //   tour: newTour,
    // },
    // });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid data sent!!!',
    });
  }
  // console.log(req.body);

  // const newId = tours[tours.length - 1].id + 1;
  // const newTour = Object.assign({ id: newId }, req.body);

  // tours.push(newTour);

  // fs.writeFile(
  //   `${__dirname}/dev-data/data/tours-simple.json`,
  //   JSON.stringify(tours), //converting JS values to JSON
  //   (err) => {
  //     res.status(201).json({
  //       //.status(201)-The request has been fulfilled and resulted in a new resource being created
  //       status: 'success',
  //       data: {
  //         tour: newTour,
  //       },
  //     });
  //   },
  // );
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

// USING "AGGREGATION PIPELINE"----------------------------
exports.getTourStats = async (req, res) => {
  try {
    //we should pass array of stages eg:
    // {$match: {....}},
    // {$group: {....}}
    // {$sort: {....}}
    const stats = await Tour.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } },
      },
      {
        $group: {
          // _id: null,
          // _id: '$ratingsAverage',
          _id: { $toUpper: '$difficulty' },
          num: { $sum: 1 },
          numRating: { $sum: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
      {
        $sort: { avgPrice: -1 },
      },
      // WE CAN ALSO REPEAT STAGES...
      // {
      //   $match: { _id: { $ne: 'EASY' } },
      // },
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        tour: stats,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getMonthyPlan = async (req, res) => {
  try {
    const year = req.params.year * 1;

    const plan = await Tour.aggregate([
      {
        $unwind: '$startDates',
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },

      {
        $group: {
          _id: { $month: '$startDates' },
          numTourStarts: { $sum: 1 },
          tours: { $push: '$name' },
        },
      },

      {
        $addFields: { month: '$_id' },
      },
      {
        $project: { _id: 0 },
      },
      {
        $sort: { numTourStarts: -1 },
      },
      {
        $limit: 12,
      },
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        plan,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
