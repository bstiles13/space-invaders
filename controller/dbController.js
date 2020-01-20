var Score = require('../models/score.js');

module.exports = {
    // Saves new user scores to Mongo
    submit: function(req, res) {
        const { player, picture, email, score } = req.body;
        Score.create({ player, picture, email, score }, function (err, newScore) {
            if (err) return res.status(400).send('Unable to save score');

            res.json(newScore);
          });
    },

    // Queries global score history from Mongo and populates Scores page
    getScores: function(req, res) {
        Score.find().sort({ score: -1 }).limit(15).exec(function (err, docs) {
            if (err) return res.status(400).send('Unable to get leaderboard');

            res.json(docs);
          });
    },

    // Queries personal score history from Mongo and populates Scores page (if signed in)    
    myScores: function(req, res) {
      console.log('my scores');
        Score.find({ email: req.query.email }).sort({ score: -1 }).limit(15).exec(function (err, docs) {
            if (err) return res.status(400).send('Unable to get your scores');

            res.json(docs);
          })
    }
}