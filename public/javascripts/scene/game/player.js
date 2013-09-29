
game.ACTION_NONE = game.ACTION_NONE || 0;
game.ACTION_RIGHT = game.ACTION_RIGHT || 1;
game.ACTION_UP = game.ACTION_UP || 2;
game.ACTION_LEFT = game.ACTION_LEFT || 3;
game.ACTION_DOWN = game.ACTION_DOWN || 4;

/**
 * リソースの読み込み
 */

/**
 * プレイヤーデータ管理クラス
 */
tm.define("game.Player", {

  //プレイヤーの種類を保存する変数
  playerPiece : null,

  speed : 0,
  velocity : null,

  destX : 0,
  destY : 0,

  action : game.ACTION_NONE,

  currentX : 1,
  currentY : 1,

  owner : null,

  //コンストラクタ
  //引数は初期位置（マスのX座標・Y座標）
  init: function(owner, x, y) {

    //引数のチェック
    this.currentX = x = x || 1;
    this.currentY = y = y || 1;

    this.owner = owner;

    //プレイヤーピースオブジェクトを格納する変数
    
    var wkPx = owner.matrix.coordinate(x, y);

    this.playerPiece = game.PlayerPiece(
                         0
                       , game.PIECE_WIDTH
                       , game.PIECE_HEIGHT
                       , wkPx.pxX
                       , wkPx.pxY
                       );
  

    this.speed = 0;
    this.velocity = tm.geom.Vector2(0, 0); // ベクトルをセット
    this.destPxX = this.playerPiece.x;
    this.destPxY = this.playerPiece.y;
  },

  addPlayer : function(sceneObj) {

    sceneObj.addChild(this.playerPiece);
  },

  update: function(key){

    var angle = key.getKeyAngle(); // キーの方向を角度で取得
    var destX = this.currentX;
    var destY = this.currentY;
    var wkAction = game.ACTION_NONE;

    if(angle != null && this.action === game.ACTION_NONE){
      this.velocity.setDegree(angle, 1);  // 度をセット。
       this.velocity.y *= -1;

       switch(angle){
        case 0:
          this.playerPiece.imageRight();
          destX++;
          wkAction = game.ACTION_RIGHT;
          break;
        case 90:
           this.playerPiece.imageUp();
           destY--;
          wkAction = game.ACTION_UP;
          break;
        case 180:
          this.playerPiece.imageLeft();
          destX--;
          wkAction = game.ACTION_LEFT;
          break;
        case 270:
          this.playerPiece.imageDown();
          destY++;
          wkAction = game.ACTION_DOWN;
          break;
        default :
          break;
      }

      if (this.canMove(destX, destY, angle)) {

        var coordinate = this.owner.matrix.coordinate(destX, destY);

        this.destPxX = coordinate.pxX;
        this.destPxY = coordinate.pxY;
        this.action = wkAction;

        var wkBox = this.getBox(destX, destY);
        if (wkBox) {
          wkBox.move(angle);
        }
      }
    }


     switch(this.action) {
       case game.ACTION_RIGHT:
         this.playerPiece.x += game.PLAYER_SPEED;
         if (this.playerPiece.x >= this.destPxX) { this.action = game.ACTION_NONE; this.currentX++; }
         break;
       case game.ACTION_UP:
         this.playerPiece.y -= game.PLAYER_SPEED;
         if (this.playerPiece.y <= this.destPxY) { this.action = game.ACTION_NONE; this.currentY--; }
         break;
      case game.ACTION_LEFT:
        this.playerPiece.x -= game.PLAYER_SPEED;
        if (this.playerPiece.x <= this.destPxX) { this.action = game.ACTION_NONE; this.currentX--; }
         break;
       case game.ACTION_DOWN:
         this.playerPiece.y += game.PLAYER_SPEED;
         if (this.playerPiece.y >= this.destPxY) { this.action = game.ACTION_NONE; this.currentY++; }
         break;
       default:
         break;
     }
  },

  isOverlappingAtBox : function(x, y) {

    return (this.owner.box.currentX === x &&
        this.owner.box.currentY === y);
  },

  getBox : function(x, y) {
    return this.owner.getBox(x, y);
  },

  canMove : function(destX, destY, angle) {

    if (this.owner.backGnd.isWall(destX, destY)) {
      return false;
    }

    var wkBox = this.getBox(destX, destY);
    if (wkBox &&
       !wkBox.canMove(angle)) {

      return false;
    }

    return true;
  }

});


/**
 * プレイヤーピースクラス
 */
tm.define("game.PlayerPiece", {
  superClass : "tm.app.AnimationSprite",

  //スプライトシート
  //ss : null,

  //プレイヤーのフレーム
  frame : 0,

  //コンストラクタ
  init: function(frame, width, height, pxX, pxY) {

    //プレイヤーのフレームを設定
    this.frame = frame = frame || 0;

    //スプライトシートの設定
    this.ss = tm.app.SpriteSheet({
      image : "IMG_PLAYER",

      //フレームのサイズ設定
      frame: {
        width : width,
        height : height
      }
    });

    this.superInit(this.ss, width, height);//スプライトのサイズを設定
    this.setPosition(pxX, pxY);//スプライトの座標を設定
    this.currentFrame = frame;
  },

  imageRight : function() {
    this.currentFrame = 1; //TODO マジックナンバー
  },

  imageUp : function() {
    this.currentFrame = 3; //TODO マジックナンバー
  },

  imageLeft : function() {
    this.currentFrame = 2; //TODO マジックナンバー
  },

  imageDown : function() {
    this.currentFrame = 0; //TODO マジックナンバー
  },

});
