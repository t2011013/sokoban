var stage = require('../controllers/stage');

exports.stage = function(req, res) {
  stage.generate(req, res);
};