<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');
  
  $indexUrl = 'Location: index.php';
  $loginUrl = 'Location: login.php';

  // 檢查是否為管理員，是則禁止訪問此頁面
  if (isAdmin()) {
    header($indexUrl);
    die();
  }

  // 檢查是否輸入帳號密碼
  if (empty($_POST['username']) || empty($_POST['password'])) {
    header($loginUrl . '?errCode=1');
    die();
  }

  $username = $_POST['username'];
  $password = $_POST['password'];

  // 取得管理員資料
  $sql = 'SELECT * FROM allenliao_blog_admin WHERE username = ? AND password = ?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ss', $username, $password);
  $result = $stmt->execute();
  if (!$result) {
    die('資料獲取失敗<br>' . $conn->error);
  }

  $result = $stmt->get_result();
  $row = $result->fetch_assoc();
  
  // 檢查帳號是否找到符合的帳號密碼
  if (!$result->num_rows) {
    header($loginUrl . '?errCode=2');
    die();
  }

  // 登入成功，以 session 儲存登入狀態
  $_SESSION['username'] = $row['username'];
  header($indexUrl);
?>