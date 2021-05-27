<?php
  require_once('conn.php');

  header('Content-type:application/json;chatset=utf-8');

  // 檢查是否輸入留言內容
  if (empty($_POST['content'])) {
    $json = array(
      "ok" => "false",
      "message" => "Please enter content"
    );

    $response = json_encode($json);
    echo $response;
    die();
  }

  $username = $_POST['username'];
  $content = $_POST['content'];

  // 新增 comment
  $sql = 'INSERT INTO allenliao_board_comments(username, content) VALUES(?, ?)';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ss', $username, $content);
  $result = $stmt->execute();
  if (!$result) {
    $json = array(
      "ok" => "false",
      "message" => $conn->error
    );

    $response = json_encode($json);
    echo $response;
    die();
  }

  $json = array(
    "ok" => "true",
    "message" => "Success!"
  );

  $response = json_encode($json);
  echo $response;
?>