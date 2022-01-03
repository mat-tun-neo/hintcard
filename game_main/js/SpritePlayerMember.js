phina.define("SpritePlayerMember", {
  superClass: "SpriteBase",

  // コンストラクタ
  init: function(pattern, x, y, width= HINTCARD_MEMBER_WIDTH, height= HINTCARD_MEMBER_HEIGHT - LABEL_FONT_SIZE) {
    console.log("SpritePlayerMemberクラスinit");
    this.superInit("hintcard_member", pattern, x, y, width, height);
    // 初期位置
    this.changeLocation();
    this.sprite.x = x;
    this.sprite.y = y + height / 2;
  },
  // 名前ラベル追加
  addNameLabel: function(str="", color="white") {
    this.nameLabel = Label({
      text: str,
      x: this.sprite.x,
      y: this.sprite.y - HINTCARD_MEMBER_HEIGHT / 2 + LABEL_FONT_SIZE,
      fontSize: LABEL_FONT_SIZE,
      fill: color,
      stroke: "black",
      strokeWidth: 12,
    }).addChildTo(this);
  },
  // ヒントラベル追加
  addHintLabel: function(str="", color="white") {
    let fontsize = HINT_FONT_SIZE
    // フォントサイズと改行の調整
    if (str.length > 8) {
      fontsize = HINT_FONT_SIZE * 3.5 / 8;
      for (i = 0; i < Math.floor(str.length / 10); i++) {
        str = strIns(str, (i + 1) * 10, "\n");
      }
    } else if (str.length > 3) {
      fontsize = HINT_FONT_SIZE * 3.5 / str.length
    }
    this.hintLabel = Label({
      text: str,
      x: this.sprite.x,
      y: this.sprite.y + HINTCARD_MEMBER_HEIGHT / 4,
      fontSize: fontsize,
      fill: color,
      stroke: "black",
      strokeWidth: 12,
    }).addChildTo(this);
  }
});