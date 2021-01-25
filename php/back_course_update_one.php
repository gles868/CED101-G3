<?php
try {
    require_once "./connect_ced101g3.php";

    // $content = trim(file_get_contents("php://input"));
    // $decoded = json_decode($content, true);

    $courseNo = $_POST["courseNo"];
    $courTypeNo = $_POST["courTypeNo"];
    $courseName = $_POST["courseName"];
    $courseDescription = $_POST["courseDescription"];
    $coursePrice = $_POST["coursePrice"];

    $sql = "update course
            set courTypeNo = :courTypeNo,
                courseName = :courseName,
                courseDescription = :courseDescription,
                coursePrice = :coursePrice                
            where courseNo = :courseNo
            ";
    // $grouporddata = $pdo->query($sql);
    $per_ord_data = $pdo->prepare($sql);
    $per_ord_data->bindValue(":courseNo", $courseNo);
    $per_ord_data->bindValue(":courTypeNo", $courTypeNo);
    $per_ord_data->bindValue(":courseName", $courseName);
    $per_ord_data->bindValue(":courseDescription", $courseDescription);
    $per_ord_data->bindValue(":coursePrice", $coursePrice);

    $per_ord_data->execute();


   
        if ($_FILES["upFile"]["error"] == UPLOAD_ERR_OK) {
            // 設定要存照片的路徑(以php檔案為出發點)
            $dir = "../img/course_cards";
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
    
                $sql = "update course
                set courseImg = :courseImg
                where courseNo = :courseNo";
                $products = $pdo->prepare($sql);
                $products->bindValue(":courseNo", $courseNo);
                $products->bindValue(":courseImg", "./img/course_cards/{$fileName}");
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