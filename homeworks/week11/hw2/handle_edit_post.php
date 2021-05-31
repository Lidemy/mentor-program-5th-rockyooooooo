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
  $content = $_POST['content'];
  $id = $_POST['id'];

  switch ($_POST['category']) {
    case 'notes':
      $category = '隨筆';
      break;
    case 'songs':
      $category = '好聽ㄉ歌';
      break;
    case 'learning':
      $category = '學習紀錄';
      break;
    case 'test':
      $category = '測試用';
      break;
  }

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