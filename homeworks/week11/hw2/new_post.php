<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  $indexUrl = 'Location: index.php';

  // 檢查是否為管理員，否則禁止訪問此頁面
  if (!isAdmin()) {
    header($indexUrl);
    die();
  }

  // 取得分類資料
  $sql = 'SELECT name FROM allenliao_blog_categories';
  $stmt = $conn->prepare($sql);
  $result = $stmt->execute();
  if (!$result) {
    die('資料獲取失敗' . $conn->error);
  }
  $result = $stmt->get_result();
?>

<?php include_once('./views/html_head.php') ?>
<body>
  <?php include_once('./views/header.php') ?>
  <?php include_once('./views/banner.php') ?>
  <section class="container">
    <article class="card">
      <h2 class="new-post__title">發表文章：</h2>
      <form class="new-post__form" action="handle_new_post.php" method="POST">
        <input class="new-post__input" type="text" name="title" placeholder="請輸入文章標題">
        <select class="new-post__select" name="category" id="category">
          <option value="">請輸入文章分類</option>
          <?php while ($row = $result->fetch_assoc()) { ?>
            <option value="<?php echo $row['name'] ?>">
              <?php echo $row['name'] ?>
            </option>
          <?php } ?>
        </select>
        <textarea id="editor" class="new-post__textarea" name="content" id="content" rows="10"></textarea>
        <?php
          if (!empty($_GET['errCode'])) {
            if ($_GET['errCode'] === '1') {
              $errMsg = '資料不齊全';
            }
            echo '<h2 class="error">' . $errMsg . '</h2>';
          }
        ?>
        <button class="btn submit-post__btn" type="submit">送出文章</button>
      </form>
    </article>
  </section>
  <?php include_once('./views/footer.php') ?>
  <script src="https://cdn.ckeditor.com/ckeditor5/27.1.0/classic/ckeditor.js"></script>
  <script src="./public/javascripts/ckeditor.js"></script>
</body>
</html>
