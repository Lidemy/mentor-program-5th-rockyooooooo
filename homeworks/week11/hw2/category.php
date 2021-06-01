<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');
  require_once('paginator.php');

  // 取得文章資料
  $sql = 'SELECT name FROM allenliao_blog_categories';
  $stmt = $conn->prepare($sql);
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
    <div class="card">
      <?php while ($row = $result->fetch_assoc()) { ?>
        <a class="dashboard-post" href="index.php?category=<?php echo htmlspecialchars($row['name']) ?>">
          <h3 class="dashboard-post__title"><?php echo htmlspecialchars($row['name']) ?></h3>
        </a>
      <?php } ?>
    </div>
  </section>
  <?php include_once('./views/footer.php') ?>
</body>
</html>
