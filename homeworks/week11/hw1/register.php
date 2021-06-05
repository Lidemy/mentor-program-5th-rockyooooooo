<?php
  session_start();

  // 若是登入狀態禁止訪問註冊頁面
  if (!empty($_SESSION['username'])) {
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
  <title>留言板 - 註冊</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header class="warning">
    <strong>本網頁只限於練習，所以忽略了資安問題，切勿把真實帳號密碼輸入</strong>
  </header>
  <main class="container">
    <section>
      <button class="btn"><a href="login.php">登入</a></button>
      <button class="btn"><a href="index.php">回留言板</a></button>
      <h1>註冊</h1>
      <form class="form" method="POST" action="handle_register.php">
        <label class="form_label">
          帳號：
          <input class="form_input" type="text" name="username" />
        </label>
        <label class="form_label">
          密碼：
          <input class="form_input" type="password" name="password" />
        </label>
        <label class="form_label">
          暱稱：
          <input class="form_input" type="text" name="nickname" />
        </label>
        <?php
          if (!empty($_GET['errCode'])) {
            $errCode = $_GET['errCode'];
            if ($errCode === '1') {
              $errMsg = '資料不齊全';
            } else if ($errCode === '2') {
              $errMsg = '此帳號已被註冊';
            } else if ($errCode === '3') {
              $errMsg = '帳號不能有特殊符號';
            } else {
              $errMsg = '';
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