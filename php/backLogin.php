<?php
    session_start();
    try{
        require_once("connect_ced101g3.php");
        $sql = "SELECT * FROM `employee` e LEFT OUTER JOIN `teacher` t ON (e.empNo = t.empNo)
                    WHERE empId=:empId AND empPsw=:empPsw"; 
        $employee = $pdo->prepare($sql);
        $employee->bindValue(":empId", $_POST["empId"]);
        $employee->bindValue(":empPsw", $_POST["empPsw"]);
        $employee->execute();
    
        if( $employee->rowCount() == 0){  // 符合的資料數為0
            echo "無此管理員";
        }else{
            // 取得管理員資料
            $empRow = $employee->fetch(PDO::FETCH_ASSOC);
            // 將資料寫進session
            $_SESSION["empNo"] = $empRow["empNo"]; 
            $_SESSION["empId"] = $empRow["empId"]; 
            $_SESSION["empPsw"] = $empRow["empPsw"];
            $_SESSION["empName"] = $empRow["empName"];
            
            $_SESSION["teachNo"] = $empRow["teachNo"];
            $_SESSION["teachName"] = $empRow["teachName"];
            // 傳回資料
            echo json_encode($empRow);
        }
    }catch(PDOException $e){
        echo $e->getMessage();
        echo $e->getLine();
    }
?>