<?php
  session_start();
  require_once('conn.php');

  $username = null;
  // 檢查 session
  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
  
    // 取得 users 資料
    $format = 'SELECT nickname FROM allenliao_board_users WHERE username = "%s"';
    $sql = sprintf($format, $username);
    $result = $conn->query($sql);
    if (!$result) {
      die('資料獲取失敗<br>' . $conn->error);
    }
    $row = $result->fetch_assoc();
    $nickname = $row['nickname'];
  }

  // 取得 comments 資料
  $sql = 'SELECT * FROM allenliao_board_comments ORDER BY id DESC';
  $result = $conn->query($sql);
  if (!$result) {
    die('資料獲取失敗<br>' . $conn->error);
  }
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>留言板</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header class="warning">
    <strong>本網頁只限於練習，所以忽略了資安問題，切勿把真實帳號密碼輸入</strong>
  </header>
  <main class="container">
    <section>
      <h1>留言板</h1>
      <?php if ($username) { ?>
        <h3>歡迎回來，<?php echo $nickname ?></h3>
        <button class="btn"><a href="handle_logout.php">登出</a></button>
        <form class="form" method="POST" action="handle_add_comment.php">
          <textarea class="form_input content" name="content" cols="30" rows="5"></textarea>
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
      <?php } else { ?>
        <h2 class="error">請登入發布留言</h2>
        <button class="btn"><a href="register.php">註冊</a></button>
        <button class="btn"><a href="login.php">登入</a></button>
      <?php } ?>
    </section>
    <section>
      <?php while($row = $result->fetch_assoc()) { ?>
        <article class="comment">
          <div class="comment_avatar"></div>
          <div class="comment_body">
            <div class="comment_info">
              <span class="comment_nickname"><?php echo $row['nickname'] ?></span>
              <span class="comment_time"><?php echo $row['created_at'] ?></span>
            </div>
            <div class="comment_content"><?php echo $row['content'] ?></div>
          </div>
        </article>
      <?php } ?>
    </section>
  </main>
</body>
</html>