var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dishRouter = require('./routes/dishRouter');
var leaderRouter = require('./routes/leaderRouter');
var promoRouter = require('./routes/promoRouter');

const mongoose = require('mongoose');
const Dishes = require('./models/dishes');

//const dbOps = require('./operations'); only useful when using mongoDB module without mongoose.

var app = express();

//const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbName = 'conFusion';

//connection using mongoose...

const connect = mongoose.connect(url+'/'+dbName);

connect.then((db)=>{
  console.log("Connected to db using mongoose"); 
}, (err) => {console.log(err)});

  // Dishes.create({
  //   name: "Chocoblast",
  //   description: "Trial desc"
  // })
  // .then((dish)=>{
  //   console.log("added the "+dish);

  //   return Dishes.findByIdAndUpdate(dish._id, {
  //     $set : {
  //       description : "updated desc"
  //     }
  //   }, {
  //     new : true
  //   }).exec();
  // })
  // .then((dish)=>{
  //   console.log("Retrieved the modified dish - ",dish);
  //   dish.comments.push({
  //     rating: 5,
  //     comment: "Delicious!",
  //     author: "Jimmy John"
  //   });

  //   return dish.save();
  // })
  // .then((dish)=>{
  //   console.log("now the dish with comments - ", dish);
  //   return Dishes.remove({});
  // })
  // .then(()=>{
  //   return mongoose.connection.close();
  // })
  // .catch((err)=>{
  //   console.log(err);
  // })

//Connection using just MongoDB module... 

// MongoClient.connect(url).then((client) => {
//   //assert.equal(err, null); //checks if there is an error and informs, it's like an if.
//   console.log("Connected to Mongo server");

//   const db = client.db(dbName);

//   dbOps.insertDocument(db, {name: "Doughnut", description: "Dessert"}, 'dishes')
//   .then((result)=>{
//     console.log("On app.js, insert document:\n", result.ops);
//     return dbOps.findDocuments(db, 'dishes');
//   })
//   .then((docs)=>{
//     console.log("On app.js, find docs:\n", docs);
//     return dbOps.updateDocument(db, {name:"Doughnut"}, {description: "new desc"}, 'dishes')
//   })
//   .then((result)=>{
//     console.log("On app.js, updated document", result.result);
//     return dbOps.findDocuments(db, 'dishes');
//   })
//   .then((docs)=>{
//     console.log("On app.js, secdon  found docs:\n", docs);
//     return db.dropCollection('dishes')
//   })
//   .then((result)=>{
//     console.log("Dropped collection", result);
//     client.close();
//   }).catch((err)=>{console.log(err)});
// })
// .catch((err)=>{console.log(err)});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dishes', dishRouter);
app.use('/leaders', leaderRouter);
app.use('/promotions', promoRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
