<?php
  require_once('utils.php');
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Allen's Blog</title>
  <link rel="stylesheet" href="style.css">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet">
</head>
<body>
  <?php include('./views/header.php') ?>
  <?php include('./views/banner.php') ?>
  <section class="container">
    <article class="about-me card">
      <a href="https://zh.wikipedia.org/zh-tw/%E9%87%91%E5%9F%8E%E6%AD%A6" target="_blank"><img src="yoroshiku.png" alt="my-photo"></a>
    </article>
  </section>
  <?php include('./views/footer.php') ?>
</body>
</html>
