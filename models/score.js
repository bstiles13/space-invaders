var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var scoreSchema = new Schema({
    player: String,
    picture: String,
    score: Number,
    email: String,
    date: { type: Date, default: Date.now }
});

var Score = mongoose.model("Score", scoreSchema);

module.exports = Score;