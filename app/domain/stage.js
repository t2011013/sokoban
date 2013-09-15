"use strict";
var rules = exports.rules || {'FLAT': 0, 'WALL': 1, 'TARGET': 4};
var defaults =  {'row': 9, 'col': 9, 'box': 2};

exports.data = function(f, cb, options) {
  options = options || defaults;
  var fs = require('fs');

  fs.exists(f, function(exists) {
    console.log('File accessed: ' + f);
    if (exists) {
      fs.readFile(f, { encoding: 'utf8'}, function(err, data) {
        cb(err, eval(data));
      });
    } else {
      cb(false, [random(options)]);
    }
  });
};

function random(options) {
  options = options || defaults;

  /** const */
  var PLAYER = 1;

  /** utils */
  // only positive
  var rand = function(start, end) {
    start = start || 0;
    end = end || 100;

    return start + Math.floor(Math.random() * (end - start));
  };
  // generate unique coordinates
  var coordinate = function(options) {
    var coordinate = {};
    var coordinates = [];
    var order = options.box * 2 + PLAYER; // box & target + player
    var exists;

    while(order) {
      coordinate = {
        // -1 is setup in order to keep wall.
        "row": rand(1, options.row-1),
        "col": rand(1, options.col-1)
      };

      exists = coordinates.some(
        function(arr) {
          return arr.row == coordinate.row &&
                   arr.col == coordinate.col; });

      if (!exists) {
        coordinates.push(coordinate);
        order -= 1;
      }
    }

    return coordinates;
  };

  /** variables */
  var stage = stageTemplate(options);
  var coordinates = coordinate(options);
  var box = options.box;
  var bg = level(stage.background.row, stage.background.col, rules);

  /** build data */
  stage.player.coordinate = coordinates.pop();

  var c;
  while (box) {
    stage.box.coordinate.push(coordinates.pop());

    c = coordinates.pop();
    stage.target.coordinate.push(c);
    bg[c.row][c.col] = rules.TARGET;
    box -= 1;
  }
  stage.background.data = Array.prototype.concat.apply([], bg);

  return stage;
}
exports.random = random;

function stageTemplate(options) {
  options = options || {'row': 0, 'col': 0};
  return  {
      "background": {
        "row": options.row,
        "col": options.col,
        "data": []
      },
      "player": {
        "coordinate": {
        }
      },
      "box": {
        "coordinate": []
      },
      "target": {
        "coordinate": []
      }
  };
}

function level(row, col, options) {
  // initial data
  row = row || 9;
  col = col || 9;
  options = options || {'FLAT': 0, 'WALL': 1};

  // level the ground for stage
  var stage = [];
  walls(row, col, options.WALL).forEach(function(cols, idx) {
    var data = [];
    if (idx === 0 || idx === row-1) {
      stage[idx] = cols;
    } else {
      stage[idx] = cols.map(function(col, idx) {
        if (idx === 0 || idx === cols.length-1) {
          return col;
        }
        return options.FLAT;
      });
    }
  });

  return stage;
}

function walls(row, col, wall) {
  var data = [];
  var wallgen = function(count, wall) {
    wall = wall || 1;
    if (count < 1) {
      return [];
    } else {
      return [wall].concat(wallgen(count-1, wall));
    }
  };
  var i = 0;
  for (; i < row; i+=1) {
    data[i] = wallgen(col);
  }

  return data;
}