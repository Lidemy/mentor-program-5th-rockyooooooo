<?php
  require_once("conn.php");
  header("Content-type:application/json;charset=utf-8"); // 指定輸出 type 為 json 格式
  header("Access-Control-Allow-Origin: *");

  // 檢查是否輸入 site_key, nickname, content
  if (
    empty($_POST["site_key"]) || 
    empty($_POST["nickname"]) || 
    empty($_POST["content"])
  ) {
    $json = array(
      "ok" => false,
      "message" => "Please enter missing fields."
    );

    $response = json_encode($json);
    echo $response;
    die();
  }

  $site_key = $_POST["site_key"];
  $nickname = $_POST["nickname"];
  $content = $_POST["content"];

  // 新增 discussions
  $sql = 
  "INSERT INTO 
    allenliao_discussions(site_key, nickname, content) 
  VALUES
    (?, ?, ?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("sss", $site_key, $nickname, $content);
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

  $json = array(
    "ok" => true,
    "message" => "Success!"
  );

  $response = json_encode($json);
  echo $response;
?>