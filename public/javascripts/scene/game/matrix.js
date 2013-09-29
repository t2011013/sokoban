

//TODO:Playerと背景でキャンバスの座標を意識したくない、
//   カプセル化したい。⇒とりあえずやってみたけどイマイチしっくりこない


/**
 * 背景の升目管理クラス
 */
tm.define("game.Matrix", {
  
  //背景の種類を保存する一次元配列
  //matrix : null,
  
  //背景の基準位置（左上X,Y座標）
  baseX : 0,
  baseY : 0,
  
  //背景チップの横数
  col : 0,
  //背景チップの縦数
  row : 0,
  
  //コンストラクタ
  //引数は背景チップの横数、縦数、開始Ｘ座標・Ｙ座標
  init : function(_col, _row, _baseX, _baseY) {
    
    //引数のチェック
    this.col = _col = _col || 0;
    this.row = _row = _row || 0;
    this.baseX = _baseX = 64;//_baseX || 0;// TODO 基準どうする
    this.baseY = _baseY = 32;//_baseY || 0;// TODO 基準どうする

  },
  
  //TODO:んー？
  //マス目のXとYを指定して、座標を取得
  coordinate : function(_x, _y) {

    return ({ 
      pxX : (_x * 1 - 1) * game.PIECE_WIDTH + this.baseX,
      pxY : (_y * 1 - 1) * game.PIECE_HEIGHT + this.baseY 
    });
  },
});
