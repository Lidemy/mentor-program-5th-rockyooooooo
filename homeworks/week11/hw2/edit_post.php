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

  $sql = 'SELECT * FROM allenliao_blog_articles WHERE id = ?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i', $id);
  $result = $stmt->execute();
  if (!$result) {
    die('資料獲取失敗<br>' . $conn->error);
  }
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Allen's Blog - Edit Post</title>
  <link rel="stylesheet" href="style.css">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet">
</head>
<body>
  <?php include('./views/header.php') ?>
  <?php include('./views/banner.php') ?>
  <section class="container">
    <article class="card">
      <h2 class="new-post__title">編輯文章：</h2>
      <form class="new-post__form" action="handle_edit_post.php" method="POST">
        <input class="new-post__input" type="text" name="title" placeholder="請輸入文章標題" value="<?php echo $row['title'] ?>">
        <select class="new-post__select" name="category" id="category">
          <option value="">請輸入文章分類</option>
          <option value="notes" <?php echo $row['category'] === '隨筆' ? 'selected' : '' ?>>隨筆</option>
          <option value="songs" <?php echo $row['category'] === '好聽ㄉ歌' ? 'selected' : '' ?>>好聽ㄉ歌</option>
          <option value="learning" <?php echo $row['category'] === '學習紀錄' ? 'selected' : '' ?>>學習紀錄</option>
          <option value="test" <?php echo $row['category'] === '測試用' ? 'selected' : '' ?>>測試用</option>
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
  <script>
    ClassicEditor
      .create( document.querySelector( '#editor' ), {
        toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', 'insertTable', '|', 'undo', 'redo' ],
        heading: {
          options: [
            { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
            { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
            { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
            { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' }
          ]
        }
      })
      .catch( error => {
        console.error( error );
      });
  </script>
</body>
</html>
