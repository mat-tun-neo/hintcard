phina.define("SpritePlayer", {
  superClass: "SpriteBase",

  // コンストラクタ
  init: function(pattern, x, y, width= HINTCARD_ME_WIDTH, height= HINTCARD_ME_HEIGHT) {
    //console.log("SpritePlayerクラスinit");
    this.superInit("hintcard_me", pattern, x, y, width, height);
    // 初期位置
    this.changeLocation();
    this.sprite.x = x;
    this.sprite.y = y + height / 2 + PADDING;
  },
  // 名前ラベル追加
  addNameLabel: function(str="", color="white") {
    this.nameLabel = Label({
      text: str,
      x: this.sprite.x * 2,
      y: this.sprite.y + LABEL_FONT_SIZE + PADDING * 2,
      fontSize: LABEL_FONT_SIZE,
      fill: color,
      stroke: "black",
      strokeWidth: 12,
    }).addChildTo(this);
  }
});