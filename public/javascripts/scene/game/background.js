
/**
 * リソースの読み込み
 */
tm.preload(function() {
    tm.graphics.TextureManager.add("IMG_BACKGND", "./images/mysheet.png");
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

    owner : null,

    //コンストラクタ
    //引数は背景チップの横数、縦数
    init: function(owner, _bgData) {

        //引数のチェック
        this.owner = owner;

        _bgData = _bgData || [];

        with(owner.matrix) {
            //背景ピースオブジェクトを格納する配列
            this.bg = new Array(col * row);

            for (var i = 0; i < this.bg.length; i++) {
                var wkPx = coordinate((i % col) + 1, Math.floor(i / col) + 1);

                this.bg[i] = BgPiece(_bgData[i],
                                     PIECE_WIDTH,
                                     PIECE_HEIGHT,
                                     wkPx.pxX,
                                     wkPx.pxY
                                    );
            }
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
