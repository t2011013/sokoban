tm.define("game.NextStageScene", {
  //superClass: "tm.app.Scene",
  superClass : "tm.app.TitleScene",
  
  init: function() {
    // 親の初期化
    //this.superInit();
    this.superInit({
      title :  "Start stage: Click Here!",
      width :  game.SCREEN_WIDTH,
      height : game.SCREEN_HEIGHT
    });
    
    game.gameLevel = game.gameLevel || 0;
    game.gameLevel++;

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

  }
});