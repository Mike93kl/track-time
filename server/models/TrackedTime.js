const mongoose = require( "mongoose" );
const Schema = mongoose.Schema;

const TrackedTime = new Schema({
  task: {
    type: Schema.Types.ObjectId,
    ref: 'Task'
  },
  startTime: {
    type: Number,
    required: false,
  },
  endTime: {
    type: Number,
    required: false,
  },
  status: {
    type: String,
    enum: ['started','finished', 'neutral'],
    default: 'started'
  }
})

module.exports = mongoose.model('TrackedTime', TrackedTime);
