// app.js
const express = require('express');
const ps5bRouter = require('./ps5b.js'); // your router file

const app = express();

// Body parser middleware to handle form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// View engine setup
app.set('views', './views');  // Setting the views directory
app.set('view engine', 'pug');  // Setting Pug as the view engine


// Mount your ps5b router
app.use('/ps5b', ps5bRouter);

// Serve your form on the home route
app.get('/', (req, res) => {
  res.render('index');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});