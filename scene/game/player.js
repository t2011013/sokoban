
var ACTION_NONE  = 0;
var ACTION_RIGHT = 1;
var ACTION_UP    = 2;
var ACTION_LEFT  = 3;
var ACTION_DOWN  = 4;

/**
 * リソースの読み込み
 */
tm.preload(function() {
    tm.graphics.TextureManager.add("IMG_PLAYER", "./img/dekakabocha.png");
});


/**
 * プレイヤーデータ管理クラス
 */
tm.define("Player", {
    
    //プレイヤーの種類を保存する変数
    playerPiece : null,
    
    speed : 0,
    velocity : null,
    
    destX : 0,
    destY : 0,
    
    action : ACTION_NONE,
    
    currentX : 1,
    currentY : 1,
    
    owner : null,
    
    //コンストラクタ
    //引数は初期位置（マスのX座標・Y座標）
    init: function(_owner, _x, _y) {
        
        //引数のチェック
    	this.currentX = _x = _x || 1;
    	this.currentY = _y = _y || 1;

    	this.owner = _owner;
    	        
        //プレイヤーピースオブジェクトを格納する変数
        with (_owner.matrix) {
        	this.playerPiece = PlayerPiece(0,
            	                   PIECE_WIDTH,
            	                   PIECE_HEIGHT,
            	                   baseX,   
            	                   baseY
            		           );
        }
        
        this.speed = 0;
        this.velocity = tm.geom.Vector2(0, 0);  // ベクトルをセット
        this.destPxX = this.playerPiece.x;
        this.destPxY = this.playerPiece.y;
    },
    
    addPlayer : function(sceneObj) {
    	
    	sceneObj.addChild(this.playerPiece);
    },
    
    isOverlappingAtBox : function(x, y) {
    	
    	return (this.owner.box.currentX === x && 
    	        this.owner.box.currentY === y);
    },
    
    update: function(key){
    
    	var angle = key.getKeyAngle(); // キーの方向を角度で取得
    	var destX = this.currentX;
    	var destY = this.currentY;
    	var wkAction = ACTION_NONE;
    	
        if(angle != null && this.action === ACTION_NONE){ //TODO マジックナンバー
            this.velocity.setDegree(angle, 1);    // this.velocity.x と this.velocity.y に度をセット。 
 			this.velocity.y *= -1;
 			

 			switch(angle){
                case 0:
                    this.playerPiece.moveRight();
                    destX++;
                    wkAction = ACTION_RIGHT;
                    break;
                case 90:
 					this.playerPiece.moveUp();
 					destY--;
                    wkAction = ACTION_UP;
                    break;
                case 180:
                    this.playerPiece.moveLeft();
					destX--;
                    wkAction = ACTION_LEFT;
                    break;
                case 270:
                    this.playerPiece.moveDown();
					destY++;
                    wkAction = ACTION_DOWN;
                    break;
                default :
                    break;
            }
            
            if (this.canMove(destX, destY, angle)) {
            	
            	var coordinate = this.owner.matrix.coordinate(destX, destY);
            	console.log(coordinate.pxX + "  " + coordinate.pxY);
            	
            	this.destPxX = coordinate.pxX;
            	this.destPxY = coordinate.pxY;
            	this.action = wkAction;
            	
            	if (this.isOverlappingAtBox(destX, destY)) {
            		this.owner.box.move(angle);
            	}
            }
        }
 		
 		
 		switch(this.action) {
 			case ACTION_RIGHT:
 				this.playerPiece.x += PLAYER_SPEED;
 				if (this.playerPiece.x >= this.destPxX) { this.action = ACTION_NONE; this.currentX++; }
 				break;
 			case ACTION_UP:
 				this.playerPiece.y -= PLAYER_SPEED;
 				if (this.playerPiece.y <= this.destPxY) { this.action = ACTION_NONE; this.currentY--; }
 				break;
			case ACTION_LEFT:
				this.playerPiece.x -= PLAYER_SPEED;
				if (this.playerPiece.x <= this.destPxX) { this.action = ACTION_NONE; this.currentX--; }
 				break;
 			case ACTION_DOWN:
 				this.playerPiece.y += PLAYER_SPEED;
 				if (this.playerPiece.y >= this.destPxY) { this.action = ACTION_NONE; this.currentY++; }
 				break;
 			default:
 				break;
 		}
    },
    
    canMove : function(destX, destY, angle) {
    	
    	if (this.owner.backGnd.getBgPiece(destX, destY).type === 1) {
    		return false;
    	}
    	
    	if (this.isOverlappingAtBox(destX, destY) &&
    	    !this.owner.box.canMove(angle)) {
    		
    		return false;
    	}
    	
    	return true;
    }
    
});


/**
 * プレイヤーピースクラス
 */
tm.define("PlayerPiece", {
    superClass : "tm.app.AnimationSprite",
    
    //スプライトシート
    //ss : null,
    
    //プレイヤーのフレーム
    frame : 0,
    
    //コンストラクタ   
    init: function(_frame, _width, _height, _x, _y) {

    	//プレイヤーのフレームを設定
    	this.frame = _frame = _frame || 0;
    	    
    	//スプライトシートの設定
        this.ss = tm.app.SpriteSheet({
            image : "IMG_PLAYER",
            
            //フレームのサイズ設定
            frame: {
                width : _width,
                height : _height
            }
        });
        this.superInit(_width,_height, this.ss);//スプライトのサイズを設定
        this.setPosition(_x, _y);//スプライトの座標を設定    
        this.currentFrame = _frame;	
    },
    
    moveRight : function() {
    	this.currentFrame = 6; //TODO マジックナンバー
    },
    
    moveUp : function() {
    	this.currentFrame = 9; //TODO マジックナンバー
    },
    
    moveLeft : function() {
    	this.currentFrame = 3; //TODO マジックナンバー
    },
    
    moveDown : function() {
    	this.currentFrame = 0; //TODO マジックナンバー
    },
    
});
