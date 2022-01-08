<!doctype html>

<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, user-scalable=no" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <title></title>
  </head>
  <body>
  </body>
</html>

<?php
  require "./commonClassload.php";
  session_start();
  $room = new Room($_POST);
  $room->createRoomInfo();
?>
<div id="HTTP_REFERER" style="display:none"><?php echo $_SERVER['HTTP_REFERER'] ?></div>

<script src="./js/phina.min.js"></script>
<script src="./js/axios.min.js"></script>
<script src="./js/main.js?<?php echo date('YmdHis') ?>"></script>
<script src="./js/SceneMain.js?<?php echo date('YmdHis') ?>"></script>
<script src="./js/SceneExit.js?<?php echo date('YmdHis') ?>"></script>
<script src="./js/SpriteBase.js?<?php echo date('YmdHis') ?>"></script>
<script src="./js/SpritePlayer.js?<?php echo date('YmdHis') ?>"></script>
<script src="./js/SpritePlayerMember.js?<?php echo date('YmdHis') ?>"></script>
<script src="./js/SpriteSankasyaBosyu.js?<?php echo date('YmdHis') ?>"></script>
<script src="./js/SpriteButtonStart.js?<?php echo date('YmdHis') ?>"></script>
<script src="./js/SpriteButtonYesno.js?<?php echo date('YmdHis') ?>"></script>
