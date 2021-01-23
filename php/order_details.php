<?php
try {
    require_once "./connect_ced101g3.php";

    $content = trim(file_get_contents("php://input"));
    $decoded = json_decode($content, true);

    $memberno = $decoded["memberno"];
    $prototal = $decoded["prototal"]; 
    $memgamepoint = $decoded["memgamepoint"];
    $orderdate = $decoded["orderdate"]; 
    $paymentmethod = $decoded["paymentmethod"]; 
    $deliveryaddress = $decoded["deliveryaddress"];
    $distotal = $decoded["distotal"];


  
    
    $sql = "insert into product_order (memberNo,orderDate,proTotal,memGamePoint,paymentMethod,deliveryAddress,disTotal)
    values (:memberno,:orderdate,:prototal,:memgamepoint,:paymentmethod,:deliveryaddress,:distotal)";

    $managerdata = $pdo->prepare($sql);

    $managerdata->bindValue(":prototal", $prototal);
    $managerdata->bindValue(":memberno", $memberno);
    $managerdata->bindValue(":orderdate", $orderdate);
    $managerdata->bindValue(":memgamepoint", $memgamepoint);
    $managerdata->bindValue(":paymentmethod", $paymentmethod);
    $managerdata->bindValue(":deliveryaddress", $deliveryaddress);
    $managerdata->bindValue(":distotal", $distotal);


    $managerdata->execute();


    $prono = $pdo->LASTINSERTID();

    $ord_items = $decoded["ord_items"];
    
    for($i=0;$i<count($ord_items);$i++){

        $item = $ord_items[$i]["item"];
        $smalltotal = $ord_items[$i]["smalltotal"];
        $num = $ord_items[$i]["num"];

        $sql = "insert into order_details (proOrder,proNo,proPrice,orderNumber)
        values (:proorder,:item,:smalltotal,:num)";

    $managerdata = $pdo->prepare($sql);

    $managerdata->bindValue(":proorder", $prono);
    $managerdata->bindValue(":item", $item);
    $managerdata->bindValue(":smalltotal", $smalltotal);
    $managerdata->bindValue(":num", $num);

    $managerdata->execute();

    }


    
    $sql = "update member
    set memGamePoint = 0
    where memberNo = :memberno ";

    $managerdata = $pdo->prepare($sql);


    $managerdata->bindValue(":memberno", $memberno);



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