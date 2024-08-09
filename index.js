const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const dotenv = require("dotenv");
dotenv.config({ path: "src/config/config.env" });

// Middleware setup
app.use(bodyParser.json({ limit: '2gb' }));
app.use(bodyParser.urlencoded({ limit: '2gb', extended: true }));
app.use(cors());

// <---------------------------------------------- Logging Middleware ------------------------------------------------->
const morgan = require("morgan");
app.use(morgan('dev'));
// <---------------------------------------------- main route setup --------------------------------------------------->
const apiRoutes = require('./src/routes');

// Use routes
app.use('/api/v1', apiRoutes);

// Health check
app.get('/', (req, res) => res.status(200).send('Hello world'));

// <------------------------------------------------ error handler ---------------------------------------------------->
const errorHandler = require("./src/middleware/errorHandler");
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  try {
    await require('./src/config/database').sync({ alter: true }); // Sync models with the database
    console.log(`Server running on port ${PORT}`);
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
});
