const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res
    .status(200)
    .json({ message: 'Hello from the server side!', App: 'Natours' });
});

app.post('/', (req, res) => {
  res.status(200).send('You can now post in this URL...');
});

// Listining on port
app.listen(port, '127.0.0.1', () => {
  console.log(`App is running on port ${port}...`);
});
