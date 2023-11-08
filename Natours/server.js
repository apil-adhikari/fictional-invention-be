const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');
// env set by Express
// console.log(app.get('env'));

// env set by Node
// console.log(process.env);
// console.log(process.env);

const port = process.env.PORT || 3000;
app.listen(port, '127.0.0.1', () => {
  console.log(`App is running on port ${port}...`);
});
