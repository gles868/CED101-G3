<?php
try {
    require_once "./connect_ced101g3.php";

    $content = trim(file_get_contents("php://input"));
    $decoded = json_decode($content, true);

    // $type_no = $decoded["type_no"];

    if ($decoded["type_no"] == "") {
        $type_no = "攻擊型";
    } else {
        $type_no = $decoded["type_no"];
    }
    ;

    // echo json_encode($decoded["type"]);

    $sql = "select *
            from product
            where proType = :type_no";

    // $memberdata = $pdo->query($sql);
    $managerdata = $pdo->prepare($sql);
    $managerdata->bindValue(":type_no", $type_no);
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
