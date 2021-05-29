<header>
    <a href="index.php" class="header__logo">Allen's Blog</a>
    <nav class="header__navbar">
      <a class="btn" href="list.php">文章列表</a>
      <a class="btn" href="#">分類專區</a>
      <a class="btn" href="#">關於我</a>
    </nav>
    <div class="header__control">
      <?php if (empty($_SESSION['username'])) { ?>
        <a class="btn" href="login.php">登入</a>
      <?php } else { ?>
        <a class="btn" href="new_post.php">發表文章</a>
        <a class="btn" href="dashboard.php">管理後臺</a>
        <a class="btn" href="handle_logout.php">登出</a>
      <?php } ?>
    </div>
  </header>