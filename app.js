var createError = require('http-errors');
var express = require('express');
var path = require('path');
//var cookieParser = require('cookie-parser'); if we use sessions, we need no cookies for auth
var logger = require('morgan');
var session = require('express-session');
var FileStore = require('session-file-store')(session);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/usersRouter');
var dishRouter = require('./routes/dishRouter');
var leaderRouter = require('./routes/leaderRouter');
var promoRouter = require('./routes/promoRouter');

const mongoose = require('mongoose');

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

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser('1234004321'));

app.use(session({
  name: 'session-id',
  secret: '1234004321',
  saveUninitialized : false,
  resave : false,
  store: new FileStore()
}))

app.use('/', indexRouter);
app.use('/users', usersRouter);

//authentication
const auth = (req, res, next) => {
  console.log("logging headers",req.headers);
  console.log("Logging session: ",req.session);

  //if user is not authenticated yet---
  if(!req.session.user){
    var err = new Error("You are not authenticated.");
    err.status = 401;
    next(err);
  }
   else{
    if(req.session.user === 'authenticated'){
      next()
    } else{ //this is unlikely to occur, but for the sake of completeness
      var err = new Error("You are not authenticated.");
      err.status = 403;
      next(err);  
    }
  }
}

app.use(auth);
//this following statement allows the server to serve static files, auth would go before
app.use(express.static(path.join(__dirname, 'public')));

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
