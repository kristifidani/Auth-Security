const express = require("express");
const router = express.Router();
const passport = require("passport");

//Import DB models
const User = require("../models/users");

//Secret page after login
router.get("/secrets", ensureAuthenticated, (req, res) => {
  //pick users where secret field is not null
  User.find({ secret: { $ne: null } }, (err, foundUsers) => {
    if (err) {
      console.log(err);
    } else {
      if (foundUsers) {
        res.render("secrets", { usersWithSecrets: foundUsers });
      }
    }
  });
});

// get Submit page
router.get("/submit", ensureAuthenticated, (req, res) => {
  res.render("submit");
});

//Post to submit
router.post("/submit", (req, res) => {
  const submittedSecret = req.body.secret;
  User.findById(req.user.id, (err, foundUser) => {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        foundUser.secret = submittedSecret;
        foundUser.save((err) => {
          err ? console.log(err) : res.redirect("/secrets");
        });
      }
    }
  });
});

//Google sign in page
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

//Google after sign in callback route
router.get(
  "/auth/google/secrets",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect secrets.
    res.redirect("/secrets");
  }
);

//Register page
router.get("/register", (req, res) => {
  res.render("register");
});

//Create new user
router.post("/register", function (req, res) {
  User.register(
    { username: req.body.username },
    req.body.password,
    function (err, user) {
      if (err) {
        console.log(err);
        res.redirect("/register");
      } else {
        console.log("User created");
        res.redirect("/login");
      }
    }
  );
});

//Login page
router.get("/login", (req, res) => {
  res.render("login");
});

//Login user
router.post("/login", (req, res) => {
  const newUser = new User({
    username: req.body.username,
    password: req.body.password,
  });
  req.logIn(newUser, (err) => {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, () => {
        res.redirect("/secrets");
      });
    }
  });
});

//Logout
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

//Access control
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    //res.redirect("/");
    res.redirect("/login");
  }
}

module.exports = router;
