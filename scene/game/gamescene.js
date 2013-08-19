var MATRIX_X = 9;
var MATRIX_Y = 7;
var PIECE_WIDTH = 64;
var PIECE_HEIGHT = 64;
var PLAYER_SPEED = 16;

tm.define("GameScene", {
    superClass: "tm.app.Scene",
    

    GAME_WIDTH : 9 * 64,
    GAME_HEIGHT : 7 * 64,
    backGnd : null,
    player : null,
    matrix : null,
    box : null,

    init: function() {
        // 親の初期化
        this.superInit();
        
        this.matrix = Matrix(MATRIX_X, MATRIX_Y, 0, 0);
       // this.backGnd = BackGround(this, MATRIX_X, MATRIX_Y, ([0,1,2,3,4,5,6,7,8,9])); //TODO マジックナンバー
        this.backGnd = BackGround(MATRIX_X, MATRIX_Y, 0,0, ([0,1,1,1,1,1,1,1,1,
        													 0,0,0,0,0,0,0,0,1,
        													 0,0,0,0,0,0,0,0,1,
        													 1,0,0,0,0,0,0,0,1,
        													 1,0,0,0,0,0,0,0,1,
        													 1,0,0,0,0,0,0,0,1,
        													 1,1,1,1,1,1,1,1,1])); //TODO マジックナンバー
        this.backGnd.addBg(this);
        this.box = Box(this, 5,5);
        this.box.addBox(this);
        this.player = Player(this,1,1); //TODO マジックナンバー
        this.player.addPlayer(this);
        
    },

    updateAll: function(key) {
		
		if (this.player !== null) {
			this.player.update(key);	
		}
		if (this.box !== null) {
			this.box.update();
		}
    },
    
});