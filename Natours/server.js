const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

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
  });

/* creating document & testing 
const testTour = new Tour({
  name: 'The Park Camper',
  price: 997,
});

testTour
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.log('ERROR 💥:', err);
  });
*/

const port = process.env.PORT || 3000;
app.listen(port, '127.0.0.1', () => {
  console.log(`App is running on port ${port}...`);
});
