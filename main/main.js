/*
 * constant
 */
var SCREEN_WIDTH    = 640;
var SCREEN_HEIGHT   = 480;
var SCREEN_CENTER_X = SCREEN_WIDTH/2;
var SCREEN_CENTER_Y = SCREEN_HEIGHT/2;


/*
 * メイン処理(ページ読み込み後に実行される)
 */
tm.main(function() {
    // アプリケーション作成
    var app = tm.app.CanvasApp("#world");
    var game = GameScene();
    
    app.resize(SCREEN_WIDTH, SCREEN_HEIGHT); // リサイズ
    app.fitWindow();    // 自動フィット
    app.background = "rgba(0, 0, 0, 1)";
    
    // シーンを切り替える
    app.replaceScene(game);
    app.currentScene.update = function() {
    	game.updateAll(app.keyboard);
    };
    
    // 実行
    app.run();
});




