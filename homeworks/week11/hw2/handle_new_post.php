<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');
  
  $indexUrl = 'Location: index.php';
  $newPostUrl = 'Location: new_post.php';

  // 檢查是否為管理員，否則禁止訪問此頁面
  if (!isAdmin()) {
    header($indexUrl);
    die();
  }

  // 檢查是否輸入 title, category, content
  if (empty($_POST['title']) || empty($_POST['category']) || empty($_POST['content'])) {
    header($newPostUrl . '?errCode=1');
    die();
  }

  $title = $_POST['title'];
  $content = $_POST['content'];

  switch ($_POST['category']) {
    case 'announcement':
      $category = '歷史公告';
      break;
  }
  
  // 新增文章
  $sql = 'INSERT INTO allenliao_blog_articles(title, category, content) VALUES(?, ?, ?)';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('sss', $title, $category, $content);
  $result = $stmt->execute();
  if (!$result) {
    die('資料新增失敗<br>' . $conn->error);
  }

  // 新增成功，跳轉回文章列表
  header($indexUrl);
?>