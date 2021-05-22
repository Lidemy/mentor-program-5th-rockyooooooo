<?php
  session_start();
  require_once('conn.php');

  $loginUrl = 'Location: login.php';
  
  $username = $_POST['username'];
  $password = $_POST['password'];

  // 檢查是否輸入帳號及密碼
  if (!$username || !$password) {
    header($loginUrl . '?errCode=1');
    die();
  }

  // 取得 users 資料
  $format = 'SELECT * FROM allenliao_board_users WHERE username = "%s" AND password = "%s"';
  $sql = sprintf($format, $username, $password);
  $result = $conn->query($sql);
  if (!$result) {
    die('資料獲取失敗<br>' . $conn->error);
  }

  // 檢查有無找到 user
  if (!$result->num_rows) {
    // 帳號或密碼錯誤，登入失敗
    header($loginUrl . '?errCode=2');
  } else {
    // 登入成功
    $_SESSION['username'] = $username;
    header($loginUrl);
  }
?>