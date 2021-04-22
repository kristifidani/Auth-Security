const express = require('express');
const ejs = require('ejs');
const mongoose = require("mongoose");

//Initialize express
const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));

//Set up DB connection
mongoose.connect("mongodb://localhost:27017/authSecurityDB", {
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
const port = 3000;
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});