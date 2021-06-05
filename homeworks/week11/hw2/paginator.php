<?php 
  $articleLimit = 5;
  $page = 1;
  // 如果網址有帶 page 且大於 0，則更新 $page
  if (!empty($_GET['page']) && $_GET['page'] > 0) {
    $page = intval($_GET['page']);
  }
  $offset = ($page - 1) * $articleLimit;

  if (empty($_GET['category'])) {
    $sql = 'SELECT COUNT(id) AS count FROM allenliao_blog_articles WHERE is_deleted = 0';
    $stmt = $conn->prepare($sql);
  } else {
    $category = $_GET['category'];
    $sql = 'SELECT COUNT(id) AS count FROM allenliao_blog_articles WHERE is_deleted = 0 AND category = ?';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $category);
  }
  $result = $stmt->execute();
  if (!$result) {
    die('資料獲取失敗' . $conn-error);
  }
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();
  $count = $row['count'];
  $totalPage = intval(ceil($count / $articleLimit)) ?: 1; // intval(ceil($count / $articleLimit)) 為 0 時，$totalPage 設為 1

  // 若使用者直接在網址上輸入 page，並大於總頁數的話，直接以第一頁處理
  if ($page > $totalPage) {
    $page = 1;
    $offset = 0;
  }
?>