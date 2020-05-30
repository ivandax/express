var passport = require("passport");

var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');

//User allows us to use features from mongoose
exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());