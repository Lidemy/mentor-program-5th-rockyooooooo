<?php
  require_once('conn.php');

  $registerUrl = 'Location: register.php';

  $username = $_POST['username'];
  $password = $_POST['password'];
  $nickname = $_POST['nickname'];

  // 檢查是否輸入帳號、密碼及暱稱
  if (!$username || !$password || !$nickname) {
    header($registerUrl . '?errCode=1');
    die();
  }

  // 檢查帳號是否含特殊符號
  if (preg_match('/\W/', $username) || preg_match('/\W/', $nickname)) {
    header($registerUrl . '?errCode=3');
    die();
  }

  // 新增 user
  $format = 'INSERT INTO allenliao_board_users(username, password, nickname) VALUES("%s", "%s", "%s")';
  $sql = sprintf($format, $username, $password, $nickname);
  $result = $conn->query($sql);
  if (!$result) {
    if ($conn->errno === 1062) {
      header($registerUrl . '?errCode=2');
    }
    die('資料新增失敗<br>' . $conn->error);
  }

  // 新增成功，跳轉到登入畫面
  header('Location: login.php');
?>