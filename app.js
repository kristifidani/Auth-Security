//environmental variables
require('dotenv').config();
const express = require('express');
const ejs = require('ejs');
const mongoose = require("mongoose");

//Initialize express
const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));

//Set up DB connection
mongoose.connect(process.env.DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
//check if we have a successfull connections
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Failed to connect"));
db.once("open", function () {
  console.log("DB connected");
});

//Route files
let users = require("./routes/users");
app.use("/", users);

//Home routes
app.get('/', (req, res) => {
    res.render('home');
});


//Initialize server
app.listen(process.env.PORT, () => {
    console.log(`Server started on port: ${process.env.PORT}`);
});