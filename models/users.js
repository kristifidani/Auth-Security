//environmental variables
require('dotenv').config();
let mongoose = require("mongoose");
const encrypt = require('mongoose-encryption');

//create schema
const userSchema = new mongoose.Schema({
    email: String,
    password: String
  });

//Encrypt db password
userSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ['password'] });

//create model
module.exports = mongoose.model('User', userSchema);