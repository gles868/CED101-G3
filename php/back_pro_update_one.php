<?php
try {
    require_once "./connect_ced101g3.php";

    // $content = trim(file_get_contents("php://input"));
    // $decoded = json_decode($content, true);

    $proNo = $_POST["proNo"];
    $courseNo = $_POST["courseNo"];
    $proName = $_POST["proName"];
    $proDescription = $_POST["proDescription"];
    $proPrice = $_POST["proPrice"];
    $proType = $_POST["proType"];


    $sql = "update product
            set courseNo = :courseNo,
                proName = :proName,
                proDescription = :proDescription,
                proPrice = :proPrice,
                proType = :proType              
            where proNo = :proNo
            ";
    // $grouporddata = $pdo->query($sql);
    $per_ord_data = $pdo->prepare($sql);
    $per_ord_data->bindValue(":proNo", $proNo);
    $per_ord_data->bindValue(":courseNo", $courseNo);
    $per_ord_data->bindValue(":proName", $proName);
    $per_ord_data->bindValue(":proDescription", $proDescription);
    $per_ord_data->bindValue(":proPrice", $proPrice);
    $per_ord_data->bindValue(":proType", $proType);


    $per_ord_data->execute();


    if ($_FILES["upFile"]["error"] == UPLOAD_ERR_OK) {
        // 設定要存照片的路徑(以php檔案為出發點)
        $dir = "../img/props";
        //取出檔案副檔名(.PNG ...等等)
        $fileInfoArr = pathinfo($_FILES["upFile"]["name"]);
        // 創造不會重複的亂碼
        $imageNo = uniqid();
        //決定檔案名稱
        $fileName = "{$imageNo}.{$fileInfoArr["extension"]}"; //312543544.gif
        //先檢查images資料夾存不存在
        if (file_exists($dir) == false) {
            mkdir($dir, 0777, true); //make directory
        }
        //將檔案copy到要放的路徑
        $from = $_FILES["upFile"]["tmp_name"];
        $to = "{$dir}/$fileName";
        if (copy($from, $to) === true) {

            $sql = "update product
            set proImg = :proImg
            where proNo = :proNo";
            $products = $pdo->prepare($sql);
            $products->bindValue(":proNo", $_POST["proNo"]);
            $products->bindValue(":proImg", "./img/props/{$fileName}");
            $products->execute();

        } else {
            // echo "失敗~";
        }

    } else {
        // echo "錯誤代碼 : {$_FILES["upFile"]["error"]} <br>";
        // echo "新增失敗<br>";
    }


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