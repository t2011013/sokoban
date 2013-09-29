
/**
 * リソースの読み込み
 */

/**
 * 背景データ管理クラス
 */
tm.define("game.BackGround", {

  //背景の種類を保存する一次元配列
  bg : null,

  owner : null,

  //コンストラクタ
  //引数は背景チップの横数、縦数
  init: function(owner, _bgData) {

    //引数のチェック
    this.owner = owner;

    _bgData = _bgData || [];

    //背景ピースオブジェクトを格納する配列
    this.bg = new Array(owner.matrix.col * owner.matrix.row);

    for (var i = 0; i < this.bg.length; i++) {
      var wkPx = owner.matrix.coordinate((i % owner.matrix.col) + 1, Math.floor(i / owner.matrix.col) + 1);

      this.bg[i] = game.BgPiece(_bgData[i],
                          game.PIECE_WIDTH,
                          game.PIECE_HEIGHT,
                          wkPx.pxX,
                          wkPx.pxY
                          );
    }
  },

  addBg : function(sceneObj) {
    for (var i = 0; i < this.bg.length; i++) {
      sceneObj.addChild(this.bg[i]);
    }
  },

  getBgPiece : function(x, y) {
    return this.bg[(y - 1) * this.owner.matrix.col + (x - 1)];
  },

  isWall : function(x, y) {
    return (this.getBgPiece(x, y).type === 1);
  },

  isCheckPoint : function(x, y) {

    return (this.getBgPiece(x, y).type === 4);
  }

});

/**
 * 背景ピースクラス
 */
tm.define("game.BgPiece", {
  superClass : "tm.app.AnimationSprite",

  //スプライトシート
  //ss : null,

  //背景の種類
  type : 0,

  //コンストラクタ
  init: function(_type, _width, _height, _x, _y) {

    //背景の種類を設定
    this.type = _type = _type || 0;

    //スプライトシートの設定
    this.ss = tm.app.SpriteSheet({
      image : "IMG_BACKGND",

      //フレームのサイズ設定
      frame: {
        width : _width,
        height : _height
      }
    });
    this.superInit(this.ss, _width, _height);//スプライトのサイズを設定
    this.setPosition(_x, _y);//スプライトの座標を設定
    this.currentFrame = _type;
  },
});
