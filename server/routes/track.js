const router = require( "express" ).Router( { mergeParams: true } );
const Task = require( "../models/Task" );
const TrackedTime = require( "../models/TrackedTime" );
const { generateId } = require( "../util/utils" );

// task middleware
router.use( function ( req, res, next ) {
  const taskId = req.params.taskId;
  Task.findOne( { _id: taskId } )
    .populate( "activeTracker" )
    .populate( "trackedTimes" )
    .then( task => {
      if ( !task ) {
        throw "Task not found";
      }
      req.__task = task;
      next();
    } )
    .catch( e => {
      console.log( e );
      res.status( typeof e === "string" ? 404 : 500 ).send();
    } );

} );

router.post( "/start", async ( req, res ) => {
  if ( req.__task.activeTracker.status === "started" ) {
    return res.status( 400 ).json( { message: "Already tracking time for this task" } );
  }

  if ( req.__task.activeTracker.status === "finished" ) {
    const trackerId = generateId();
    await new TrackedTime( {
      _id: trackerId,
      startTime: new Date().getTime(),
      task: req.__task._id,
      status: "started"
    } ).save();
    req.__task.trackedTimes.push( trackerId );
    req.__task.activeTracker = trackerId;
    await req.__task.save();
    return res.status( 204 ).send();
  }

  // is neutral
  await TrackedTime.updateOne( { _id: req.__task.activeTracker._id }, {
    status: "started",
    startTime: new Date().getTime()
  } );
  res.status( 204 ).send();
} );

router.post( "/end", async ( req, res ) => {
  await TrackedTime.updateOne( { _id: req.__task.activeTracker._id }, {
    endTime: new Date().getTime(),
    status: "finished"
  } );
  res.status( 204 ).send();
} );


module.exports = router;
