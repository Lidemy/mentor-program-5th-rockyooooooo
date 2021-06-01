<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  $indexUrl = 'Location: index.php';

  // 檢查是否為管理員及網址是否帶 id，否則跳轉回文章列表
  if (!isAdmin() || empty($_GET['id'])) {
    header($indexUrl);
    die();
  }

  $id = $_GET['id'];
  // 取得文章資料
  $sql = 'SELECT * FROM allenliao_blog_articles WHERE id = ?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i', $id);
  $result = $stmt->execute();
  if (!$result) {
    die('資料獲取失敗<br>' . $conn->error);
  }
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();

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
  <?php include('./views/header.php') ?>
  <?php include('./views/banner.php') ?>
  <section class="container">
    <article class="card">
      <h2 class="new-post__title">編輯文章：</h2>
      <form class="new-post__form" action="handle_edit_post.php" method="POST">
        <input class="new-post__input" type="text" name="title" placeholder="請輸入文章標題" value="<?php echo htmlspecialchars($row['title']) ?>">
        <select class="new-post__select" name="category" id="category">
          <option value="">請輸入文章分類</option>
          <?php while ($category = $result->fetch_assoc()) { ?>
            <option 
              value="<?php echo $category['name'] ?>"
              <?php echo $row['category'] === $category['name'] ? 'selected' : '' ?>
            >
              <?php echo $category['name'] ?>
            </option>
          <?php } ?>
        </select>
        <?php
          $row['content'] = str_replace( '&', '&amp;', $row['content'] );
        ?>
        <textarea id="editor" class="new-post__textarea" name="content" id="content" rows="10"><?php echo $row['content'] ?></textarea>
        <?php
          if (!empty($_GET['errCode'])) {
            if ($_GET['errCode'] === '1') {
              $errMsg = '資料不齊全';
            }
            echo '<h2 class="error">' . $errMsg . '</h2>';
          }
        ?>
        <input type="hidden" name="id" value="<?php echo $row['id'] ?>">
        <button class="btn submit-post__btn" type="submit">送出文章</button>
      </form>
    </article>
  </section>
  <?php include('./views/footer.php') ?>
  <script src="https://cdn.ckeditor.com/ckeditor5/27.1.0/classic/ckeditor.js"></script>
  <script src="./public/javascripts/ckeditor.js"></script>
</body>
</html>
