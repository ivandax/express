const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());


promoRouter.route('/').
all((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
}).
get( (req, res, next)=>{ 
    res.end("We are sending promotions!");
}).
post((req,res,next)=>{ 
    res.end(`Will add the promotion ${req.body.name}`)
}).
put((req,res,next)=>{
    res.statusCode = 403; 
    res.end("Put operation not supported")
}).
delete((req,res,next)=>{
    res.end("Deleting all promotions")
});

//FOR SINGLE REQUESTS:

promoRouter.route('/:promotionId').
get((req, res, next)=>{
    res.end("We are sending promotion: "+req.params.promotionId);
}).
post((req,res,next)=>{
    res.statusCode = 403;
    res.end("Post operation on single item not supported - "+req.params.promotionId)
}).
put((req,res,next)=>{
    res.write("Updating promotion "+req.params.promotionId)
    res.end("Will update the promotion - "+req.body.name+" with details: "+req.body.description)
}).
delete((req,res,next)=>{
    res.end("Deleting single promotion - "+req.params.promotionId);
})

module.exports = promoRouter;