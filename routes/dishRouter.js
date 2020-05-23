const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Dishes = require('../models/dishes');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

//all specifies something we want the app to do to all different methods, regardless of methods
dishRouter.route('/').
// all((req,res,next)=>{
//     res.statusCode = 200;
//     res.setHeader('Content-Type','text/plain');
//     next(); //next allows us to move along to other posible requests
// }).
get( (req, res, next)=>{ //getting or reading from database
    Dishes.find({})
    .then((dishes) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','text/plain');
        res.json(dishes);
    }, (err)=>{next(err)})
    .catch((err)=>{next(err)});
}).
post((req,res,next)=>{ //posting new item to collection
    Dishes.create(req.body)
    .then((dish)=>{
        console.log("Post of Dish ",dish);
        res.statusCode = 200;
        res.setHeader('Content-Type','text/plain');
        res.json(dish);
    }, (err)=>{next(err)})
    .catch((err)=>{next(err)});
}).
put((req,res,next)=>{
    res.statusCode = 403; //no updating on a whole collection, not supported
    res.end("Put operation not supported")
}).
delete((req,res,next)=>{ //dangerous op
    Dishes.remove({})
    .then((res)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','text/plain');
        res.json(res); 
    }, (err)=>{next(err)})
    .catch((err)=>{next(err)});
});

//NOW; FOR SINGLE DISH REQUESTS:

dishRouter.route('/:dishId').
get((req, res, next)=>{
    Dishes.findById(req.params.dishId)
    .then((dishes) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','text/plain');
        res.json(dishes);
    }, (err)=>{next(err)})
    .catch((err)=>{next(err)});
}).
post((req,res,next)=>{
    res.statusCode = 403;
    res.end("Post operation on single item not supported - "+req.params.dishId)
}).
put((req,res,next)=>{
    Dishes.findByIdAndUpdate(req.params.dishId, {
        $set: req.body
    }, {new: true})
    .then((dish)=>{
        console.log("Post of Dish ",dish);
        res.statusCode = 200;
        res.setHeader('Content-Type','text/plain');
        res.json(dish);
    }, (err)=>{next(err)})
    .catch((err)=>{next(err)});
}).
delete((req,res,next)=>{
    Dishes.findByIdAndRemove(req.params.dishId)
    .then((dish)=>{
        console.log("Post of Dish ",dish);
        res.statusCode = 200;
        res.setHeader('Content-Type','text/plain');
        res.json(dish);
    }, (err)=>{next(err)})
    .catch((err)=>{next(err)});
})

module.exports = dishRouter;