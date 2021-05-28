<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  $username = null;
  $authority = 'guest';
  // 檢查 session
  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
  
    // 取得 users 資料
    $sql = 'SELECT nickname, authority FROM allenliao_board_users WHERE username = ?';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $username);
    $result = $stmt->execute();
    if (!$result) {
      die('資料獲取失敗<br>' . $conn->error);
    }
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    $nickname = $row['nickname'];
    $authority = $row['authority'];
  }

  $page = 1;
  if (!empty($_GET['page'])) {
    $page = intval($_GET['page']);
  }
  $commentsLimit = 5;
  $offset = ($page - 1) * $commentsLimit;

  // 取得 comments 資料
  $sql = 'SELECT '.
    'C.id AS id, '.
    'U.username AS username, '.
    'U.nickname AS nickname, '.
    'C.created_at AS created_at, '.
    'C.content AS content '.
    'FROM allenliao_board_comments AS C '.
    'LEFT JOIN allenliao_board_users AS U '.
    'ON C.username = U.username '.
    'WHERE C.is_deleted IS NULL '.
    'ORDER BY C.id DESC '.
    'LIMIT ? OFFSET ?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ii', $commentsLimit, $offset);
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
  <title>留言板</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header class="warning">
    <strong>本網頁只限於練習，所以忽略了資安問題，切勿把真實帳號密碼輸入</strong>
  </header>
  <main class="container">
    <section>
      <h1>留言板
        <?php if (!empty($authority) && $authority === 'admin') { ?>
          <button class="btn"><a href="dashboard.php">管理後台</a></button>
        <?php } ?>
      </h1>
      <?php if ($username) { ?>
        <h3 class="welcome-msg">
          歡迎回來，<?php echo htmlentities($nickname) ?>
          <?php if (checkAuthority($username) !== 'disabled_user') { ?>
            <button class="btn edit-nickname-btn">編輯暱稱</button>
          <?php } ?>
          <button class="btn"><a href="handle_logout.php">登出</a></button>
        </h3>
        <?php if (checkAuthority($username) === 'disabled_user') { ?>
          <h2 class="error">帳號已遭停權</h2>
          <p>不過你還是可以編輯跟刪除你的留言😘</p>
        <?php } else { ?>
          <form class="form hide edit-nickname-form" method="POST" action="handle_update_user.php">
            <label class="form_label">
              新的暱稱：
              <input class="form_input nickname" type="text" name="nickname" />
            </label>
            <button class="btn">送出</button>
          </form>
          <form class="form" method="POST" action="handle_add_comment.php">
            <textarea class="form_input content" name="content" cols="30" rows="5"></textarea>
            <?php 
              if (!empty($_GET['errCode'])) {
                $errCode = $_GET['errCode'];
                if ($errCode === '1') {
                  $errMsg = '請輸入留言內容';
                }
                echo '<h3 class="error">' . $errMsg . '</h3>';
              }
            ?>
            <button class="btn">送出</button>
          </form>
        <?php } ?>
      <?php } else { ?>
        <h2 class="error">請登入發布留言</h2>
        <button class="btn"><a href="register.php">註冊</a></button>
        <button class="btn"><a href="login.php">登入</a></button>
      <?php } ?>
    </section>
    <section>
      <?php while($row = $result->fetch_assoc()) { ?>
        <article class="comment">
          <div class="comment_avatar"></div>
          <div class="comment_body">
            <div class="comment_info">
              <span class="comment_name">
                <?php echo htmlentities($row['nickname']) ?>
                (@<?php echo htmlentities($row['username']) ?>)
              </span>
              <span class="comment_created-at"><?php echo htmlentities($row['created_at']) ?></span>
              <?php if ($username === $row['username'] || $authority === 'admin') { ?>
                <button class="small-btn"><a href="./update_comment.php?id=<?php echo $row['id'] ?>">編輯</a></button>
                <button class="small-btn danger"><a href="./handle_delete_comment.php?id=<?php echo $row['id'] ?>">刪除</a></button>
              <?php } ?>
            </div>
            <div class="comment_content"><?php echo htmlentities($row['content']) ?></div>
          </div>
        </article>
      <?php } ?>
    </section>
    <?php 
      $sql = 'SELECT COUNT(id) AS count FROM allenliao_board_comments WHERE is_deleted IS NULL';
      $stmt = $conn->prepare($sql);
      $result = $stmt->execute();
      $result = $stmt->get_result();
      $row = $result->fetch_assoc();
      $count = $row['count'];
      $totalPage = intval(ceil($count / $commentsLimit)) ?: 1; // ceil() 回傳的是 float 型態，先轉換成 int，如果算出來是 0，則設為 1
    ?>  
    <section class="pagination">
      <p>共有 <?php echo $count ?> 筆留言，頁數：<?php echo $page ?> / <?php echo $totalPage ?></p>
      <div>
        <?php if ($page !== 1) { ?>
          <button class="btn"><a href="index.php">第一頁</a></button>
          <button class="btn"><a href="index.php?page=<?php echo $page - 1 ?>">上一頁</a></button>
        <?php } ?>
        <?php if ($page !== $totalPage) { ?>
          <button class="btn"><a href="index.php?page=<?php echo $page + 1 ?>">下一頁</a></button>
          <button class="btn"><a href="index.php?page=<?php echo $totalPage ?>">最末頁</a></button>
        <?php } ?>
      </div>
    </section>
  </main>

  <script>
    const editNicknameBtn = document.querySelector('.edit-nickname-btn')
    const editNicknameForm = document.querySelector('.edit-nickname-form')

    if(editNicknameBtn) editNicknameBtn.addEventListener('click', () => editNicknameForm.classList.toggle('hide'))
  </script>
</body>
</html>