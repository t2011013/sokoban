tm.define("game.TitleScene", {
  superClass : "tm.app.TitleScene",
 
  init : function() {
    this.superInit({
      title :  "Sokoban : Click Here!",
      width :  game.SCREEN_WIDTH,
      height : game.SCREEN_HEIGHT
    });
    
    // 画面(シーンの描画箇所)をタッチした時の動作
    this.addEventListener("pointingend", function(e) {
      
      // シーンの遷移
      var nextStage = game.NextStageScene();
      e.app.replaceScene(nextStage);
    });
  },
});