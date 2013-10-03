
tm.define("game.NextStageScene", {
  //superClass: "tm.app.Scene",
  superClass : "tm.app.TitleScene",
  TITLE_CLEAR : "Game Clear!",
  TITLE_START : "Start stage: Click Here!",

  init: function() {
    // 親の初期化
    //this.superInit();

    game.gameLevel = game.gameLevel || 0;
    game.gameLevel++;

    this.superInit({
      title :  (game.gameLevel > game.CLEAR_LEVEL ?  this.TITLE_CLEAR : this.TITLE_START)
    , width :  game.SCREEN_WIDTH
    , height : game.SCREEN_HEIGHT
    });

    if (game.gameLevel > game.CLEAR_LEVEL) {
      this.sendResult();

      game.gameLevel = 0;
      game.scoreArray = [];
      this.toTitle();
    } else {
      this.applyNext();
    }
  },

  applyNext: function() {

    $.get(game.STAGE_URL + game.gameLevel, function(data){
      window.localStorage.setItem("stageLevel[" + game.gameLevel + "]"
    , JSON.stringify(data)); 
    });

    this.addEventListener("pointingend", function(e) {

      var stageData = JSON.parse(localStorage.getItem("stageLevel[" + game.gameLevel + "]"));
      var gameScene = game.GameScene(stageData);
      game.gameApp.replaceScene(gameScene);
      game.gameApp.currentScene.update = function() {
        gameScene.updateAll(game.gameApp.keyboard);
      };
    });
  },

  sendResult: function() {

    var sum = 0;

    for (var i = 0; i < game.scoreArray.length; i++) {
      sum += (game.scoreArray[i] * 1);
    }

    $.post(game.RANKING_URL + (sum / game.scoreArray.length), function(data){
      /*  */
    });
  },

  toTitle: function() {

    this.addEventListener("pointingend", function(e) {

      var loadingScene = tm.app.LoadingScene({
       assets: ASSETS,
       nextScene: game.TitleScene,
       width: game.SCREEN_WIDTH,
       height: game.SCREEN_HEIGHT
      });

      // シーンを切り替える
      //app.replaceScene(title);
      game.gameApp.replaceScene(loadingScene);
    });

  }
});