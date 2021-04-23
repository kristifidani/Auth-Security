//const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/users");

module.exports = function (passport) {
  //Local strategy
  passport.use(User.createStrategy());

  passport.serializeUser(User.serializeUser());

  passport.deserializeUser(User.deserializeUser());
};
