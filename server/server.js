require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const markerRouter = require('./controllers/markers')
const reviewRouter = require('./controllers/reviews')

app.use(express.static('dist'))
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI);

app.use('/api/markers', markerRouter)
app.use('/api/reviews', reviewRouter)

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
