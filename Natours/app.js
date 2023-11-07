const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1) MIDDLEWARES

app.use(morgan('dev'));

app.use(express.json());

// Custom Middleware
app.use((req, res, next) => {
  console.log('Hello from the middleware👋...');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

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

// .get():retrive the data
// app.get('/api/v1/tours', getAllTours);

/*------------------------*/
// Route Parameters
// Responding to URL parameters
// Create variable using /:var in the URL(eg:/api/v1/tours/:id/:x/:y)
// Optional Parameter(/:var?): in the URL(eg:/api/v1/tours/:id/:x/:y?) y part is now opional parameter.
// app.get('/api/v1/tours/:id', getTour);

/*------------------------*/
//.post(): create new
// With POST request, we can send data from CLIENT to the SERVER & the data is availiable on the reques

// app.post('/api/v1/tours', createTour);
/*------------------------*/

//Updating Data [1) PUT, 2) PACTCH]
//Handling PATCH Requests to Update data
// app.patch('/api/v1/tours/:id', createTour);

// Deleting Data
// Handling DELETE Requests
// app.delete('/api/v1/tours/:id', deleteTour);

// Refactoring the code

// 3) ROUTES

// Mounting Router(multiple routers)
// Created Routers

// Mounting Routers
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
