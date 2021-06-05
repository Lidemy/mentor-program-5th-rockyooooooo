<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  // 檢查 session
  if (empty($_SESSION['username'])) {
    header('Location: index.php');
    die();
  }

  $username = $_SESSION['username'];
  $id = $_GET['id'];

  // 取得 comments 資料
  $sql = 'SELECT * FROM allenliao_board_comments WHERE id = ?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s', $id);
  $result = $stmt->execute();
  if (!$result) {
    die('資料獲取失敗<br>' . $conn->error);
  }
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();

  // 檢查username
  if ($_SESSION['username'] !== $row['username'] && checkAuthority($username) !== 'admin') {
    header('Location: index.php');
    die();
  }
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>留言板 - 編輯留言</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header class="warning">
    <strong>本網頁只限於練習，所以忽略了資安問題，切勿把真實帳號密碼輸入</strong>
  </header>
  <main class="container">
    <section>
      <h1>編輯留言</h1>
        <form class="form" method="POST" action="handle_update_comment.php">
          <textarea class="form_input content" name="content" cols="30" rows="5"><?php echo $row['content'] ?></textarea>
          <input type="hidden" name="id" value="<?php echo $row['id'] ?>">
          <?php 
            if (!empty($_GET['errCode'])) {
              $errCode = $_GET['errCode'];
              if ($errCode === '1') {
                $errMsg = '請輸入留言內容';
              }
              echo '<h3 class="error">' . $errMsg . '</h3>';
            }
          ?>
          <button class="btn">送出</button>
        </form>
    </section>
  </main>
</body>
</html>