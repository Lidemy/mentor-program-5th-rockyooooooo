<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Allen's Blog - New Post</title>
  <link rel="stylesheet" href="style.css">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet">
</head>
<body>
  <header>
    <h2 class="header__logo">Allen's Blog</h2>
    <nav class="header__navbar">
      <a class="btn" href="#">文章列表</a>
      <a class="btn" href="#">分類專區</a>
      <a class="btn" href="#">關於我</a>
    </nav>
    <div class="header__control">
      <a class="btn" href="#">管理後臺</a>
      <a class="btn" href="#">登出</a>
      <a class="btn" href="#">註冊</a>
      <a class="btn" href="#">登入</a>
    </div>
  </header>
  <section class="banner">
    <div class="banner__container">
      <h1 class="banner__title">存放技術之地</h1>
      <p class="banner__description">Welcome to my blog</p>
    </div>
  </section>
  <section class="container">
    <article class="card">
      <h2 class="new-post__title">發表文章：</h2>
      <form class="new-post__form" action="handle_new_post.php" method="POST">
        <input class="new-post__input" type="text" placeholder="請輸入文章標題">
        <select class="new-post__select" name="category" id="category">
          <option value="">請輸入文章分類</option>
        </select>
        <textarea class="new-post__textarea" name="content" id="content" rows="10"></textarea>
        <button class="btn new-post__btn" type="submit">送出文章</button>
      </form>
    </article>
  </section>
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>
</html>
