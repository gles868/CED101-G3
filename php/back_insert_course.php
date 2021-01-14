<?php
try {
    require_once "./connect_g3_database.php";

    $content = trim(file_get_contents("php://input"));
    $decoded = json_decode($content, true);

    $courTypeNo = $decoded["courTypeNo"];
    $courseName = $decoded["courseName"];
    $courseDescription = $decoded["courseDescription"];
    $coursePrice = $decoded["coursePrice"];

    $sql = "
            insert into course(courTypeNo,courseName,courseDescription,coursePrice)
            values (:courTypeNo,:courseName,:courseDescription,:coursePrice);
            ";

    // $grouporddata = $pdo->query($sql);
    $per_ord_data = $pdo->prepare($sql);
    $per_ord_data->bindValue(":courTypeNo", $courTypeNo);
    $per_ord_data->bindValue(":courseName", $courseName);
    $per_ord_data->bindValue(":courseDescription", $courseDescription);
    $per_ord_data->bindValue(":coursePrice", $coursePrice);

    $per_ord_data->execute();

    echo "修改成功~!!";
    // if ($per_ord_data->rowCount() == 0) { //找不到
    //     //傳回空的JSON字串
    //     // echo "{}";

    // } else { //找得到
    //     //取回一筆資料
    //     $per_ord_datarow = $per_ord_data->fetchAll(PDO::FETCH_ASSOC);

    //     // for($i=0; $i < count($per_ord_datarow) ;$i++){
          
    //     //   if($per_ord_datarow[$i]["courseStatus"] == 0){
    //     //     $per_ord_datarow[$i]["ischecked"] = false;
    //     //   }else{
    //     //     $per_ord_datarow[$i]["ischecked"] = true;
    //     //   }
         
    //     // };
        

    //     //送出json字串
    //     echo json_encode($per_ord_datarow);
    //     // echo $managerdatarow;
    // }

} catch (PDOException $e) {
    echo "系統錯誤, 請通知系維護人員~<br>";
    // echo "錯誤行號 : " . $e->getLine() . "<br>";
    // echo "錯誤原因 : " . $e->getMessage() . "<br>";
}