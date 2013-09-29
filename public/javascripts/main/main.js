/*
 * constant
 */
var game = game || {};

game.SCREEN_WIDTH = 640;
game.SCREEN_HEIGHT = 480;
game.SCREEN_CENTER_X = game.SCREEN_WIDTH/2;
game.SCREEN_CENTER_Y = game.SCREEN_HEIGHT/2;
game.STAGE_URL = "http://localhost:3000/api/stage/";

game.ACTION_NONE = 0;
game.ACTION_RIGHT = 1;
game.ACTION_UP = 2;
game.ACTION_LEFT = 3;
game.ACTION_DOWN = 4;

game.MATRIX_X = 9;
game.MATRIX_Y = 7;
game.PIECE_WIDTH = 21;
game.PIECE_HEIGHT = 21;
game.PLAYER_SPEED = 7;

// main.jsのASSETSに移動した 2013/9/28
var ASSETS = {
  "IMG_PLAYER": "./images/myplayer.png",
  "IMG_BACKGND": "./images/mysheet.png",
  "IMG_BOX": "./images/mysheet.png"
};

/*
 * メイン処理(ページ読み込み後に実行される)
 */
game.mainFunc = function() {
  // アプリケーション作成
  var gameApp = tm.app.CanvasApp("#world");
  var title = game.TitleScene();
  
  gameApp.resize(game.SCREEN_WIDTH, game.SCREEN_HEIGHT); // リサイズ
  //gameApp.fitWindow(); // 自動フィット
  gameApp.background = "rgba(0, 0, 0, 1)";

  var loadingScene = tm.app.LoadingScene({
   assets: ASSETS,
   nextScene: game.TitleScene,
   width: game.SCREEN_WIDTH,
   height: game.SCREEN_HEIGHT
  });
  
  // シーンを切り替える
  //app.replaceScene(title);
  gameApp.replaceScene(loadingScene);
  
  // 実行
  gameApp.run();
  game.mainCanvas = gameApp;
  game.gameApp = gameApp;
};
//起動
tm.main(game.mainFunc);
