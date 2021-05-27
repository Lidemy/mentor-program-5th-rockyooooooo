<?php
  require_once('conn.php');

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
  $comments = array();
  while($row = $result->fetch_assoc()) {
    array_push($comments, array(
      "id" => $row['id'],
      "username" => $row['username'],
      "nickname" => $row['nickname'],
      "content" => $row['content'],
      "created_at" => $row['created_at']
    ));
  }

  $json = array(
    "comments" => $comments
  );

  $response = json_encode($json);
  header('Content-type:application/json;chatset=utf-8');

  echo $response;
?>