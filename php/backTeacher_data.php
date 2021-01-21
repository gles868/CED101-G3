<?php
    session_start();
    try {
        require_once "connect_ced101g3.php";
        $teachNo = $_SESSION['teachNo'];

        $sql = "SELECT * 
                    FROM `employee` e JOIN `teacher` t ON (e.empNo = t.empNo)
                    WHERE teachNo = :teachNo";

        $teacherData = $pdo->prepare($sql);
        $teacherData->bindValue(":teachNo", $teachNo);
        $teacherData->execute();
        $teacherDataRows = $teacherData->fetch(PDO::FETCH_ASSOC);
        echo json_encode($teacherDataRows);

    } catch (PDOException $e) {
        echo "錯誤行號 : " . $e->getLine() . "<br>";
        echo "錯誤原因 : " . $e->getMessage() . "<br>";
    }
?>