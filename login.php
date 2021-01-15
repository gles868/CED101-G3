<?php
    session_start();
    try{
        require_once("connectced101g3.php");
        $sql = "SELECT * FROM `member` 
                    WHERE memId=:memId AND memPsw=:memPsw"; 
        $member = $pdo->prepare($sql);
        $member->bindValue(":memId", $_POST["memId"]);
        $member->bindValue(":memPsw", $_POST["memPsw"]);
        $member->execute();
    
        if( $member->rowCount() == 0){  // 符合指令的資料數為0
            echo "無此會員";
        }else{
            // 取得會員資料
            $memRow = $member->fetch(PDO::FETCH_ASSOC);
            // 將資料寫進session
            $_SESSION["memberNo"] = $memRow["memberNo"]; 
            $_SESSION["memId"] = $memRow["memId"]; 
            $_SESSION["memName"] = $memRow["memName"];  
            // 傳回資料
            echo json_encode($memRow);
        }
    }catch(PDOException $e){
        echo $e->getMessage();
        echo $e->getLine();
    }
?>