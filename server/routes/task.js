const router = require( "express" ).Router();
const Task = require( "../models/Task" );
const TrackedTime = require( "../models/TrackedTime" );
const { generateId } = require( "../util/utils" );

router.get( "/", async ( req, res ) => {
  const projection = {
    task: 0, __v: 0
  };
  const tasks = await Task.find()
    .populate( "project" )
    .populate( "trackedTimes", projection)
    .populate('activeTracker', projection)
  return res.json( tasks );
} );

router.post( "/", async ( req, res ) => {
  const {
    identifier, project
  } = req.body;
  const trackerId = generateId();
  const task = await Task.create( {
    identifier,
    project,
    activeTracker: trackerId,
    trackedTimes: [trackerId]
  } );
  await TrackedTime.create( {
    _id: trackerId,
    task: task._id,
    status: "neutral"
  } );
  res.json( task );
} );

router.put( "/:id", async ( req, res ) => {
  const {
    identifier, project
  } = req.body;
  const task = await Task.updateOne( { _id: req.params.id }, { identifier, project } );
  return res.json( task );
} );

module.exports = router;
