phina.define("SpriteButtonYesno", {
  superClass: "SpriteBase",

  // コンストラクタ
  init: function(pattern, x, y, timestamp, width= YESNO_BUTTON_WIDTH, height= YESNO_BUTTON_HEIGHT) {
    console.log("SpriteButtonYesnoクラスinit");
    this.superInit("yesno_button", pattern, x, y, width, height);
    // 初期位置
    this.changeLocation();
    this.sprite.x = x;
    this.sprite.y = y;
    // 表示タイムスタンプ
    this.timestamp = timestamp;
  },
  // スプライト拡大
  scaleSprite: function(n) {
    this.sprite.scaleX = n;
    this.sprite.scaleY = n;
  },
  // スプライト消去
  removeSprite: function() {
    this.sprite.remove();
  },
});