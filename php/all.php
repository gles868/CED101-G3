<?php
// session_start();
try {
    require_once "./connect_ced101g3.php";

    $content = trim(file_get_contents("php://input"));
    $decoded = json_decode($content, true);
   
    // $type_no = $decoded["type_no"];

    // echo json_encode($decoded["type"]);


    $sql = "select *
            from product
            where proStatus = 1";
            
    // $memberdata = $pdo->query($sql);
    $managerdata = $pdo->prepare($sql);
    // $managerdata->bindValue(":memberNo", $_SESSION['memberNo']);
    $managerdata->execute();

    if ($managerdata->rowCount() == 0) { //找不到
        //傳回空的JSON字串
        echo "{}";

    } else { //找得到
        //取回一筆資料
        $memberdatarow = $managerdata->fetchAll(PDO::FETCH_ASSOC);

        //送出json字串
        echo json_encode($memberdatarow);
        // echo $managerdatarow;
    }

} catch (PDOException $e) {
    //echo "系統錯誤, 請通知系維護人員~<br>";
    echo "錯誤行號 : " . $e->getLine() . "<br>";
    echo "錯誤原因 : " . $e->getMessage() . "<br>";
}