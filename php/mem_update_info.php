<?php
try {
    require_once "./connect_ced101g3.php";

    $content = trim(file_get_contents("php://input"));
    $decoded = json_decode($content, true);

    $mem_no = $decoded["memberno"];
    $memname = $decoded["memname_new"];
    $memid = $decoded["memid_new"];
    
    // 接收舊密碼
    $old_psw = $decoded["old_psw"];
    // 接收新密碼
    $new_psw = $decoded["new_psw"];
    // 判斷如果新密碼為空值
    if ($new_psw == "") {
        $mempsw = $old_psw;
    } else {
        $mempsw = $new_psw;
    };
    $memmail = $decoded["memmail_new"];

    $sql = "update member
            set memName = :memname_new,memId=:memid_new,memPsw=:mempsw,memMail=:memmail_new
            where memberNo = :memberno
            ";
            
    // $grouporddata = $pdo->query($sql);
    $per_ord_data = $pdo->prepare($sql);    
    $per_ord_data->bindValue(":memberno", $mem_no);
    $per_ord_data->bindValue(":memname_new", $memname);
    $per_ord_data->bindValue(":memid_new", $memid);
    $per_ord_data->bindValue(":mempsw", $mempsw);
    $per_ord_data->bindValue(":memmail_new", $memmail);

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