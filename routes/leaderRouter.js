const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());


leaderRouter.route('/').
all((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
}).
get( (req, res, next)=>{ 
    res.end("We are sending leaders!");
}).
post((req,res,next)=>{ 
    res.end(`Will add the leader ${req.body.name}`)
}).
put((req,res,next)=>{
    res.statusCode = 403; 
    res.end("Put operation not supported")
}).
delete((req,res,next)=>{
    res.end("Deleting all leaders")
});

//FOR SINGLE REQUESTS:

leaderRouter.route('/:leaderId').
get((req, res, next)=>{
    res.end("We are sending leader: "+req.params.leaderId);
}).
post((req,res,next)=>{
    res.statusCode = 403;
    res.end("Post operation on single item not supported - "+req.params.leaderId)
}).
put((req,res,next)=>{
    res.write("Updating leader "+req.params.leaderId)
    res.end("Will update the leader - "+req.body.name+" with details: "+req.body.description)
}).
delete((req,res,next)=>{
    res.end("Deleting single leader - "+req.params.leaderId);
})

module.exports = leaderRouter;