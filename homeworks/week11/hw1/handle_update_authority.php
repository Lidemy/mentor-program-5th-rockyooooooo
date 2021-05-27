<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  $indexUrl = 'Location: index.php';

  // 檢查訪問者權限
  $username = $_SESSION['username'];
  if (checkAuthority($username) !== 'admin') {
    header($indexUrl);
  }

  $authority = $_POST['authority'];
  $id = $_POST['id'];

  // 更新 users 資料
  $sql = 'UPDATE allenliao_board_users SET authority = ? WHERE id = ?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('si', $authority, $id);
  $result = $stmt->execute();
  if (!$result) {
    die('資料更新失敗<br>' . $conn->error);
  }

  header("Location: dashboard.php");
?>