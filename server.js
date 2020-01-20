//Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var mongoose = require('mongoose');
var routes = require('./controller/routes.js');

//Define server and middleware
var PORT = process.env.PORT || 3001;
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.use('/', routes);

//Start MongoDB
var db = process.env.MONGODB_URI || "mongodb://localhost/space_invaders_db";
mongoose.connect(db, function (error) {
  if (error) {
    console.error(error);
  } else {
    console.log("mongoose connection is successful");
  }
});

// Start the server
app.listen(PORT, function () {
  console.log("Now listening on port %s! Visit localhost:%s in your browser.", PORT, PORT);
});