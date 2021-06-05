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
  $sql = 'SELECT * FROM allenliao_board_users WHERE username = ?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s', $username);
  $result = $stmt->execute();
  if (!$result) {
    die('資料獲取失敗<br>' . $conn->error);
  }

  $result = $stmt->get_result();
  $row = $result->fetch_assoc();

  // 檢查有無找到 user
  if (!$result->num_rows) {
    // 找不到帳號，登入失敗
    header($loginUrl . '?errCode=2');
    die();
  }

  if (password_verify($password, $row['password'])) {
    // 登入成功
    $_SESSION['username'] = $username;
    header('Location: index.php');
  } else {
    header($loginUrl . '?errCode=2');
  }
?>