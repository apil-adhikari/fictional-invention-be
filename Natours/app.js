const fs = require('fs');
const express = require('express');

const app = express();

// Middleware
app.use(express.json());

const port = 3000;

// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .json({ message: 'Hello from the server side!', App: 'Natours' });
// });

// app.post('/', (req, res) => {
//   res.status(200).send('You can now post in this URL...');
// });

//JSON. parse() is a crucial method for converting JSON data in string form into Javascript objects.
// typeof tours->object;after parsing
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

/*------------------------*/
// .get():retrive the data
app.get('/api/v1/tours', (req, res) => {
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
});

/*------------------------*/
// Route Parameters
// Responding to URL parameters
// Create variable using /:var in the URL(eg:/api/v1/tours/:id/:x/:y)
// Optional Parameter(/:var?): in the URL(eg:/api/v1/tours/:id/:x/:y?) y part is now opional parameter.
app.get('/api/v1/tours/:id', (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;

  // finding the the spcecific object that has id on the request parameter.
  // .find() method returns true if the condition is met otherwise undefined
  const tour = tours.find((el) => el.id === id);

  // checking if the requested id exists?
  if (id > tours.length) {
    // if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'ID not found',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tours: tour,
    },
  });
});

/*------------------------*/
//.post(): create new
// With POST request, we can send data from CLIENT to the SERVER & the data is availiable on the reques

app.post('/api/v1/tours', (req, res) => {
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
});
/*------------------------*/

//Updating Data [1) PUT, 2) PACTCH]
//Handling PATCH Requests to Update data
app.patch('/api/v1/tours/:id', (req, res) => {
  if (req.params.id * 1 > tours.length) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated Tour here...>',
    },
  });
});

// Listining on port
app.listen(port, '127.0.0.1', () => {
  console.log(`App is running on port ${port}...`);
});
