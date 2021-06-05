<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');
  
  $indexUrl = 'Location: index.php';

  // 檢查是否為管理員及網址是否帶 id，否則跳轉回文章列表
  if (!isAdmin() || empty($_GET['id'])) {
    header($indexUrl);
    die();
  }

  $id = $_GET['id'];

  // 文章軟刪除
  $sql = 'UPDATE allenliao_blog_articles SET is_deleted = 1 WHERE id = ?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i', $id);
  $result = $stmt->execute();
  if (!$result) {
    die('資料更新失敗<br>' . $conn->error);
  }

  // 軟刪除成功，跳轉回文章列表
  header($indexUrl);
?>