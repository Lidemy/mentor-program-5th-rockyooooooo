<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  // 取得文章資料
  $sql = 'SELECT id, title, created_at FROM allenliao_blog_articles WHERE is_deleted = 0 ORDER BY id DESC';
  $stmt = $conn->prepare($sql);
  $result = $stmt->execute();
  if (!$result) {
    die('資料獲取失敗<br>' . $conn->error);
  }
  $result = $stmt->get_result();
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Allen's Blog - Dashboard</title>
  <link rel="stylesheet" href="style.css">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet">
</head>
<body>
  <?php include('./views/header.php') ?>
  <?php include('./views/banner.php') ?>
  <section class="container">
    <div class="card">
      <?php while ($row = $result->fetch_assoc()) { ?>
        <a class="dashboard-post" href="post.php?id=<?php echo $row['id'] ?>">
          <h3 class="dashboard-post__title"><?php echo $row['title'] ?></h3>
          <span class="dashboard-post__created-at"><?php echo $row['created_at'] ?></span>
        </a>
      <?php } ?>
    </div>
  </section>
  <?php include('./views/footer.php') ?>
</body>
</html>
