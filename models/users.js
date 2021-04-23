//environmental variables
require('dotenv').config();
let mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');

//create schema
const userSchema = new mongoose.Schema({
    username: String,
    password: String
  });

userSchema.plugin(passportLocalMongoose);

//create model
module.exports = mongoose.model('User', userSchema);