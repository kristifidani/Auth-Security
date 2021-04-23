//environmental variables
require("dotenv").config();
//const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/users");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

module.exports = function (passport) {
  //Local strategy
  passport.use(User.createStrategy());

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/secrets",
      },
      function (accessToken, refreshToken, profile, cb) {
        //console.log(profile);
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
          return cb(err, user);
        });
      }
    )
  );
};
