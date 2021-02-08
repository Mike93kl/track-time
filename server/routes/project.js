const router = require( "express" ).Router();
const Project = require( "../models/Project" );

router.get( "/", async ( req, res ) => {
  const projects = await Project.find();
  return res.json( projects );
} );

router.post( "/", async ( req, res ) => {
  const project = await Project.create( req.body );
  return res.json( project );
} );

router.put( "/", async ( req, res ) => {
  const copy = Object.assign( {}, req.body );
  delete copy._id;
  const update = await Project.updateOne( { _id: req.body._id }, copy );
  if ( update.nModified === 1 ) {
    return res.json( req.body );
  } else if ( update.nModified === 0 ) {
    return res.status( 204 ).send();
  } else {
    return res.status( 400 ).send();
  }
} );

router.delete( "/:id", async ( req, res ) => {
  await Project.deleteOne( { _id: req.params.id } );
  return res.status( 204 ).send();
} );

module.exports = router;
