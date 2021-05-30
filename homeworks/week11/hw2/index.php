<?php
  session_start();
  require_once('conn.php');

  // 取得文章資料
  $sql = 'SELECT * FROM allenliao_blog_articles WHERE is_deleted = 0 ORDER BY id DESC';
  if (empty($_SESSION['username'])) {
    $sql .= ' LIMIT 5';
  }
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
  <title>Allen's Blog</title>
  <link rel="stylesheet" href="style.css">
  <link rel="stylesheet" href="content-styles.css">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet">
</head>
<body>
  <?php include('./views/header.php') ?>
  <?php include('./views/banner.php') ?>
  <section class="container">
    <?php while($row = $result->fetch_assoc()) { ?>
      <article class="post card">
        <div class="post__header">
          <h3 class="post__title"><?php echo $row['title'] ?></h3>
          <?php if (!empty($_SESSION['username'])) { ?>
            <a href="edit_post.php?id=<?php echo $row['id'] ?>" class="post__edit-btn btn">編輯</a>
          <?php } ?>
        </div>
        <div class="post__info">
          <span class="material-icons-outlined">watch_later</span><?php echo $row['created_at'] ?>
          <span class="material-icons-outlined">folder</span><?php echo $row['category'] ?>
        </div>
        <div class="post__preview ck-content"><?php echo $row['content'] ?></div>
        <a class="post__read-more-btn btn" href="post.php?id=<?php echo $row['id'] ?>">READ MORE</a>
      </article>
    <?php } ?>
  </section>
  <?php include('./views/footer.php') ?>
</body>
</html>
