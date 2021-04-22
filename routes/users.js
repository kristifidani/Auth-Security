const express = require("express");
const router = express.Router();
//removed when implementing lvl 4 bycrypt
//const md5 = require('md5');
const bcrypt = require('bcrypt');
const saltRounds = 10;

//Import DB models
const User = require('../models/users');


//Register page
router.get('/register', (req, res) => {
    res.render('register');
});

//Create new user
router.post('/register', (req, res) => {
    //generate hash pass and salt with bcrypt
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        const newUser = new User({
            email: req.body.email,
            password: hash
        });
    
        newUser.save((err) => {
            err ? console.log(err) : res.render('secrets');
        });
    });   
});

//Login page
router.get('/login', (req, res) => {
    res.render('login');
});

//Login user
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email}, (err, foundUser) => {
        if(err){
            console.log(err);
        } else {
            //Compare passwords with bcrypt
            bcrypt.compare(password, foundUser.password, function(err, result) {
                if(result === true){
                    res.render('secrets');
                } else {
                    console.log(err);
                }
            });                
        }
    });
});



module.exports = router;