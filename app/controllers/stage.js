"use strict";
var logic = require('../domain/stage');

exports.generate = function(req, res) {
  logic.data(path(req.params.stage), function(err, data) {
    var headers = {'Content-Type': 'application/json'};
    if (err) {
      res.writeHead(500, headers);
      res.end(JSON.stringify({"error": "server error"}));
      return;
    }
    res.writeHead(200, headers);
    res.end(JSON.stringify(data));
    return;
  });
};

function path(stage) {
  var path = require('path');
  stage = path.normalize(stage);
  return path.join(__dirname, '/../../data/stages', stage + '.json');
}
