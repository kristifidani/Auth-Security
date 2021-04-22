let mongoose = require("mongoose");

//create schema
const userSchema = new mongoose.Schema({
    email: String,
    password: String
  });

//create model
module.exports = mongoose.model('User', userSchema);