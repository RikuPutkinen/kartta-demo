require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const markerRouter = require('./controllers/markers')
const reviewRouter = require('./controllers/reviews')

const port = process.env.PORT || 3001;
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/markers', markerRouter)
app.use('/reviews', reviewRouter)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
