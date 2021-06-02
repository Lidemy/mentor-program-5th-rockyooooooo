<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  $indexUrl = 'Location: index.php';

  // 檢查 session
  if (empty($_SESSION['username'])) {
    header($indexUrl);
    die();
  }

  // 檢查訪問者權限
  $username = $_SESSION['username'];
  if (checkAuthority($username) !== 'admin') {
    header($indexUrl);
    die();
  }
  
  // 取得 users 資料
  $sql = 'SELECT * FROM allenliao_board_users';
  $stmt = $conn->prepare($sql);
  $result = $stmt->execute();
  if (!$result) {
    die('資料獲取失敗<br>' . $conn->error);
  }
  $result = $stmt->get_result();
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>管理員後台</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header class="warning">
    <strong>本網頁只限於練習，所以忽略了資安問題，切勿把真實帳號密碼輸入</strong>
  </header>
  <main class="container">
    <section>
      <h1>管理使用者
        <button class="btn"><a href="index.php">回留言板</a></button>
      </h1>
    </section>
    <section>
      <?php while($row = $result->fetch_assoc()) { ?>
        <form action="handle_update_authority.php" method="post">
          <article class="user">
            <div class="user_avatar"></div>
            <div class="user_info">
              <span class="user_name">
                <?php echo htmlentities($row['nickname']) ?>
                (@<?php echo htmlentities($row['username']) ?>)
              </span>
              <select class="user_authority" name="authority">
                <option value="admin" <?php echo $row['authority'] === 'admin' ? 'selected' : '' ?>>管理員</option>
                <option value="general_user" <?php echo $row['authority'] === 'general_user' ? 'selected' : '' ?>>一般使用者</option>
                <option value="disabled_user" <?php echo $row['authority'] === 'disabled_user' ? 'selected' : '' ?>>停權使用者</option>
              </select>
              <input type="hidden" name="id" value="<?php echo $row['id'] ?>">
              <span class="user_created-at"><?php echo htmlentities($row['created_at']) ?></span>
              <button type="submit" class="small-btn">儲存</button>
            </div>
          </article>
        </form>
      <?php } ?>
    </section>
  </main>
</body>
</html>
