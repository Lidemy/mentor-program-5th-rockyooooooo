<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Allen's Blog - Login</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <main class="login__container">
    <section class="login__card">
      <h1 class="login__title">Log In</h1>
      <form class="login__form" action="handle_login.php" method="POST">
        <label class="login__label" for="username">USERNAME</label>
        <input class="login__input" type="text" id="username" name="username" />
        <label class="login__label" for="password">PASSWORD</label>
        <input class="login__input" type="password" id="password" name="password" />
        <button class="btn login__btn" type="submit">SIGN IN</button>
      </form>
    </section>
  </main>
</body>
</html>