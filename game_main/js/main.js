// グローバルに展開
phina.globalize();

// 画面・スプライトサイズ
const SCREEN_WIDTH           = 640;
const SCREEN_HEIGHT          = 960;
const PADDING                = 10;
const BUTTON_SIZE            = 80;
const LABEL_FONT_SIZE        = 30;
const HINT_FONT_SIZE         = 60;
const TITLE_HEIGHT           = 100;
const HINTCARD_ME_WIDTH      = SCREEN_WIDTH / 5 * 2.5
const HINTCARD_ME_HEIGHT     = 160;
const HINTCARD_MEMBER_WIDTH  = SCREEN_WIDTH / 2;
const HINTCARD_MEMBER_HEIGHT = (SCREEN_HEIGHT + LABEL_FONT_SIZE - TITLE_HEIGHT - HINTCARD_ME_HEIGHT) / 2 - PADDING;
const YESNO_BUTTON_WIDTH     = 100;
const YESNO_BUTTON_HEIGHT    = 100;
const YESNO_BUTTON_MILISEC   = 2000;
const YESNO_BUTTON_SCALE     = 1.5;
const START_BUTTON_WIDTH     = 150;
const START_BUTTON_HEIGHT    = 135;

// 座標値
const START_X = SCREEN_WIDTH / 4;
const START_Y = TITLE_HEIGHT;

// URL
const HREF = "http://192.168.11.21:8080";

const date = new Date();
const Y = date.getFullYear();
const M = ("00" + (date.getMonth()+1)).slice(-2);
const D = ("00" + date.getDate()).slice(-2);
const h = ("00" + date.getHours()).slice(-2);
const m = ("00" + date.getMinutes()).slice(-2);
const s = ("00" + date.getSeconds()).slice(-2);
const datestr = "?" + Y + M + D + h + m + s;

// 各セッティング値
const UPDATE_FRAME = 20;          // 同期フレーム

// アセット
const ASSETS = {
  // 画像
  image: {
    "mainwindow":      "./images/window.png" + datestr,
    "hintcard_me":     "./images/hintcard_me.png" + datestr,
    "hintcard_member": "./images/hintcard_member.png" + datestr,
    "sankasya_bosyu":  "./images/sankasya_bosyu.png" + datestr,
    "start_button":    "./images/start.png" + datestr,
    "yesno_button":    "./images/yesno.png" + datestr,
    "xbutton":         "./images/xbutton.png" + datestr
  },
  // スプライトシート
  spritesheet: {
    "hintcard_member":
    {
      "frame": { "width": 400, "height": 450, "cols": 1, "rows": 1 },
      "animations" : {
        "000": {"frames": [0], "next": "000", "frequency": 1 }
      }
    },
    "hintcard_me":
    {
      "frame": { "width": 650, "height": 500, "cols": 1, "rows": 1 },
      "animations" : {
        "000": {"frames": [0], "next": "000", "frequency": 1 }
      }
    },
    "sankasya_bosyu":
    {
      "frame": { "width": 600, "height": 431, "cols": 1, "rows": 1 },
      "animations" : {
        "000": {"frames": [0], "next": "000", "frequency": 1 }
      }
    },
    "start_button":
    {
      "frame": { "width": 500, "height": 460, "cols": 6, "rows": 1 },
      "animations" : {
        "000": {"frames": [0,1], "next": "000", "frequency": 10 }
      }
    },
    "yesno_button":
    {
      "frame": { "width": 1000, "height": 1000, "cols": 3, "rows": 1 },
      "animations" : {
        "000": {"frames": [0], "next": "000", "frequency": 1 }, // YES
        "001": {"frames": [1], "next": "001", "frequency": 1 }, // NO
        "002": {"frames": [2], "next": "002", "frequency": 1 }, // DONTKNOW
      }
    }
  }
};

// 0パディング（NUM=値 LEN=桁数）
function zeroPadding(NUM, LEN) {
	return ( Array(LEN).join("0") + NUM ).slice( -LEN );
};

// 文字列挿入
function strIns(str, idx, val) {
  return str.slice(0, idx) + val + str.slice(idx);
}

/*
 * メイン処理
 */
phina.main(function() {
  console.log("main");
  // アプリケーションを生成
  var app = GameApp({
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    assets: ASSETS,
  });
  // fps表示
  //app.enableStats();
  // 実行
  app.replaceScene(SceneSequence());
  app.run();
});

// SceneSequenceクラス
phina.define("SceneSequence", {
  superClass: "phina.game.ManagerScene",

  // 初期化
  init: function() {
    console.log("SceneSequenceクラスinit");
    this.superInit({
      scenes: [
        { label: "Loading", className: "SceneLoading" },
        { label: "Main",    className: "SceneMain" },
        { label: "Exit",    className: "SceneExit" },
      ]
    });
  }
});
  
phina.define("SceneLoading", {
  superClass: "phina.game.LoadingScene",

  init: function(options) {
    console.log("SceneLoadingクラスinit");

    this.superInit({
      // アセット読み込み
      assets: ASSETS,
    });

    this.backgroundColor = "BLACK";

    // view
    var baseLayer = DisplayElement(options).addChildTo(this);

    // ラベル
    var label = Label({
      text: "NOW LOADING...",
    })
    .addChildTo(baseLayer)
    .setPosition(this.width*0.5, this.height*0.5)
    label.tweener.clear()
    .setLoop(1)
    .to({alpha:0}, 500)
    .to({alpha:1}, 500)
    ;
    label.fill = "white";
    label.fontSize = 40;

    this.exit("Main");
  }
});
