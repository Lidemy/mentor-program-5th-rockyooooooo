<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');
  
  $username = $_SESSION['username'];
  $content = $_POST['content'];
  $id = $_POST['id'];

  // 檢查是否輸入 comment 內容
  if (!$content) {
    header('Location: update_comment.php?errCode=1&id=' . $id);
    die();
  }

  // 更新 comment
  if (checkAuthority($username) === 'admin') {
    $sql = 'UPDATE allenliao_board_comments SET content = ? WHERE id = ?';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('si', $content, $id);
  } else {
    $sql = 'UPDATE allenliao_board_comments SET content = ? WHERE id = ? AND username = ?';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('sis', $content, $id, $username);
  }

  $result = $stmt->execute();
  if (!$result) {
    die('資料更新失敗<br>' . $conn->error);
  }

  header('Location: index.php');
?>