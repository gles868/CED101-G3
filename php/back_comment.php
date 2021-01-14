<?php
try {
    require_once "./connect_g3_database.php";

    // $content = trim(file_get_contents("php://input"));
    // $decoded = json_decode($content, true);

    // $detail_no = $decoded["detail_no"];

    $sql = "select *
              from report r join registration rg on r.registNo=rg.registNo
                    join member m on rg.memberNo=m.memberNo
              where repoStatus = 0
            ";
    // $grouporddata = $pdo->query($sql);
    $per_ord_data = $pdo->prepare($sql);
    // $per_ord_data->bindValue(":detail_no", $detail_no);

    $per_ord_data->execute();

    // echo "修改成功~!!";
    if ($per_ord_data->rowCount() == 0) { //找不到
        //傳回空的JSON字串
        echo json_encode("");

    } else { //找得到
        //取回一筆資料
        $per_ord_datarow = $per_ord_data->fetchAll(PDO::FETCH_ASSOC);

        for($i=0; $i < count($per_ord_datarow) ;$i++){
          
          if($per_ord_datarow[$i]["repoReason"] == 0){
            $per_ord_datarow[$i]["repoReason"] = "言論內容不當";
          }else if($per_ord_datarow[$i]["repoReason"] == 1){
            $per_ord_datarow[$i]["repoReason"] = "疑似垃圾訊息";
          }else if($per_ord_datarow[$i]["repoReason"] == 2){
            $per_ord_datarow[$i]["repoReason"] = "與本網站無關";
          }
         
        };
        

        //送出json字串
        echo json_encode($per_ord_datarow);
        // echo $managerdatarow;
    }

} catch (PDOException $e) {
    echo "系統錯誤, 請通知系維護人員~<br>";
    // echo "錯誤行號 : " . $e->getLine() . "<br>";
    // echo "錯誤原因 : " . $e->getMessage() . "<br>";
}