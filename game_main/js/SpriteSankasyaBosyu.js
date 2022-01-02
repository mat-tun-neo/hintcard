phina.define("SpriteSankasyaBosyu", {
  superClass: "SpriteBase",

  // コンストラクタ
  init: function(pattern, x, y, width= SCREEN_WIDTH, height= SCREEN_HEIGHT/10) {
    console.log("SpriteSankasyaBosyuクラスinit");
    this.superInit("sankasya_bosyu", pattern, x, y, width, height);
    // 初期位置
    this.changeLocation();
    this.sprite.x = x;
    this.sprite.y = y;
  },
  // 名前ラベル追加
  addNameLabel: function(str="", color="white") {
    this.nameLabel = Label({
      text: str,
      x: this.sprite.x,
      y: this.sprite.y,
      fontSize: LABEL_FONT_SIZE * 1.5,
      fill: color,
      stroke: "black",
      strokeWidth: 12,
    }).addChildTo(this);
    this.nameLabel.tweener.clear().setLoop(1).to({alpha:0}, UPDATE_FRAME*20).to({alpha:1}, UPDATE_FRAME*20);
  },
  // スプライト消去
  removeSprite: function() {
    this.sprite.remove();
    this.nameLabel.remove();
  },
});