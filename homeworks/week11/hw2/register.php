<?php
  session_start();
  require_once('utils.php');
?>

<?php include_once('./views/html_head.php') ?>
<body>
  <?php include_once('./views/header.php') ?>
  <?php include_once('./views/banner.php') ?>
  <section class="container">
    <article class="card">
      <h1 class="login__title">Sign Up</h1>
      <form class="login__form" action="handle_register.php" method="POST">
        <label class="login__label" for="username">USERNAME</label>
        <input class="login__input" type="text" id="username" name="username" />
        <label class="login__label" for="password">PASSWORD</label>
        <input class="login__input" type="password" id="password" name="password" />
        <button class="btn login__btn" type="submit">SIGN UP</button>
      </form>
    </article>
  </section>
  <?php include_once('./views/footer.php') ?>
</body>
</html>