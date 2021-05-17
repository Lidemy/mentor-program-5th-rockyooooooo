<?php
  session_start();
  require_once('conn.php');

  $indexUrl = 'Location: index.php';

  // 檢查 session，避免使用者直接修改 url 來進入這裡（雖然沒關係，但 url 會多了 `?errCode=1`）
  if (empty($_SESSION['username'])) {
    header($indexUrl);
    die();
  }

  // 檢查是否輸入留言內容
  if (empty($_POST['content'])) {
    header($indexUrl . '?errCode=1');
    die();
  }

  $username = $_SESSION['username'];
  // 取得 users 資料
  $format = 'SELECT nickname FROM allenliao_board_users WHERE username = "%s"';
  $sql = sprintf($format, $username);
  $result = $conn->query($sql);
  if (!$result) {
    die('資料獲取失敗<br>' . $conn->error);
  }

  $row = $result->fetch_assoc();
  $nickname = $row['nickname'];
  $content = htmlentities($_POST['content']);

  // 新增 comment
  $format = 'INSERT INTO allenliao_board_comments(nickname, content) VALUES("%s", "%s")';
  $sql = sprintf($format, $nickname, $content);
  $result = $conn->query($sql);
  if (!$result) {
    die('資料新增失敗<br>' . $conn->error);
  }

  // 新增成功，跳轉回留言板
  header($indexUrl);
?>