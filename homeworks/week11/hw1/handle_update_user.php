<?php
  session_start();
  require_once('conn.php');

  $indexUrl = 'Location: index.php';
  
  $username = $_SESSION['username'];
  $nickname = $_POST['nickname'];

  // 檢查是否輸入暱稱
  if (!$nickname) {
    header($indexUrl);
    die();
  }

  // 取得 users 資料
  $sql = 'UPDATE allenliao_board_users SET nickname = ? WHERE username = ?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ss', $nickname, $username);
  $result = $stmt->execute();
  if (!$result) {
    die('資料更新失敗<br>' . $conn->error);
  }

  header($indexUrl);
?>