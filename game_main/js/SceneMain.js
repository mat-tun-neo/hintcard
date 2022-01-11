/*
 * メインシーン
 */
phina.define("SceneMain", {
  // 継承
  superClass: "DisplayScene",
  // コンストラクタ
  init: function(param) {
    console.log("SceneMainクラスinit");
    // 親クラス初期化
    this.superInit();
    // セッションID
    this.sessionId = String(document.cookie.match(/PHPSESSID=[A-Za-z0-9]{32}/i)).replace("PHPSESSID=", "");
    // 背景スプライト
    //this.mainwindow = Sprite("mainwindow").addChildTo(this);
    //this.mainwindow.setPosition(this.gridX.center(), this.gridY.center());
    // タイトルラベル描画
    this.title;
    // ボタン描画
    this.putXButton();
    // スプライト
    this.player;
    this.sankasyaBosyu;
    this.startButton;
    // スプライトグループ
    this.memberPlayers = DisplayElement().addChildTo(this);
    this.memberYesnoButtons = DisplayElement().addChildTo(this);
    this.myYesnoButtons = DisplayElement().addChildTo(this);
    // 同部屋プレイヤー情報の描画
    this.updatePlayerInfo();
  },
  // 画面更新
  update: function(app) {
    // プレイヤー更新
    if (app.frame % UPDATE_FRAME == 0) {
      console.log("update_frame：" + app.frame);
      // 同部屋プレイヤー情報の描画
      this.updatePlayerInfo();
    };
  },
  // Xボタン描画
  putXButton: function() {
    console.log("SceneMainクラスputXButton");
    this.xbutton = Sprite("xbutton").addChildTo(this);
    this.xbutton.setPosition(SCREEN_WIDTH - BUTTON_SIZE / 2, BUTTON_SIZE / 2);
    //console.log(this.xbutton.x + "/" + this.xbutton.y);
    // Xボタン押下時の処理
    this.xbutton.setInteractive(true);
    this.xbutton.onclick = function() {
      this.exit("Exit");
    }.bind(this);
  },
  // タイトル描画
  putTitle: function(theme) {
    console.log("SceneMainクラスputTitle");
    // タイトルラベル
    if (this.title != null) {
      this.title.remove();
    }
    this.title = Label({text: "テーマ： " + theme}).addChildTo(this);
    this.title.setPosition(SCREEN_WIDTH / 2, LABEL_FONT_SIZE);
    this.title.fontSize = LABEL_FONT_SIZE;
    this.title.fill = "white";
    this.title.stroke = "black";
    this.title.strokeWidth = 5;
  },
  // 同部屋プレイヤー情報の更新
  updatePlayerInfo: function() {
    console.log("SceneMainクラスupdatePlayerInfo");
    axios.post("./apiGetData.php")
    .then(function (response) {
      this.erasePlayers(response);
      this.drawPlayers(response);
    }.bind(this))
    .catch(function (error) { console.log(error); })
    .finally(function () {});
  },
  // プレイヤーオブジェクト描画
  drawPlayers: function(response) {
    console.log("SceneMainクラスdrawPlayers");
    console.log("getData - responseログ：");
    console.log(response);

    let keys = Object.keys(response.data);
    console.log("keys.length：" + keys.length);
    console.log("this.sessionId：" + this.sessionId);

    let member_no = 0;
    let sessionExist = false;
    for (let player_no = 0; player_no < keys.length; player_no++) {
      console.log("keys[" + player_no + "]：" + keys[player_no]);
      // 参加メンバの描画
      let order = ["①", "②", "③", "④", "⑤"];
      if (this.sessionId != keys[player_no]) {
        // 座標
        let base_pos_x = (member_no % 2) * HINTCARD_MEMBER_WIDTH + START_X;
        let base_pos_y = Math.floor(member_no / 2) * HINTCARD_MEMBER_HEIGHT + START_Y;
        // 参加メンバのヒントカード描画
        let memberPlayer = SpritePlayerMember(
          "000",
          base_pos_x,
          base_pos_y
        ).addChildTo(this.memberPlayers);
        memberPlayer.addNameLabel(order[player_no] + "番　" + response.data[keys[player_no]].name, "white");
        memberPlayer.addHintLabel(response.data[keys[player_no]].answer, "white");
        // 参加メンバのYES・NO・DONTKNOWボタン描画
        for (let mybutton_no = 0; mybutton_no < 3; mybutton_no++) {
          console.log("Date.now() - response.data[keys[player_no]].mybutton[mybutton_no]", Date.now() - response.data[keys[player_no]].mybutton[mybutton_no]);
          if (response.data[keys[player_no]].mybutton[mybutton_no] > 0 && Date.now() - response.data[keys[player_no]].mybutton[mybutton_no] < YESNO_BUTTON_MILISEC) {
            SpriteButtonYesno(
              zeroPadding(mybutton_no, 3),
              base_pos_x + YESNO_BUTTON_WIDTH * (mybutton_no - 1),
              base_pos_y + YESNO_BUTTON_HEIGHT * 1.5,
              response.data[keys[player_no]].mybutton[mybutton_no]
            ).addChildTo(this.memberYesnoButtons);
          }
        }
        member_no++;

      // 自プレイヤーの描画
      } else if (this.sessionId == keys[player_no]) {
        sessionExist = true;
        // テーマ描画
        this.putTitle(response.data[this.sessionId].theme);
        // 自プレイヤーのヒントカード描画
        if (this.player == null) {
          this.player = SpritePlayer(
            "000",
            SCREEN_WIDTH / 2 - YESNO_BUTTON_WIDTH / 2 * 3 - PADDING*2,
            SCREEN_HEIGHT - HINTCARD_ME_HEIGHT
          ).addChildTo(this);
          this.player.addNameLabel(order[player_no] + "番　" + response.data[this.sessionId].name, "white");
          console.log("this.sessionId.gamestart_flg：" + response.data[this.sessionId].gamestart_flg);
        }

        // スタートボタン押下前
        if (response.data[this.sessionId].gamestart_flg == 0) {
          // スタートボタン描画（2人以上の参加者がいて1番のプレイヤーのみ表示）
          if (keys.length > 1 && this.startButton == null && player_no == 0) {
            this.startButton = SpriteButtonStart(
              "000",
              SCREEN_WIDTH - START_BUTTON_WIDTH,
              SCREEN_HEIGHT - START_BUTTON_HEIGHT + PADDING*2
            ).addChildTo(this);
            // スタートボタン押下時の処理
            this.startButton.sprite.setInteractive(true);
            this.startButton.sprite.onclick = function() {
              console.log("startButton.onclick");
              axios.post("./apiStartGame.php")
              .then(function (response) {

              }.bind(this))
              .catch(function (error) { console.log(error); })
              .finally(function () {});
            }.bind(this);
          }
          // その他のスプライト描画
          this.drawWhileLookingFor(response);

        // スタートボタン押下後
        } else {
          // YES・NO・DONTKNOWボタン描画
          if (this.myYesnoButtons.children.length == 0) {
            let mybutton_no = [1, 0, 2];
            for (let i = 0; i < 3; i++) {
              let myYesnoButton = SpriteButtonYesno(
                zeroPadding(mybutton_no[i], 3),
                SCREEN_WIDTH - (3 - mybutton_no[i] - 0.5) * YESNO_BUTTON_WIDTH - PADDING,
                SCREEN_HEIGHT - START_BUTTON_HEIGHT + PADDING*3
              ).addChildTo(this.myYesnoButtons);
              // YES・NO・DONTKNOWボタン押下時の処理
              myYesnoButton.sprite.setInteractive(true);
              myYesnoButton.sprite.onclick = function() {
                // スプライト拡大
                myYesnoButton.scaleSprite(YESNO_BUTTON_SCALE);
                myYesnoButton.timestamp = Date.now();
                // ボタン押下時間を更新
                let post_data= {"mybutton_no": mybutton_no[i]};
                console.log("yesnoButton.onclick", post_data);
                axios.post("./apiPushButton.php", post_data)
                .then(function (response) {

                }.bind(this))
                .catch(function (error) { console.log(error); })
                .finally(function () {});
              }.bind(this);
            }
          }
          // その他のスプライト描画
          this.drawWhilePlaying(response);
        }
      }
    }
    // セッションIDが消えていたらEXIT
    if (!sessionExist) {
      this.exit("Exit");
    }
  },
  // プレイヤーオブジェクト消去
  erasePlayers: function(response) {
    console.log("SceneMainクラスerasePlayers");
    // 参加メンバのヒントカード消去
    //console.log("this.memberPlayers.children.length", this.memberPlayers.children.length);
    this.memberPlayers.children.length = 0;
    // 参加メンバのYES・NO・DONTKNOWボタン消去
    //console.log("this.memberYesnoButtons.children.length", this.memberYesnoButtons.children.length);
    for (let i = this.memberYesnoButtons.children.length - 1; i >= 0 ; i--){
      if (Date.now() - this.memberYesnoButtons.children[i].timestamp > YESNO_BUTTON_MILISEC) {
        this.memberYesnoButtons.children.splice(i, 1);
      }
    }
  },
  // スタート前のスプライト描画
  drawWhileLookingFor: function(response) {
    console.log("SceneMainクラスdrawWhileLookingFor");
    // 参加者募集中
    if (this.sankasyaBosyu == null) {
      this.sankasyaBosyu = SpriteSankasyaBosyu("000", SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2).addChildTo(this);
      this.sankasyaBosyu.addNameLabel("参加者を待っています", "white");
      this.sankasyaBosyu.moveFront();
    }
  },
  // スタート後のスプライト描画
  drawWhilePlaying: function(response) {
    console.log("SceneMainクラスdrawWhilePlaying");
    // スプライト消去
    if (this.sankasyaBosyu != null) { this.sankasyaBosyu.removeSprite(); }
    if (this.startButton != null) { this.startButton.removeSprite(); }
    // YES・NO・DONTKNOWボタン拡大解除
    for (let i = 0; i < this.myYesnoButtons.children.length; i++){
      if (Date.now() - this.myYesnoButtons.children[i].timestamp > YESNO_BUTTON_MILISEC) {
        this.myYesnoButtons.children[i].scaleSprite(1);
      }
    }
  }
});
