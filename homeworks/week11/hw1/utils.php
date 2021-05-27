<?php
  require_once('conn.php');

  function checkAuthority($username) {
    global $conn;
    $sql = 'SELECT * FROM allenliao_board_users WHERE username = ?';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $username);
    $result = $stmt->execute();
    if (!$result) {
      die('資料獲取失敗<br>' . $conn->error);
    }
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    
    return $row['authority'];
  }
?>