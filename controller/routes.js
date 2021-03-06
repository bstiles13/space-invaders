var express = require('express');
var path = require("path");
var dbController = require('./dbController.js');

var router = new express.Router();
// Saves new user scores to Mongo
router.post("/submit", dbController.submit);

// Queries global score history from Mongo and populates Scores page
router.get("/getscores", dbController.getScores);

// Queries personal score history from Mongo and populates Scores page (if signed in)
router.get("/myscores", dbController.myScores);

// Homepage
router.get("*", function (req, res) {
  res.sendFile(path.resolve(__dirname, "../build/index.html"));
});

module.exports = router;