<?php
  session_start();
  require_once("conn.php");
  header("Content-type:application/json;charset=utf-8");
  header("Access-Control-Allow-Origin: *");

  if (empty($_POST["todo_list"])) {
    die();
  }

  $todo_list = $_POST["todo_list"];

  $token = "";
  if (empty($_SESSION["allenliao_todolist_token"])) {
    // 若沒有 token session，生成一個隨機的 token，並賦給 session
    for ($i=0; $i<10; $i++) {
      $token .= chr(rand(65,90));
    }
    $_SESSION["allenliao_todolist_token"] = $token;
    // 儲存 todolist 到 database
    $sql = "INSERT INTO allenliao_todolist(todo_list, token) VALUES(?, ?)";
    $stmt = $conn->prepare($sql);
  } else {
    // 若已有 token session，賦給 $token
    $token = $_SESSION["allenliao_todolist_token"];
    // 更新 todolist 到 database
    $sql = "UPDATE allenliao_todolist SET todo_list = ? WHERE token = ?";
    $stmt = $conn->prepare($sql);
  }

  $stmt->bind_param("ss", $todo_list, $token);
  $result = $stmt->execute();
  if (!$result) {
    if ($conn->errno === 1062) {
      $json = array(
        "ok" => false,
        "message" => "請再試一次！"
      );
    } else {
      $json = array(
        "ok" => false,
        "message" => "儲存失敗！"
      );
    }

    $response = json_encode($json);
    echo $response;
    die();
  }

  $json = array(
    "ok" => true,
    "token" => $token
  );

  $response = json_encode($json);
  echo $response;
?>