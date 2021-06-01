<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');
  
  $indexUrl = 'Location: index.php';
  $editPostUrl = 'Location: edit_post.php';
  $postUrl = 'Location: post.php';

  // 檢查是否為管理員，否則禁止訪問此頁面
  if (!isAdmin()) {
    header($indexUrl);
    die();
  }

  // 檢查是否輸入 title, category, content
  if (empty($_POST['title']) || empty($_POST['category']) || empty($_POST['content'])) {
    header($editPostUrl . '?id=' . $_POST['id'] . '&errCode=1');
    die();
  }

  $title = $_POST['title'];
  $category = $_POST['category'];
  $content = $_POST['content'];
  $id = $_POST['id'];

  // 更新文章
  $sql = 'UPDATE allenliao_blog_articles SET title = ?, category = ?, content = ? WHERE id = ?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('sssi', $title, $category, $content, $id);
  $result = $stmt->execute();
  if (!$result) {
    die('資料更新失敗<br>' . $conn->error);
  }

  // 更新成功，跳轉回該文章
  header($postUrl . '?id=' . $id);
?>