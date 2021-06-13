<?php
  session_start();
  require_once("conn.php");
  header("Content-type:application/json;charset=utf-8");
  header("Access-Control-Allow-Origin: *");

  $token = "";
  if (empty($_SESSION["allenliao_todolist_token"]) && empty($_POST["token"])) {
    $defaultTodoList = array();
    array_push(
      $defaultTodoList,
      array(
        "id" => 1,
        "todo" => "左下按鈕說明",
        "isChecked" => true
      ),
      array(
        "id" => 2,
        "todo" => "顯示全部 / 完成 / 未完成任務",
        "isChecked" => false
      ),
      array(
        "id" => 3,
        "todo" => "右下按鈕說明",
        "isChecked" => true
      ),
      array(
        "id" => 4,
        "todo" => "紅色按鈕為刪除已完成任務",
        "isChecked" => false
      ),
      array(
        "id" => 5,
        "todo" => "藍色按鈕為儲存 todolist",
        "isChecked" => false
      ),
      array(
        "id" => 6,
        "todo" => "綠色按鈕為匯入 todolist",
        "isChecked" => false
      ),
      array(
        "id" => 7,
        "todo" => "儲存及匯入功能說明",
        "isChecked" => true
      ),
      array(
        "id" => 8,
        "todo" => "todolist 儲存後會有一組 token，可用這組 token 匯入 todolist",
        "isChecked" => false
      ),
      array(
        "id" => 9,
        "todo" => "中下圖示說明",
        "isChecked" => true
      ),
      array(
        "id" => 10,
        "todo" => "顯示目前未完成任務數量，最多顯示到 9，超過 9 顯示 9+",
        "isChecked" => false
      )
    );

    $json = array(
      "ok" => true,
      "todolist" => json_encode($defaultTodoList)
    );

    $response = json_encode($json);
    echo $response;
    die();
  }

  // 若使用者有傳入 token，優先使用，否則使用 session token
  if (empty($_POST["token"])) {
    $token = $_SESSION["allenliao_todolist_token"];
  } else {
    $token = $_POST["token"];
    $_SESSION["allenliao_todolist_token"] = $token;
  }

  // 獲取 todolist
  $sql = "SELECT todo_list FROM allenliao_todolist WHERE token = ? ORDER BY id";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("s", $token);
  $result = $stmt->execute();
  if (!$result) {
    $json = array(
      "ok" => false,
      "message" => "資料獲取失敗"
    );

    $response = json_encode($json);
    echo $response;
    die();
  }

  $result = $stmt->get_result();
  if (!$result->num_rows) {
    // 清空 session，避免儲存時存到這個不在資料庫裡的 token
    session_destroy();

    $json = array(
      "ok" => true,
      "todolist" => null,
      "message" => "找不到資料"
    );

    $response = json_encode($json);
    echo $response;
    die();
  }
  $row = $result->fetch_assoc();

  $json = array(
    "ok" => true,
    "todolist" => $row["todo_list"],
    "message" => "復原成功！"
  );

  $response = json_encode($json);
  echo $response;
?>