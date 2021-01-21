<?php
try {
    require_once "./connect_ced101g3.php";

    $content = trim(file_get_contents("php://input"));
    $decoded = json_decode($content, true);


    $member_no = $decoded["memberno"];
    $pro_total = $decoded["prototal"]; 
    $orderDate = $decoded["orderdate"]; 
    $paymentMethod = $decoded["paymentmethod"]; 
    $deliveryAddress = $decoded["deliveryaddress"]; 
    
    $sql = "insert into product_order (memberNo,orderDate,proTotal,paymentMethod,deliveryAddress)
            values (:memberNo,:prototal,:orderdate,:paymentmethod,:deliveryaddress)";
    // $grouporddata = $pdo->query($sql);
    $managerdata = $pdo->prepare($sql);
    $managerdata->bindValue(":prototal", $pro_total);
    $managerdata->bindValue(":memberno", $member_no);
    $managerdata->bindValue(":orderdate", $orderDate);
    $managerdata->bindValue(":paymentmethod", $paymentMethod);
    $managerdata->bindValue(":deliveryaddress", $deliveryAddress);
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