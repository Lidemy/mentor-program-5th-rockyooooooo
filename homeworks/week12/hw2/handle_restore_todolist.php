<?php
  session_start();
  require_once("conn.php");
  header("Content-type:application/json;charset=utf-8");
  header("Access-Control-Allow-Origin: *");

  $token = "";
  if (empty($_SESSION["allenliao_todolist_token"])) {
    $json = array(
      "ok" => true,
      "todolist" => null
    );

    $response = json_encode($json);
    echo $response;
    die();
  }

  $token = $_SESSION["allenliao_todolist_token"];

  // 獲取 todolist
  $sql = "SELECT todo_list FROM allenliao_todolist WHERE token = ? ORDER BY id";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("s", $token);
  $result = $stmt->execute();
  if (!$result) {
    $json = array(
      "ok" => false,
      "message" => "Failed!"
    );

    $response = json_encode($json);
    echo $response;
    die();
  }
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();

  $json = array(
    "ok" => true,
    "todolist" => $row['todo_list']
  );

  $response = json_encode($json);
  echo $response;
?>