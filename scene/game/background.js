
/**
 * リソースの読み込み
 */
tm.preload(function() {
    tm.graphics.TextureManager.add("IMG_BACKGND", "./img/map.png");
});


/**
 * 背景データ管理クラス
 */
tm.define("BackGround", {
    
    //背景の種類を保存する一次元配列
    bg : null,
    
    //背景の基準位置（左上X,Y座標）
    baseX : 0,
    baseY : 0,
    
    //背景チップの横数
    col : 0,
    //背景チップの縦数
    row : 0,
    
    PIECE_WIDTH : 64,
    PIECE_HEIGHT : 64,
    
    //コンストラクタ
    //引数は背景チップの横数、縦数    
    init: function(_col, _row, _baseX, _baseY, _bgData) {
        
        //引数のチェック
    	this.col = _col = _col || 0;
    	this.row = _row = _row || 0;
    	this.baseX = _baseX = 64;//_baseX || 0;// TODO 基準どうする
    	this.baseY = _baseY = 32;//_baseY || 0;// TODO 基準どうする
    	_bgData = _bgData || [];
        
        //背景ピースオブジェクトを格納する配列
        this.bg = new Array(_col * _row);

        for (var i = 0; i < this.bg.length; i++) {
            this.bg[i] = BgPiece(_bgData[i],
            	                 this.PIECE_WIDTH,
            	                 this.PIECE_HEIGHT,
            	                 (i % this.col * this.PIECE_WIDTH + _baseX),   
            	                 (Math.floor(i / this.col) * this.PIECE_HEIGHT + _baseY)
            	                );
        }
    },
    
    addBg : function(sceneObj) {
    	
    	for (var i = 0; i < this.bg.length; i++) {
    		sceneObj.addChild(this.bg[i]);	
    	}
    },
    
    getBgPiece : function(x, y) {
    	
    	console.log((y - 1) * this.col + (x - 1));
    	return this.bg[(y - 1) * this.col + (x - 1)];
    },
    
});


/**
 * 背景ピースクラス
 */
tm.define("BgPiece", {
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
        this.superInit(_width,_height, this.ss);//スプライトのサイズを設定
        this.setPosition(_x, _y);//スプライトの座標を設定    
        this.currentFrame = _type;	
    },    
});
