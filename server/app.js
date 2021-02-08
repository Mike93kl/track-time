require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const {MONGO_URI, PORT} = require('./util/keys');
const cors = require('cors');
const app = express();
app.use(express.json());


mongoose.connect(MONGO_URI, {
  useNewUrlParser: true, useUnifiedTopology: true
}, err => {
  if(err) {
    console.error('Could not connect to mongo', err);
    process.exit(-1);
    return;
  }
  console.log('MongoDB connected');
});

// enable cors
app.use(cors({
  origin: 'http://localhost:4200'
}))

app.use('/project', require('./routes/project'));
app.use('/task', require('./routes/task'));
app.use('/track/:taskId', require('./routes/track'));
app.use('/query', require('./routes/query'));

app.listen(PORT, () => {
  console.log(`App running on port: ${PORT}`);
})

