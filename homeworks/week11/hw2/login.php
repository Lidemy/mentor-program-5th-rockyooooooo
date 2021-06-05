<?php
  session_start();
  require_once('utils.php');

  $indexUrl = 'Location: index.php';

  // 檢查是否為管理員，是則禁止訪問此頁面
  if (isAdmin()) {
    header($indexUrl);
    die();
  }
?>

<?php include_once('./views/html_head.php') ?>
<body>
  <?php include_once('./views/header.php') ?>
  <?php include_once('./views/banner.php') ?>
  <section class="container">
    <article class="card">
      <h1 class="login__title">Log In</h1>
      <form class="login__form" action="handle_login.php" method="POST">
        <?php
          if (!empty($_GET['errCode'])) {
            if ($_GET['errCode'] === '1') {
              $errMsg = '認真？沒輸入帳號密碼也想登入？';
            } else if ($_GET['errCode'] === '2') {
              $errMsg = '帳號密碼錯誤啦！再確認一下吧！';
            }
            echo '<h2 class="error">' . $errMsg . '</h2>';
          }
        ?>
        <label class="login__label" for="username">USERNAME</label>
        <input class="login__input" type="text" id="username" name="username" />
        <label class="login__label" for="password">PASSWORD</label>
        <input class="login__input" type="password" id="password" name="password" />
        <button class="btn login__btn" type="submit">SIGN IN</button>
      </form>
    </article>
  </section>
  <?php include_once('./views/footer.php') ?>
</body>
</html>