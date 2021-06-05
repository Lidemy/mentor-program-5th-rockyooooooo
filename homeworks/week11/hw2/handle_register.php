<?php
  require_once('conn.php');

  $username = $_POST['username'];
  $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

  $sql = 'INSERT INTO allenliao_blog_admin(username, password) VALUES(?, ?)';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ss', $username, $password);
  $result = $stmt->execute();
  if (!$result) {
    die('資料新增失敗' . $conn->error);
  }

  die('新增成功');
?>