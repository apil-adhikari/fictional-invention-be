const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });
// env set by Express
// console.log(app.get('env'));

// env set by Node
// console.log(process.env);
// console.log(process.env);

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    // useNewUrlParser: true,
    // useCreatseIndex: true,
    // useFindAndModify: false,
  })
  .then((con) => {
    console.log('DB connection successful!');
    console.log(con.connection);
  });

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

const port = process.env.PORT || 3000;
app.listen(port, '127.0.0.1', () => {
  console.log(`App is running on port ${port}...`);
});
