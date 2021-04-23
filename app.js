//environmental variables
require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");

const session = require("express-session");
const passport = require("passport");

//Initialize express
const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

//Express session
app.use(
  session({
    secret: process.env.SECRET_2,
    resave: false,
    saveUninitialized: false,
  })
);

//Set up DB connection
mongoose.connect(process.env.DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
//check if we have a successfull connections
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Failed to connect"));
db.once("open", function () {
  console.log("DB connected");
});

//Initialize passport
app.use(passport.initialize());
app.use(passport.session());
//Passport config
require("./config/passport")(passport);

//Route files
let users = require("./routes/users");
app.use("/", users);

//Home routes
app.get("/", (req, res) => {
  res.render("home");
});

//Initialize server
app.listen(process.env.PORT, () => {
  console.log(`Server started on port: ${process.env.PORT}`);
});
