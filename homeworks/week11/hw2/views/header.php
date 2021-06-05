<header>
  <a href="index.php" class="header__logo">Allen's Blog</a>
  <nav class="header__nav">
    <div class="header__navbar">
      <a class="btn" href="list.php">文章列表</a>
      <a class="btn" href="category.php">分類專區</a>
      <a class="btn" href="about_me.php">關於我</a>
    </div>
    <div class="header__controller">
      <?php if (!isAdmin()) { ?>
        <a class="btn" href="login.php">登入</a>
      <?php } else { ?>
        <a class="btn" href="new_post.php">發表文章</a>
        <a class="btn" href="dashboard.php">管理後臺</a>
        <a class="btn" href="handle_logout.php">登出</a>
      <?php } ?>
    </div>
  </nav>
  <span class="material-icons-outlined hamburger">menu</span>
</header>