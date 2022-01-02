phina.define("SpriteBase", {
  superClass: "DisplayElement",

  // コンストラクタ
  init: function(mode, pattern, x, y, width=CHAR_XSIZE, height=CHAR_YSIZE) {
    console.log("SpriteBaseクラスinit");
    this.superInit();
    // スプライトグループ
    this.myspritegroup = DisplayElement().addChildTo(this);
    // スプライト画像作成
    this.changeSprite(mode, pattern, x, y, width, height);
    this.mode = mode;
  },
  // スプライトモード変更
  changeSprite: function(mode, pattern, x, y, width=CHAR_XSIZE, height=CHAR_YSIZE) {
    //console.log("SpriteBaseクラスchangeSprite");
    // スプライト画像作成
    if (this.sprite != null) {
      x = this.sprite.x;
      y = this.sprite.y;
      this.myspritegroup.removeChild(this.sprite);
      this.sprite.remove();
    }
    this.sprite = Sprite(mode, width, height).addChildTo(this.myspritegroup);
    this.sprite.setImage(mode, width, height);
    this.sprite.x = x;
    this.sprite.y = y;
    this.changePattern(mode, pattern);
    this.mode = mode;
  },
  // スプライトパターン変更
  changePattern: function(mode, pattern) {
    // スプライトにフレームアニメーションをアタッチ
    this.sprite.anim = FrameAnimation(mode).attachTo(this.sprite);
    // スプライトシートのサイズにフィットさせない
    this.sprite.anim.fit = false;
    //アニメーションを再生する
    this.sprite.anim.gotoAndPlay(pattern);
    this.mode = mode;
  },
  // 更新
  update: function(app) {
    //console.log("SpriteBaseクラスupdate");
    // if (this.mode != "flower") {
    //   var xDiff = this.targetX - this.sprite.x;
    //   var yDiff = this.targetY - this.sprite.y
    //   if (xDiff < 10 && yDiff < 10) {
    //     this.changeLocation();
    //   }
    //   // 徐々に次の位置に近づける
    //   this.sprite.moveBy(xDiff * 0.01, yDiff * 0.01);
    //   if (this.hintLabel != null) {
    //     this.hintLabel.moveBy(xDiff * 0.01, yDiff * 0.01);
    //   }
    // }
  },
  // スプライト位置変更
  changeLocation: function() {
    //console.log("SpriteBaseクラスchangeLocation");
    //this.targetX = Math.floor( Math.random() * SCREEN_WIDTH );
    //this.targetY = Math.floor( Math.random() * SCREEN_HEIGHT );
  },
  // プレイヤースプライトを最前面へ
  moveFront: function() {
    console.log("SpriteBaseクラスmoveFront");
    this.myspritegroup.removeChild(this.sprite);
    this.sprite.addChildTo(this.myspritegroup);
  },
  // ターゲット位置設定
  setTarget: function(x, y) {
    this.targetX = x;
    this.targetY = y;
  },
  // スプライト消去
  removeSprite: function() {
    this.sprite.remove();
    this.nameLabel.remove();
    this.hintLabel.remove();
  },
});