
/**
 * リソースの読み込み
 */
tm.preload(function() {
    tm.graphics.TextureManager.add("IMG_box", "./img/dekakabocha.png");
});


/**
 * はこデータ管理クラス
 */
tm.define("Box", {
    
    //はこの種類を保存する変数
    boxPiece : null,
    
    speed : 0,
    velocity : null,
    
    destX : 0,
    destY : 0,
    
    action : 0,
    
    currentX : 3,
    currentY : 3,
    
    owner : null,
    matrix : null,
    
    //コンストラクタ
    //引数ははこチップの横数、縦数、左上X座標・Y座標  
    init: function(_owner, _col, _row) {
        
        //引数のチェック
    	this.col = _col = _col || 0;
    	this.row = _row = _row || 0;

    	this.owner = _owner;
    	this.matrix = _owner.matrix;
    	        
        //はこピースオブジェクトを格納する変数
        with (_owner.matrix) {
        	this.boxPiece = boxPiece(0,
            	                   PIECE_WIDTH,
            	                   PIECE_HEIGHT,
            	                   baseX * 1 + PIECE_WIDTH * 2,   
            	                   baseY * 1 + PIECE_HEIGHT * 2
            		           );
        }
        
        this.speed = 0;
        this.velocity = tm.geom.Vector2(0, 0);  // ベクトルをセット
        this.destX = this.boxPiece.centerX;
        this.destY = this.boxPiece.centerY;
    },
    
    addBox : function(sceneObj) {
    	
    	sceneObj.addChild(this.boxPiece);
    },
    
    canMove : function(angle) {
    
 			switch(angle){
                case 0:
                    //console.log("右");
                    
                    if (this.owner.backGnd.getBgPiece((this.currentX + 1), this.currentY).type === 1) { return false; }
                    
                    break;
                case 90:
                    //console.log("上");
 					
 					if (this.owner.backGnd.getBgPiece((this.currentX), (this.currentY - 1)).type === 1) { return false; }
 					
                    break;
                case 180:
                    //console.log("左");
                    this.boxPiece.moveLeft();
                    if (this.owner.backGnd.getBgPiece((this.currentX - 1), (this.currentY)).type === 1) { return false; }
                    
                    break;
                case 270:
                    //console.log("下");
                    this.boxPiece.moveDown();
                    if (this.owner.backGnd.getBgPiece((this.currentX), (this.currentY + 1)).type === 1) { return false; }
                    
                    break;
                default :
                    break;
            }
           
    	return true;
    },
    
    
    //TODO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!汚すぎる
    move : function(angle) {
        if(this.action === 0){ //TODO マジックナンバー
        	
 			//TODO汚い
 			switch(angle){
                case 0:
                    //console.log("右");
                    this.boxPiece.moveRight();
                    if (this.owner.backGnd.getBgPiece((this.currentX + 1), this.currentY).type === 1) { break; }
                    this.destX = this.destX + PIECE_WIDTH;
                    this.action = 1; //TODO マジックナンバー
                    break;
                case 90:
                    //console.log("上");
 					this.boxPiece.moveUp();
 					if (this.owner.backGnd.getBgPiece((this.currentX), (this.currentY - 1)).type === 1) { break; }
 					this.destY = this.destY - PIECE_HEIGHT;
                    this.action = 2; //TODO マジックナンバー
                    break;
                case 180:
                    //console.log("左");
                    this.boxPiece.moveLeft();
                    if (this.owner.backGnd.getBgPiece((this.currentX - 1), (this.currentY)).type === 1) { break; }
                    this.destX = this.destX - PIECE_WIDTH;
                    this.action = 3; //TODO マジックナンバー
                    break;
                case 270:
                    //console.log("下");
                    this.boxPiece.moveDown();
                    if (this.owner.backGnd.getBgPiece((this.currentX), (this.currentY + 1)).type === 1) { break; }
                    this.destY = this.destY + PIECE_HEIGHT;
                    this.action = 4; //TODO マジックナンバー
                    break;
                default :
                    break;
            }
        }
    },
    update: function(){
    

 		console.log(this.action);
 		switch(this.action) {
 			case 1:
 				this.boxPiece.x += 16; //TODO マジックナンバー
 				if (this.boxPiece.centerX >= this.destX) {this.action = 0;this.currentX++;} //TODO マジックナンバーそして汚い
 				break;
 			case 2:
 				this.boxPiece.y -= 16; //TODO マジックナンバー
 				if (this.boxPiece.centerY <= this.destY) {this.action = 0;this.currentY--;} //TODO マジックナンバーそして汚い
 				break;
			case 3:
				this.boxPiece.x -= 16; //TODO マジックナンバー
				if (this.boxPiece.centerX <= this.destX) {this.action = 0;this.currentX--;} //TODO マジックナンバーそして汚い
 				break;
 			case 4:
 				this.boxPiece.y += 16; //TODO マジックナンバー
 				if (this.boxPiece.centerY >= this.destY) {this.action = 0;this.currentY++;} //TODO マジックナンバーそして汚い
 				break;
 			default:
 				break;
 		}
    }
    
});


/**
 * はこピースクラス
 */
tm.define("boxPiece", {
    superClass : "tm.app.AnimationSprite",
    
    //スプライトシート
    //ss : null,
    
    //はこのフレーム
    frame : 10,
    
    //コンストラクタ   
    init: function(_frame, _width, _height, _x, _y) {

    	//はこのフレームを設定
    	this.frame = _frame = _frame || 0;
    	    
    	//スプライトシートの設定
        this.ss = tm.app.SpriteSheet({
            image : "IMG_box",
            
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
