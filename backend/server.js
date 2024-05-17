const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');
const { EmailStats } = require('./models/Email');

const app = express();


var corsOptions = {
  origin: 'https://email-testing-platform.vercel.app',
  optionsSuccessStatus: 200
}

app.use(bodyParser.json());
app.use(cors(corsOptions));

mongoose.connect(config.mongoURI).then(async () => {
  console.log('MongoDB connected'); 
  const stats = await EmailStats.findOne();
  if (!stats) {
    await new EmailStats().save();
    console.log('Initialized EmailStats');
  }
})
  .catch(err => console.log(err));

// Routes
app.use('/api', require('./routes/emails'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
