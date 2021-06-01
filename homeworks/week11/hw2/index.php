<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');
  require_once('paginator.php');

  // 取得文章資料
  if (empty($_GET['category'])) {
    $sql = 'SELECT * FROM allenliao_blog_articles WHERE is_deleted = 0 ORDER BY id DESC LIMIT ? OFFSET ?';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ii', $articleLimit, $offset);
  } else {
    $category = $_GET['category'];
    $sql = 'SELECT * FROM allenliao_blog_articles WHERE category = ? AND is_deleted = 0 ORDER BY id DESC LIMIT ? OFFSET ?';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('sii', $category, $articleLimit, $offset);
  }

  $result = $stmt->execute();
  if (!$result) {
    die('資料獲取失敗<br>' . $conn->error);
  }
  $result = $stmt->get_result();
?>

<?php include_once('./views/html_head.php') ?>
<body>
  <?php include_once('./views/header.php') ?>
  <?php include_once('./views/banner.php') ?>
  <section class="container">
    <?php while($row = $result->fetch_assoc()) { ?>
      <article class="post card">
        <div class="post__header">
          <h3 class="post__title"><?php echo htmlspecialchars($row['title']) ?></h3>
          <?php if (isAdmin()) { ?>
            <a href="edit_post.php?id=<?php echo $row['id'] ?>" class="post__edit-btn btn">編輯</a>
          <?php } ?>
        </div>
        <div class="post__info">
          <span class="material-icons-outlined">watch_later</span><?php echo htmlspecialchars($row['created_at']) ?>
          <span class="material-icons-outlined">folder</span><?php echo htmlspecialchars($row['category']) ?>
        </div>
        <div class="post__preview ck-content"><?php echo $row['content'] ?></div>
        <a class="post__read-more-btn btn" href="post.php?id=<?php echo $row['id'] ?>">READ MORE</a>
      </article>
    <?php } ?>
    <?php
      $url = 'index.php';
      include_once('./views/pagination.php');
    ?>
  </section>
  <?php include_once('./views/footer.php') ?>
</body>
</html>
