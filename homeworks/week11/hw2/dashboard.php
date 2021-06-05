<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');
  require_once('paginator.php');

  $indexUrl = 'Location: index.php';

  // 檢查是否為管理員，否則禁止訪問此頁面
  if (!isAdmin()) {
    header($indexUrl);
    die();
  }

  // 取得文章資料
  $sql = 'SELECT id, title, created_at FROM allenliao_blog_articles WHERE is_deleted = 0 ORDER BY id DESC LIMIT ? OFFSET ?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ii', $articleLimit, $offset);
  $result = $stmt->execute();
  if (!$result) {
    die('資料獲取失敗<br>' . $conn->error);
  }
  $result = $stmt->get_result();
?>

<?php include('./views/html_head.php') ?>
<body>
  <?php include_once('./views/header.php') ?>
  <?php include_once('./views/banner.php') ?>
  <section class="container">
    <div class="card">
      <?php while ($row = $result->fetch_assoc()) { ?>
        <article class="dashboard-post">
          <h3 class="dashboard-post__title"><?php echo htmlspecialchars($row['title']) ?></h3>
          <span class="dashboard-post__created-at"><?php echo htmlspecialchars($row['created_at']) ?></span>
          <div class="post__btn-group">
            <a href="edit_post.php?id=<?php echo $row['id'] ?>" class="post__edit-btn btn">編輯</a>
            <a href="handle_delete_post.php?id=<?php echo $row['id'] ?>" class="post__delete-btn btn">刪除</a>
          </div>
        </article>
      <?php } ?>
      <?php
        $url = 'dashboard.php';
        include_once('./views/pagination.php');
      ?>
    </div>
  </section>
  <?php include_once('./views/footer.php') ?>
</body>
</html>
