<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  $indexUrl = 'Location: index.php';

  // 檢查 url 是否有帶 id
  if (empty($_GET['id'])) {
    header($indexUrl);
    die();
  }

  $username = $_SESSION['username'];
  $id = $_GET['id'];

  // 更新 comment is_deleted
  if (checkAuthority($username) === 'admin') {
    $sql = 'UPDATE allenliao_board_comments SET is_deleted = 1 WHERE id = ?';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $id);
  } else {
    $sql = 'UPDATE allenliao_board_comments SET is_deleted = 1 WHERE id = ? AND username = ?';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('is', $id, $username);
  }

  $result = $stmt->execute();
  if (!$result) {
    die('資料刪除失敗<br>' . $conn->error);
  }

  header($indexUrl);
?>