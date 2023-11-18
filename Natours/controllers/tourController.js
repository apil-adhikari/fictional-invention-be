const Tour = require('../models/tourModel');
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

exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
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

    res.status(200).json({
      status: 'success',
      result: tours.length,
      data: {
        // url-endpoint(eg:/tours):actual-object,
        tours: tours,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

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

  console.log(req.params);
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
    res.status(400).json({
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
