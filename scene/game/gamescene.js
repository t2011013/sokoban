var MATRIX_X = 9;
var MATRIX_Y = 7;
var PIECE_WIDTH = 21;
var PIECE_HEIGHT = 21;
var PLAYER_SPEED = 7;

tm.define("GameScene", {
    superClass: "tm.app.Scene",
    
    GAME_WIDTH : 9 * 64,
    GAME_HEIGHT : 7 * 64,
    backGnd : null,
    player : null,
    matrix : null,
    box : null,
    clear : false,
    startDate : null,

    init: function() {
        // 親の初期化
        this.superInit();
        
        this.matrix = Matrix(MATRIX_X, MATRIX_Y, 0, 0);
       
        this.backGnd = BackGround(this, ([1,1,1,1,1,1,1,1,1
                                         ,1,0,0,0,0,0,0,0,1
                                         ,1,0,0,4,0,0,0,0,1
                                         ,1,0,0,0,0,0,0,0,1
                                         ,1,0,0,0,0,4,0,0,1
                                         ,1,0,0,0,0,0,0,0,1
                                         ,1,1,1,1,1,1,1,1,1
                                         ])); //TODO マジックナンバー
        this.backGnd.addBg(this);
        this.box = [Box(this, 5, 5), Box(this, 7, 5)];
        
        this.box[0].addBox(this);
        this.box[1].addBox(this);
        this.player = Player(this,2,2); //TODO マジックナンバー
        this.player.addPlayer(this);
        this.startDate = new Date();
                
    },

    updateAll: function(key) {
        
        var wkClear = true;
        
        if (this.clear) {
            return;
        }
        
        if (this.player !== null) {
            this.player.update(key);    
        }
        
        for (var i = 0; i < this.box.length; i++) {
            if (this.box[i] !== null) {
                this.box[i].update();
                if (!this.box[i].checkPoint) {
                    wkClear = false;
                }
            }
        }
        
        if (wkClear) {
            this.clear = wkClear;
            var diff = Math.floor(((new Date()).getTime() - this.startDate.getTime()) / 1000);
            var hour = Math.floor(diff / 360);
            var min  = Math.floor(Math.floor(diff % 360) / 60);
            var sec  = Math.floor(diff % 60);
            window.alert("ステージクリア～～～:" + hour + "時間" + min + "分" + sec + "秒");
        }
    },
    
    getBox : function(x, y) {
    
        for (var i = 0; i < this.box.length; i++) {
            if (this.box[i] !== null
             && this.box[i].currentX === x
             && this.box[i].currentY === y) {
                
                return this.box[i];
            }
        }
        
        return null;
    }
    
});