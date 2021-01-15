<?php
try {
    require_once "./connect_ced101g3.php";

    $content = trim(file_get_contents("php://input"));
    $decoded = json_decode($content, true);

    $empName = $decoded["empName"];
    $empId = $decoded["empId"];
    $empPsw = $decoded["empPsw"];

    $sql = "insert into employee (empName,empId,empPsw,empType)
            values (:empName,:empId,:empPsw,0)
            ";
    // $grouporddata = $pdo->query($sql);
    $per_ord_data = $pdo->prepare($sql);
    $per_ord_data->bindValue(":empName", $empName);
    $per_ord_data->bindValue(":empId", $empId);
    $per_ord_data->bindValue(":empPsw", $empPsw);
    $per_ord_data->execute();

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