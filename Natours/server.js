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

const port = 3000 || process.env.PORT;
app.listen(port, '127.0.0.1', () => {
  console.log(`App is running on port ${port}...`);
});
