game.ACTION_NONE = game.ACTION_NONE || 0;
game.ACTION_RIGHT = game.ACTION_RIGHT || 1;
game.ACTION_UP = game.ACTION_UP || 2;
game.ACTION_LEFT = game.ACTION_LEFT || 3;
game.ACTION_DOWN = game.ACTION_DOWN || 4;

/**
 * リソースの読み込み
 */

/**
 * はこデータ管理クラス
 */
tm.define("game.Box", {

  //はこの種類を保存する変数
  boxPiece : null,

  speed : 0,
  velocity : null,

  destX : 0,
  destY : 0,

  action : game.ACTION_NONE,

  currentX : 1,
  currentY : 1,

  owner : null,

  checkPoint : false,

  //コンストラクタ
  //引数は初期位置（マスのX座標・Y座標）
  init: function(owner, x, y) {

    //引数のチェック
    this.currentX = x = x || 1;
    this.currentY = y = y || 1;

    this.owner = owner;

    //はこピースオブジェクトを格納する変数
    var wkPx = owner.matrix.coordinate(x, y);

    this.boxPiece = game.BoxPiece(8,
                            game.PIECE_WIDTH,
                            game.PIECE_HEIGHT,
                            wkPx.pxX,
                            wkPx.pxY
                            );

    this.speed = 0;
    this.velocity = tm.geom.Vector2(0, 0); // ベクトルをセット
    this.destPxX = this.boxPiece.x;
    this.destPxY = this.boxPiece.y;
  },

  addBox : function(sceneObj) {
    sceneObj.addChild(this.boxPiece);
  },

  update: function(){
  
     if (this.owner.clear) {
       return;
     }

     this.checkPoint = false;

     if (this.owner.backGnd.isCheckPoint(this.currentX, this.currentY)
        && this.action === game.ACTION_NONE) {
       this.checkPoint = true;
     };

     switch(this.action) {
       case game.ACTION_RIGHT:
         this.boxPiece.x += game.PLAYER_SPEED;
         if (this.boxPiece.x >= this.destPxX) { this.action = game.ACTION_NONE; this.currentX++; }
         break;
       case game.ACTION_UP:
         this.boxPiece.y -= game.PLAYER_SPEED;
         if (this.boxPiece.y <= this.destPxY) { this.action = game.ACTION_NONE; this.currentY--; }
         break;
      case game.ACTION_LEFT:
        this.boxPiece.x -= game.PLAYER_SPEED;
        if (this.boxPiece.x <= this.destPxX) { this.action = game.ACTION_NONE; this.currentX--; }
         break;
       case game.ACTION_DOWN:
         this.boxPiece.y += game.PLAYER_SPEED;
         if (this.boxPiece.y >= this.destPxY) { this.action = game.ACTION_NONE; this.currentY++; }
         break;
       default:
         break;
     }

  },

  move : function(angle) {

    var destX = this.currentX;
    var destY = this.currentY;

    switch(angle){
      case 0:
        this.boxPiece.imageRight();
        destX++;
        wkAction = game.ACTION_RIGHT;
        break;
      case 90:
        this.boxPiece.imageUp();
        destY--;
        wkAction = game.ACTION_UP;
        break;
      case 180:
        this.boxPiece.imageLeft();
        destX--;
        wkAction = game.ACTION_LEFT;
        break;
      case 270:
        this.boxPiece.imageDown();
        destY++;
        wkAction = game.ACTION_DOWN;
        break;
      default :
        break;
    }

    var coordinate = this.owner.matrix.coordinate(destX, destY);

    this.destPxX = coordinate.pxX;
    this.destPxY = coordinate.pxY;
    this.action = wkAction;
  },

  canMove : function(angle) {

    var destX = this.currentX;
    var destY = this.currentY;

    switch(angle){
      case 0:
        destX++;
        break;
      case 90:
        destY--;
        break;
      case 180:
        destX--;
        break;
      case 270:
        destY++;
        break;
      default :
        break;
    }

    if (this.owner.backGnd.isWall(destX, destY)) {
      return false;
    }

    if (this.owner.getBox(destX, destY)) {
      return false;
    }

    return true;
  },

});


/**
 * はこピースクラス
 */
tm.define("game.BoxPiece", {
  superClass : "tm.app.AnimationSprite",

  //スプライトシート
  //ss : null,

  //はこのフレーム
  frame : 0,

  //コンストラクタ
  init: function(frame, width, height, x, y) {

    //はこのフレームを設定
    this.frame = frame = frame || 0;

    //スプライトシートの設定
    this.ss = tm.app.SpriteSheet({
      image : "IMG_BOX",

      //フレームのサイズ設定
      frame: {
        width : width,
        height : height
      }
    });
    this.superInit(this.ss, width, height);//スプライトのサイズを設定
    this.setPosition(x, y);//スプライトの座標を設定
    this.currentFrame = frame;
  },

  imageRight : function() {
    //this.currentFrame = 0; //TODO マジックナンバー
  },

  imageUp : function() {
    //this.currentFrame = 0; //TODO マジックナンバー
  },

  imageLeft : function() {
    //this.currentFrame = 0; //TODO マジックナンバー
  },

  imageDown : function() {
    //this.currentFrame = 0; //TODO マジックナンバー
  },

});
