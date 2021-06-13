<?php
  require_once("conn.php");
  header("Content-type:application/json;charset=utf-8"); // 指定輸出 type 為 json 格式
  header("Access-Control-Allow-Origin: *");

  // 檢查網址是否帶 site_key
  if (
    empty($_GET["site_key"])
  ) {
    $json = array(
      "ok" => false,
      "message" => "Please add site_key in url."
    );

    $response = json_encode($json);
    echo $response;
    die();
  }

  $site_key = $_GET["site_key"];
  $limit = $_GET["limit"];
  $offset = $_GET["offset"];

  // 取得 discussions 數量
  $sql = "SELECT COUNT(id) AS count FROM allenliao_discussions WHERE site_key = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s', $site_key);
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
  $count = $row['count'];

  // 取得 discussions
  $sql = 
    "SELECT 
      nickname, content, created_at 
    FROM 
      allenliao_discussions 
    WHERE 
      site_key = ? 
    ORDER BY 
      id 
    DESC 
    LIMIT ? 
    OFFSET ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("sii", $site_key, $limit, $offset);
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
  $discussions = array();
  while($row = $result->fetch_assoc()) {
    array_push($discussions, array(
      "nickname" => $row["nickname"],
      "content" => $row["content"],
      "created_at" => $row["created_at"]
    ));
  }

  $json = array(
    "ok" => true,
    "discussions" => $discussions,
    "count" => $count
  );

  $response = json_encode($json);
  echo $response;
?>