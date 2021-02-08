const router = require( "express" ).Router();
const TrackedTime = require( "../models/TrackedTime" );

function getPastDate( daysToSubtract ) {
  return new Date( new Date().getTime() - ( 36e5 * 24 * daysToSubtract ) );
}

function setDate( date, toStart ) {
  if ( toStart ) {
    date.setHours( 0, 1, 0 );
  } else {
    date.setHours( 23, 59, 0 );
  }
  return date.getTime();
}

// dateRange = {startDate: timestamp, endDate: timestamp}
async function queryRange( req, res ) {
  const { startDate, endDate } = req.dateRange;
  const trackedTimes = await TrackedTime.find( {
    startTime: { $gte: startDate, $lte: endDate }
  } ).sort( { startDate: 1 } ).populate( {
    path: "task",
    populate: {
      path: "project",
      select: {
        title: 1
      }
    },
    select: {
      identifier: 1,
      project: 1
    }
  } );
  res.json( { trackedTimes, from: startDate, to: endDate } );
}

router.get( "/beginning", async ( req, res ) => {
  const trackedTimes = await TrackedTime.find();
  return res.json( trackedTimes );
} );
// ?startDate=<timestamp>&endDate=<timestamp>
router.get( "/", ( req, res, next ) => {
  req.dateRange = req.query;
  return next();
}, queryRange );
router.get( "/today", ( req, res, next ) => {
  const start = new Date();
  const end = new Date();
  req.dateRange = {
    startDate: setDate( start, true ),
    endDate: setDate( end, false )
  };
  return next();
}, queryRange );

router.get( "/lastweek", ( req, res, next ) => {
  req.dateRange = {
    startDate: setDate( getPastDate( 7 ), true ),
    endDate: setDate( new Date(), false )
  };
  return next();
}, queryRange );

router.get( "/lastmonth", ( req, res, next ) => {
  req.dateRange = {
    startDate: setDate( getPastDate( 30 ), true ),
    endDate: setDate( new Date(), false )
  };
  return next();
}, queryRange );

module.exports = router;
