<?php
session_start();
try {
    require_once "./connect_ced101g3.php";

    if(isset($_SESSION['empId'])){
      
      $sql = "select *
            from employee
            where empType = 0
            ";
    // $grouporddata = $pdo->query($sql);
    $per_ord_data = $pdo->prepare($sql);
    // $per_ord_data->bindValue(":detail_no", $detail_no);

    $per_ord_data->execute();

    // echo "修改成功~!!";
    if ($per_ord_data->rowCount() == 0) { //找不到
        //傳回空的JSON字串
        // echo "{}";

    } else { //找得到
        //取回一筆資料
        $per_ord_datarow = $per_ord_data->fetchAll(PDO::FETCH_ASSOC);

        for($i=0; $i < count($per_ord_datarow) ;$i++){
          
          if($per_ord_datarow[$i]["empStatus"] == 0){
            $per_ord_datarow[$i]["ischecked"] = false;
          }else{
            $per_ord_datarow[$i]["ischecked"] = true;
          }
         
        };


        //送出json字串
        echo json_encode($per_ord_datarow);
        // echo $managerdatarow;
    }

  }else{
      echo json_encode("");
  };

    // $content = trim(file_get_contents("php://input"));
    // $decoded = json_decode($content, true);

    // $detail_no = $decoded["detail_no"];

    

} catch (PDOException $e) {
    echo "系統錯誤, 請通知系維護人員~<br>";
    // echo "錯誤行號 : " . $e->getLine() . "<br>";
    // echo "錯誤原因 : " . $e->getMessage() . "<br>";
}