const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

// checking if the requested id exists [for all cases getTour,updateTour..]
exports.checkID = (req, res, next, val) => {
  console.log(`Tour id is : ${val}`);
  const id = req.params.id * 1;
  if (id > tours.length) {
    // if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'ID not found',
    });
  }
  next();
};
exports.getAllTours = (req, res) => {
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

  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    result: tours.length,
    data: {
      // url-endpoint(eg:/tours):actual-object,
      tours: tours,
    },
  });
};

exports.getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;

  // finding the the spcecific object that has id on the request parameter.
  // .find() method returns true if the condition is met otherwise undefined
  const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      tours: tour,
    },
  });
};

exports.createTour = (req, res) => {
  // console.log(req.body);

  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/datat/tours-simple.json`,
    JSON.stringify(tours), //converting JS values to JSON
    (err) => {
      res.status(201).json({
        //.status(201)-The request has been fulfilled and resulted in a new resource being created
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated Tour here...>',
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
