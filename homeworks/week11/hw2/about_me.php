<?php
  session_start();
  require_once('utils.php');
?>

<?php include_once('./views/html_head.php') ?>
<body>
  <?php include_once('./views/header.php') ?>
  <?php include_once('./views/banner.php') ?>
  <section class="container">
    <article class="about-me card">
      <a href="https://zh.wikipedia.org/zh-tw/%E9%87%91%E5%9F%8E%E6%AD%A6" target="_blank"><img src="yoroshiku.png" alt="my-photo"></a>
    </article>
  </section>
  <?php include_once('./views/footer.php') ?>
</body>
</html>
