<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  $indexUrl = 'Location: index.php';

  // 檢查網址是否帶 id，否則跳轉回文章列表
  if (empty($_GET['id'])) {
    header($indexUrl);
    die();
  }
  $id = $_GET['id'];

  // 取得文章資料
  $sql = 'SELECT * FROM allenliao_blog_articles WHERE id = ? AND is_deleted = 0';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i', $id);
  $result = $stmt->execute();
  if (!$result) {
    die('資料獲取失敗<br>' . $conn->error);
  }
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();

  // 檢查是否找到此 id 的文章，否則跳轉回文章列表
  if (!$result->num_rows) {
    header($indexUrl);
    die();
  }
?>

<?php include_once('./views/html_head.php') ?>
<body>
  <?php include_once('./views/header.php') ?>
  <?php include_once('./views/banner.php') ?>
  <section class="container">
    <article class="post card">
      <div class="post__header">
        <h3 class="post__title"><?php echo htmlspecialchars($row['title']) ?></h3>
        <?php if (!empty($_SESSION['username'])) { ?>
          <div class="post__btn-group">
            <a href="edit_post.php?id=<?php echo $row['id'] ?>" class="post__edit-btn btn">編輯</a>
            <a href="handle_delete_post.php?id=<?php echo $row['id'] ?>" class="post__delete-btn btn">刪除</a>
          </div>
        <?php } ?>
      </div>
      <div class="post__info">
        <span class="material-icons-outlined">watch_later</span><?php echo htmlspecialchars($row['created_at']) ?>
        <span class="material-icons-outlined">folder</span><?php echo htmlspecialchars($row['category']) ?>
      </div>
      <div class="post__content ck-content"><?php echo $row['content'] ?></div>
      <a class="post__back-btn btn" href="index.php">回首頁</a>
      <a class="post__back-btn btn" href="list.php">回文章列表</a>
    </article>
  </section>
  <?php include_once('./views/footer.php') ?>
</body>
</html>
