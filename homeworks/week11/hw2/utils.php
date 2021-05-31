<?php
  // session_start();
  require_once('conn.php');

  function isAdmin() {
    global $conn;
    if (empty($_SESSION['username'])) return false;
    $username = $_SESSION['username'];
    $sql = 'SELECT * FROM allenliao_blog_admin WHERE username = ?';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $username);
    $result = $stmt->execute();
    return $result;
  }
?>