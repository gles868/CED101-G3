<?php
try {
    require_once "./connect_ced101g3.php";

    $content = trim(file_get_contents("php://input"));
    $decoded = json_decode($content, true);


    $item = $decoded["item"];
    $smalltotal = $decoded["smalltotal"];
    $num = $decoded["num"];
    $proorder = $decoded["proorder"];
    
    $sql = "insert into order_details (proOrder,proNo,proPrice,orderNumber)
            values (:proorder,:item,:smalltotal,:num)";
    // $grouporddata = $pdo->query($sql);
    
    $managerdata = $pdo->prepare($sql);
    $managerdata->bindValue(":proorder", $proorder);
    $managerdata->bindValue(":item", $item);
    $managerdata->bindValue(":smalltotal", $smalltotal);
    $managerdata->bindValue(":num", $num);


    $managerdata->execute();



    echo "修改成功~!!";
    // if ($per_ord_data->rowCount() == 0) { //找不到
        //傳回空的JSON字串
        // echo "{}";

    // } else { //找得到
        //取回一筆資料
        // $per_ord_datarow = $per_ord_data->fetchAll(PDO::FETCH_ASSOC);

       
        //送出json字串
        // echo json_encode($per_ord_datarow);
        // echo $managerdatarow;
    

} catch (PDOException $e) {
    echo "系統錯誤, 請通知系維護人員~<br>";
    // echo "錯誤行號 : " . $e->getLine() . "<br>";
    // echo "錯誤原因 : " . $e->getMessage() . "<br>";
}