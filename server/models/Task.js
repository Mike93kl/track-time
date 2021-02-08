const mongoose = require( "mongoose" );
const Schema = mongoose.Schema;

const Task = new Schema( {
  project: {
    type: Schema.Types.ObjectId,
    ref: "Project"
  },
  identifier: {
    type: String,
    required: true
  },
  activeTracker: {
    type: Schema.Types.ObjectId,
    ref: 'TrackedTime'
  },
  trackedTimes: [{
    type: Schema.Types.ObjectId,
    ref: 'TrackedTime'
  }]
} );

module.exports = mongoose.model( "Task", Task );
