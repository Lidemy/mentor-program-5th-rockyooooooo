<?php
  session_start();
  require_once('conn.php');

  $registerUrl = 'Location: register.php';

  $username = $_POST['username'];
  $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
  $nickname = $_POST['nickname'];

  // 檢查是否輸入帳號、密碼及暱稱
  if (!$username || !$password || !$nickname) {
    header($registerUrl . '?errCode=1');
    die();
  }

  // 檢查帳號是否含特殊符號
  if (preg_match('/\W/', $username)) {
    header($registerUrl . '?errCode=3');
    die();
  }

  // 新增 user
  $sql = 'INSERT INTO allenliao_board_users(username, password, nickname) VALUES(?, ?, ?)';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('sss', $username, $password, $nickname);
  $result = $stmt->execute();
  if (!$result) {
    if ($conn->errno === 1062) {
      header($registerUrl . '?errCode=2');
    }
    die('資料新增失敗<br>' . $conn->error);
  }

  // 新增成功，跳轉到登入畫面
  $_SESSION['username'] = $username;
  header('Location: login.php');
?>