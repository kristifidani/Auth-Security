const express = require("express");
const router = express.Router();
const md5 = require('md5');

//Import DB models
const User = require('../models/users');


//Register page
router.get('/register', (req, res) => {
    res.render('register');
});

//Create new user
router.post('/register', (req, res) => {
    const newUser = new User({
        email: req.body.email,
        password: md5(req.body.password)
    });

    newUser.save((err) => {
        err ? console.log(err) : res.render('secrets');
    });
});

//Login page
router.get('/login', (req, res) => {
    res.render('login');
});

//Login user
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = md5(req.body.password);

    User.findOne({email}, (err, foundUser) => {
        if(err){
            console.log(err);
        } else {
            if(foundUser.password === password){
                res.render('secrets');
            } else {
                console.log('Passwords dont match.')
            }
        }
    });
});



module.exports = router;