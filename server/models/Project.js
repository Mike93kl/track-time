const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Project = new Schema({
  title: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Project', Project);
